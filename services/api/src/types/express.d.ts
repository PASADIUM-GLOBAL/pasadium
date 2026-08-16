declare global {
  namespace Express {
    interface User {
      sub: string;
      username: string;
      roles: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
