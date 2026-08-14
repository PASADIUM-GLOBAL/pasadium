import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const db = prisma;
export type { PrismaClient } from '@prisma/client';
