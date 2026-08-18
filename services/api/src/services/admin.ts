import { db } from '@pasadium/db';

export async function updateUserRole(
  userId: string,
  role: string,
) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      roles: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const allowedRoles = ['Trader', 'SuperAdmin'];

  if (!allowedRoles.includes(role)) {
    throw new Error('Invalid role');
  }

  return db.user.update({
    where: { id: userId },
    data: {
      roles: role,
    },
    select: {
      id: true,
      username: true,
      email: true,
      roles: true,
    },
  });
}

