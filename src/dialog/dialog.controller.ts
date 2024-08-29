import { Controller, Get, HttpCode } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { Dialog } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dialog')
@Controller()
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}
}
