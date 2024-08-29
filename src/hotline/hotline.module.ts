import { Module } from '@nestjs/common';
import { HotlineService } from './hotline.service';
import { HotlineController } from './hotline.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HotlineController],
  providers: [HotlineService, PrismaService]
})
export class HotlineModule {}
