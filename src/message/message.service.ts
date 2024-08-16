import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { MessageDto } from './dto/messages.dto';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) {}

	async getMessages(id: number): Promise<Message | {}> {
		return this.prisma.message.findMany({
			where: {
				userId: id,
			},
      orderBy: [
        {
          id: 'asc',
        },
      ],
			include: {
				user: true,
				// dialog: true,
      },
    });
	}

	async createMessage(messageDto: MessageDto): Promise<Message> {
    return this.prisma.message.create({
      data: messageDto,
    });
  }
}
