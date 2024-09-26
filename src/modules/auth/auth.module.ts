import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { EmailService } from '../email';
import { SessionModule } from '../sessions';
import { UsersModule } from '../users';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EmailService],
  exports: [AuthModule],
  imports: [UsersModule, PrismaClientModule, SessionModule],
})
export class AuthModule {}
