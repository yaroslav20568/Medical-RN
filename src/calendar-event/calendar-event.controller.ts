import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode,
	Query,
} from '@nestjs/common';
import { CalendarEventService } from './calendar-event.service';
import { ApiTags } from '@nestjs/swagger';
import { CalendarEvent } from '@prisma/client';
import { CalendarEventDto, CalendarEventQuery, CalendarEventUpdateDto } from './dto/calendar-event.dto';

@ApiTags('Calendar-event')
@Controller()
export class CalendarEventController {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @Get('calendar-events')
  @HttpCode(200)
  async getCalendarEvents(@Query() calendarEventQuery: CalendarEventQuery): Promise<CalendarEvent[]> {
    return this.calendarEventService.getCalendarEvents(calendarEventQuery);
  }

  @Post('calendar-event')
  @HttpCode(200)
	@UsePipes(new ValidationPipe())
  async createCalendarEvent(@Body() calendarEventDto: CalendarEventDto): Promise<CalendarEvent> {
    return this.calendarEventService.createCalendarEvent(calendarEventDto);
  }

  @Delete('calendar-event/:id')
  @HttpCode(200)
  async deleteCalendarEvent(@Param('id', ParseIntPipe) id: number): Promise<CalendarEvent> {
    return this.calendarEventService.deleteCalendarEvent(id);
  }

  @Put('calendar-event/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateCalendarEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() calendarEventUpdateDto: CalendarEventUpdateDto,
  ): Promise<CalendarEvent> {
    return this.calendarEventService.updateCalendarEvent(id, calendarEventUpdateDto);
  }
}
