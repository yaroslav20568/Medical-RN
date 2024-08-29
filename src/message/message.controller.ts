import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Message')
@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
}
