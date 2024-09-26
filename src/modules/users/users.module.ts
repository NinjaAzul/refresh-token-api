import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
  imports: [PrismaClientModule],
})
export class UsersModule {}
