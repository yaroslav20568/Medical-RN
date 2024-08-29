import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { MessageDto } from './dto/messages.dto';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) {}

	async getMessages(dialogId: number): Promise<Message[]> {
		return this.prisma.message.findMany({
			where: {
				dialogId: dialogId,
			},
      orderBy: [
        {
          id: 'asc',
        },
      ],
			include: {
				user: true,
      },
    });
	}

	async createMessage(messageDto: MessageDto): Promise<Message> {
    return this.prisma.message.create({
      data: messageDto,
    });
  }

	async setIsReadMessages(partnerId: number) {
		return this.prisma.message.updateMany({
			where: {
				userId: partnerId,
			},
			data: {
				isRead: true,
			},
		})
	}
}
