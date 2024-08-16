import { Module, Global } from '@nestjs/common';
import { ChatGateway } from 'src/chat/chat.geteway';
import { DialogService } from 'src/dialog/dialog.service';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from 'src/prisma.service';

@Global()
@Module({
	providers: [ChatGateway, DialogService, MessageService, PrismaService]
})
export class ChatModule {}