// src/session/session.module.ts
import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { SessionRepository } from './sessions.repository';
import { SessionService } from './sessions.service';

@Module({
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
  imports: [PrismaClientModule],
})
export class SessionModule {}
