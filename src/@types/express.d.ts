type User = {
  id: number;
};

declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: User;
    token: string;
  }
}
