import { Analysis } from '@prisma/client';

interface IAnalysis {
  skip: number;
  totalSkip: number;
  items: Array<Analysis>;
}

export { IAnalysis };