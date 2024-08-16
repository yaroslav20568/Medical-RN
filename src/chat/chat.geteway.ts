import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { DialogService } from "../dialog/dialog.service";
import { MessageService } from "src/message/message.service";
import { IMessage } from "./types";
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
	constructor(private dialogService: DialogService, private messageService: MessageService){}
  @WebSocketServer() server;

	@SubscribeMessage('join-room')
	joinToRoom(@ConnectedSocket() client: Socket, @MessageBody() userId: number) {
		client.join(`room-${userId}`);
	}

	@SubscribeMessage('leave-room')
	leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() userId: number) {
		client.leave(`room-${userId}`);
	}

	@SubscribeMessage('get-messages')
	async getMessages(@MessageBody() userId: number) {
		this.server.emit('return-messages', await this.messageService.getMessages(userId));
	}

	@SubscribeMessage('send-message')
	async sendMessage(@MessageBody() messageData: IMessage) {
		const dialogId = await this.dialogService.createDialog({userId: messageData.userId, adminId: 0});

		this.server.emit('return-messages', {...messageData, dialogId});

		await this.messageService.createMessage({
			time: messageData.time,
			text: messageData.text,
			userId: messageData.userId,
			dialogId: dialogId,
		});
	}
}