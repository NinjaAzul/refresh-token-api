import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { I18nContext } from 'nestjs-i18n';
import { generateHash } from 'src/@shared/helpers';
import { I18n } from 'src/i18n';

import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(userId: number) {
    const user = await this.usersRepository.findOne(userId);

    return user;
  }

  async findOneByIdAndReturnRefreshToken(userId) {
    const refreshToken = await this.usersRepository.findOneByIdAndReturnRefreshToken(userId);

    return refreshToken;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneByEmail(email);
  }

  async create(createUserDTO: CreateUserDTO, i18nContext: I18nContext) {
    const { email, name, password, roleId } = createUserDTO;

    const userAlreadyExists = await this.usersRepository.findOneByEmail(email);

    if (userAlreadyExists)
      throw new BadRequestException(
        i18nContext.translate(I18n.MODULES.USERS_SERVICE.USER_ALREADY_EXISTS.KEY),
      );

    const inputUserCreate: Prisma.UserCreateManyInput = {
      email,
      name,
      roleId,
      password: await generateHash(password),
    };

    const created = await this.usersRepository.create(inputUserCreate);

    return created;
  }

  async update(userId: number, updateUserDTO: UpdateUserDTO, i18nContext: I18nContext) {
    const { email, name, password, roleId } = updateUserDTO;

    const hasUserData = await this.usersRepository.findOne(userId);

    if (!hasUserData)
      throw new BadRequestException(
        i18nContext.translate(I18n.MODULES.USERS_SERVICE.USER_NOT_FOUND.KEY),
      );

    if (email) {
      const emailAlreadyExists = await this.findOneByEmail(email);

      if (emailAlreadyExists)
        throw new BadRequestException(
          i18nContext.translate(I18n.MODULES.USERS_SERVICE.EMAIL_ALREADY_EXISTS.KEY),
        );
    }

    const inputUpdateUserDTO: Prisma.UserUpdateInput = {
      email,
      name,
      password: await generateHash(password),
      role: {
        connect: {
          id: roleId,
        },
      },
    };

    const updated = await this.usersRepository.update(userId, inputUpdateUserDTO);

    return updated;
  }

  async remove(userId: number, i18nContext: I18nContext) {
    const hasUserData = await this.usersRepository.findOne(userId);

    if (!hasUserData)
      throw new BadRequestException(
        i18nContext.translate(I18n.MODULES.USERS_SERVICE.USER_NOT_FOUND.KEY),
      );

    const { name } = await this.usersRepository.remove(userId);

    return {
      success: i18nContext.translate(I18n.MODULES.USERS_SERVICE.USER_DELETED.KEY, {
        args: { name },
      }),
    };
  }
}
