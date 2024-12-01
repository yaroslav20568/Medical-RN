import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { DialogService } from "../dialog/dialog.service";
import { MessageService } from "src/message/message.service";
import { IMessageUser, ISetAdminDialog } from "./types";
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
	constructor(private dialogService: DialogService, private messageService: MessageService){}
  @WebSocketServer() server;

	@SubscribeMessage('join-room')
	async joinToRoom(@ConnectedSocket() client: Socket, @MessageBody() userId: number) {
		client.join(`room-${userId}`);
	}

	@SubscribeMessage('leave-room')
	async leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() userId: number) {
		const containsRoom = Array.from(client.rooms)[1]?.includes(String(userId));

		if(containsRoom === undefined) {
			return;
		} else if(containsRoom) {
			client.leave(`room-${userId}`);
		} else {
			const id = (await this.dialogService.getDialogByAdminId(userId)).userId;
			client.leave(`room-${id}`);
		}
	}

	@SubscribeMessage('set-admin-dialog')
	async setAdminInDialog(@MessageBody() params: ISetAdminDialog) {
		await this.dialogService.setAdminInDialog(params.dialogId, params.adminId)
		this.server.emit('return-dialogs-admin', await this.dialogService.getDialogs());
	}

	@SubscribeMessage('set-is-read-messages')
	async setIsReadMessages(@MessageBody() partnerId: number) {
		await this.messageService.setIsReadMessages(partnerId);
		this.getDialogs();
	}

	@SubscribeMessage('get-messages-user')
	async getMessagesUser(@MessageBody() userId: number) {
		const dialogId = (await this.dialogService.getDialogByUserId(userId))?.id;
		if(dialogId) {
			this.server.emit('return-messages-user', await this.messageService.getMessages(dialogId));
		}
	}

	@SubscribeMessage('get-dialogs-admin')
	async getDialogs() {
		this.server.emit('return-dialogs-admin', await this.dialogService.getDialogs());
	}

	@SubscribeMessage('get-messages-admin')
	async getMessagesAdmin(@MessageBody() dialogId: number) {
		this.server.emit('return-messages-admin', await this.messageService.getMessages(dialogId));
	}

	@SubscribeMessage('send-message')
	async sendMessageUser(@ConnectedSocket() client: Socket, @MessageBody() messageData: IMessageUser) {
		if(messageData.user.role === 'User') {
			const dialogId = await this.dialogService.createDialog({userId: messageData.userId, adminId: 0});
			const peoplesInRoom = Array.from((await client.in(`room-${messageData.userId}`).allSockets())).length;
			const isRead = peoplesInRoom === 2 ? true : false;

			this.server.to(`room-${messageData.userId}`).emit('return-message', {...messageData, dialogId, isRead});

			await this.messageService.createMessage({
				time: messageData.time,
				text: messageData.text,
				userId: messageData.userId,
				dialogId: dialogId,
				isRead: isRead
			});

			this.getDialogs();
		} else {
			const userId = (await this.dialogService.getDialogById(messageData.dialogId)).userId;
			const peoplesInRoom = Array.from((await client.in(`room-${userId}`).allSockets())).length;
			const isRead = peoplesInRoom === 2 ? true : false;

			this.server.to(`room-${userId}`).emit('return-message', {...messageData, isRead});

			await this.messageService.createMessage({
				time: messageData.time,
				text: messageData.text,
				userId: messageData.userId,
				dialogId: messageData.dialogId,
				isRead: isRead
			});

			this.getDialogs();
		}
	}
}