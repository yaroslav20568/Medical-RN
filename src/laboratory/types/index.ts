import { Laboratory } from '@prisma/client';

interface ILaboratory {
  skip: number;
  totalSkip: number;
  items: Array<Laboratory>;
}

export { ILaboratory };
