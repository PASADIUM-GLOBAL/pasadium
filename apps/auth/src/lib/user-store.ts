import bcrypt from 'bcryptjs';
import { db } from "@pasadium/db";

export const userStore = {
  findByUsername: async (username: string) => {
    return db.user.findUnique({
      where: { username },
    });
  },
  findById: async (id: string) => {
    return db.user.findUnique({
      where: { id },
    });
  },
  verifyPassword: async (username: string, password: string) => {
    const user = await db.user.findUnique({ where: { username } });
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    return isValid ? user : null;
  },
  createUser: async (data: { username: string, password: string, email: string, roles: string[] }) => {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return db.user.create({
      data: {
        username: data.username,
        passwordHash,
        email: data.email,
        roles: data.roles.join(','),
      },
    });
  }
};
