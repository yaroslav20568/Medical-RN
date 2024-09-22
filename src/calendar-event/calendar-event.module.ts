import { Module } from '@nestjs/common';
import { CalendarEventService } from './calendar-event.service';
import { CalendarEventController } from './calendar-event.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CalendarEventController],
  providers: [CalendarEventService, PrismaService]
})
export class CalendarEventModule {}
