import { Laboratory } from '@prisma/client';

interface ILaboratories {
  currentPage: number;
  totalPages: number;
  items: Array<Laboratory>;
}

export default ILaboratories;
