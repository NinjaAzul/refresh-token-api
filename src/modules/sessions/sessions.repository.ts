// src/session/session.repository.ts
import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';

import { PrismaService } from '@libs/prisma-client';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: number, refreshToken: string, expiresIn: Date): Promise<Session> {
    return this.prisma.session.create({
      data: {
        refreshToken,
        userId,
        expiresAt: expiresIn,
      },
    });
  }

  async findSessionByToken(refreshToken: string): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: { refreshToken },
    });
  }

  async revokeSession(refreshToken: string): Promise<void> {
    await this.prisma.session.delete({
      where: { refreshToken },
    });
  }

  async revokeAllSessions(userId: number): Promise<void> {
    await this.prisma.session.deleteMany({
      where: { userId },
    });
  }
}
