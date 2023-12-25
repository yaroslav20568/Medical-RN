import { Module } from '@nestjs/common';
import { TypeUserService } from './type-user.service';
import { TypeUserController } from './type-user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TypeUserController],
  providers: [TypeUserService, PrismaService],
})
export class TypeUserModule {}
