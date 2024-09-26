import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma-client';

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteExpiredSessions() {
    return this.prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
