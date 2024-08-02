import { Laboratory } from '@prisma/client';

interface ILaboratories {
  skip: number;
  totalSkip: number;
  items: Array<Laboratory>;
}

export { ILaboratories };
