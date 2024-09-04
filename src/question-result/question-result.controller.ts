import { Controller } from '@nestjs/common';
import { QuestionResultService } from './question-result.service';

@Controller('question-result')
export class QuestionResultController {
  constructor(private readonly questionResultService: QuestionResultService) {}
}
