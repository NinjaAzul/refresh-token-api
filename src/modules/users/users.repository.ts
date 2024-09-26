import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@libs/prisma-client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(userId: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }

  async findOneByIdAndReturnRefreshToken(userId: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        session: {
          select: {
            refreshToken: true,
          },
        },
      },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return user;
  }

  async create(inputUserCreate: Prisma.UserCreateManyInput) {
    return await this.prismaService.user.create({
      data: inputUserCreate,
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(userId: number, inputUpdateUserDTO: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: inputUpdateUserDTO,
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(userId: number) {
    return this.prismaService.user.delete({ where: { id: userId } });
  }
}
