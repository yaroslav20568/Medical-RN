import { Module } from '@nestjs/common';
import { QuestionResultService } from './question-result.service';
import { QuestionResultController } from './question-result.controller';

@Module({
  controllers: [QuestionResultController],
  providers: [QuestionResultService]
})
export class QuestionResultModule {}
