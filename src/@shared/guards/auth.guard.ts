/* eslint-disable no-console */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@libs/prisma-client';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { translations } from 'src/i18n';

import { PermissionDecorators, PERMISSIONS_KEY } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionDecorators | PermissionDecorators[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    const i18n = I18nContext.current();
    const language = i18n?.lang || 'en';

    if (!token) {
      throw new UnauthorizedException(
        translations[language].MODULES.AUTH_SERVICE.TOKEN_IS_NOT_VALID,
      );
    }

    try {
      const { sub: userId }: { sub: number } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: {
            select: {
              id: true,
              name: true,
              Permission: {
                select: {
                  canCreate: true,
                  canRead: true,
                  canUpdate: true,
                  canDelete: true,
                  canFilter: true,
                  canCustom: true,
                  customRules: true,
                  feature: {
                    select: {
                      name: true,
                      feature: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException(
          translations[language].MODULES.AUTH_SERVICE.TOKEN_IS_NOT_VALID,
        );
      }

      request.user = user;

      if (!requiredPermissions) {
        return true;
      }

      const permissionsArray = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      const hasPermission = permissionsArray.every((requiredPermission) => {
        const permission = user.role.Permission.find(
          (p) => p.feature.feature === requiredPermission.feature,
        );

        if (!permission) return false;

        let customRules: Record<string, boolean> = {};
        if (typeof permission.customRules === 'object') {
          customRules = permission.customRules as Record<string, boolean>;
        } else if (typeof permission.customRules === 'string') {
          try {
            customRules = JSON.parse(permission.customRules);
          } catch (error) {
            console.error('Erro ao analisar customRules:', error);
            customRules = {};
          }
        }

        if (
          permission[requiredPermission.permission as keyof typeof permission] !== true &&
          customRules?.[requiredPermission.permission as keyof typeof customRules] !== true
        )
          return false;

        return true;
      });

      if (!hasPermission) {
        throw new ForbiddenException(
          translations[language].MODULES.AUTH_SERVICE.DO_NOT_HAVE_PERMISSION,
        );
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new ForbiddenException(
        translations[language].MODULES.AUTH_SERVICE.DO_NOT_HAVE_PERMISSION,
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  // Método para verificar regras personalizadas
  // private checkCustomRules(customRules: any, request: Request): boolean {
  //   // Implemente a lógica para verificar as regras personalizadas aqui
  //   // Retorne true se as regras forem satisfeitas, false caso contrário
  // }
}
