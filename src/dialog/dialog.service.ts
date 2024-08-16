import { Injectable } from '@nestjs/common';
import { Dialog, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DialogDto } from './dto/dialog.dto';

@Injectable()
export class DialogService {
	constructor(private prisma: PrismaService) {}

	async getDialogs(): Promise<Dialog | {}> {
		return this.prisma.dialog.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
			include: {
        messages: {
					include: {
						user: true,
						dialog: true,
					}
				},
      },
    });
	}

	async createDialog(dialogDto: DialogDto): Promise<number> {
    const findDialog: Dialog = await this.prisma.dialog.findFirst({
      where: { userId: dialogDto.userId },
    });

    const findUser: User = await this.prisma.user.findUnique({
      where: { id: dialogDto.userId },
    });

    if (findDialog) {
			return findDialog.id;
    }

    if (!findUser) {
			return;
    }

		const newDialog = this.prisma.dialog.create({
      data: dialogDto,
    });

		return (await newDialog).id;
  }
}
