import { LibraryItem } from '@prisma/client';

interface ILibraryItem {
  skip: number;
  totalSkip: number;
  items: Array<LibraryItem>;
}

export { ILibraryItem };