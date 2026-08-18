import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { db } from '@pasadium/db';
import { writeSecurityLog } from './security-log';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

export async function login(username: string, password: string) {
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    await writeSecurityLog({
      event: 'Login attempt for unknown user',
      severity: 'Medium',
      status: 'Failed',
    });

    throw new Error('Invalid credentials');
  }

  const validPassword = await argon2.verify(
    user.passwordHash,
    password,
  );

  if (!validPassword) {
    await writeSecurityLog({
      event: 'Failed login attempt',
      userId: user.id,
      severity: 'Medium',
      status: 'Failed',
    });

    throw new Error('Invalid credentials');
  }

  await writeSecurityLog({
    event: 'Successful login',
    userId: user.id,
    severity: 'Low',
    status: 'Allowed',
  });

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    },
    getJwtSecret(),
    {
      expiresIn: '24h',
    },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    },
  };
}
