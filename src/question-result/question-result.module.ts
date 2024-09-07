import { Module } from '@nestjs/common';
import { QuestionResultService } from './question-result.service';
import { QuestionResultController } from './question-result.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuestionResultController],
  providers: [QuestionResultService, PrismaService]
})
export class QuestionResultModule {}
