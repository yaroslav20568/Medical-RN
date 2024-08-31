import { Hotline } from '@prisma/client';

interface IHotline {
  skip: number;
  totalSkip: number;
  items: Array<Hotline>;
}

export { IHotline };
