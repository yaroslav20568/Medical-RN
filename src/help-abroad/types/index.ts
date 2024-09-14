import { HelpAbroad } from '@prisma/client';

interface IHelpAbroad {
  skip: number;
  totalSkip: number;
  items: Array<HelpAbroad>;
}

export { IHelpAbroad };
