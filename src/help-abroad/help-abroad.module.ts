import { Module } from '@nestjs/common';
import { HelpAbroadService } from './help-abroad.service';
import { HelpAbroadController } from './help-abroad.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HelpAbroadController],
  providers: [HelpAbroadService, PrismaService]
})
export class HelpAbroadModule {}
