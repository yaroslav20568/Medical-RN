import { Controller } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';

@Controller('question-answer')
export class QuestionAnswerController {
  constructor(private readonly questionAnswerService: QuestionAnswerService) {}
}
