import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
export * as Prisma from '@prisma/client';
export type { PrismaClient } from '@prisma/client';
