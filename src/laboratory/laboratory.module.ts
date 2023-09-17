import { Module } from '@nestjs/common';
import { LaboratoryService } from './laboratory.service';
import { LaboratoryController } from './laboratory.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LaboratoryController],
  providers: [LaboratoryService, PrismaService],
})
export class LaboratoryModule {}
