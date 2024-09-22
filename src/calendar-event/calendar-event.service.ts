import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalendarEvent, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CalendarEventDto, CalendarEventQuery, CalendarEventUpdateDto } from './dto/calendar-event.dto';

@Injectable()
export class CalendarEventService {
  constructor(private prisma: PrismaService) {}

  async getCalendarEvents(calendarEventQuery: CalendarEventQuery): Promise<CalendarEvent[]> {
    return this.prisma.calendarEvent.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
			include: {
        user: true,
      },
			where: {
				userId: calendarEventQuery.userId ? +calendarEventQuery.userId : undefined,
			}
    });
  }

  async createCalendarEvent(calendarEventDto: CalendarEventDto): Promise<CalendarEvent> {
    const findCalendarEvent: CalendarEvent = await this.prisma.calendarEvent.findUnique({
      where: { name: calendarEventDto.name },
    });

		const findUser: User = await this.prisma.user.findUnique({
      where: { id: calendarEventDto.userId },
    });

    if (findCalendarEvent) {
      throw new HttpException(
        'A calendar event with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

		if (!findUser) {
      throw new HttpException(
        'No user with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.calendarEvent.create({
      data: calendarEventDto,
    });
  }

  async deleteCalendarEvent(id: number): Promise<CalendarEvent> {
    const findCalendarEvent: CalendarEvent = await this.prisma.calendarEvent.findUnique({
      where: { id: id },
    });

    if (!findCalendarEvent) {
      throw new HttpException(
        'No calendar event with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.calendarEvent.delete({
      where: {
        id: id,
      },
    });
  }

  async updateCalendarEvent(id: number, calendarEventUpdateDto: CalendarEventUpdateDto): Promise<CalendarEvent> {
    const findCalendarEvent: CalendarEvent = await this.prisma.calendarEvent.findUnique({
      where: { id: id },
    });

    if (!findCalendarEvent) {
      throw new HttpException(
        'No calendar event with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.calendarEvent.update({
      where: {
        id: id,
      },
      data: calendarEventUpdateDto,
    });
  }
}
