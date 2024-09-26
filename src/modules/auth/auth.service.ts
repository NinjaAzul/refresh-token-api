import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { I18nContext } from 'nestjs-i18n';
import { I18n } from 'src/i18n';
import { UsersService } from 'src/modules/users';

import { SessionService } from '../sessions';

import {
  AuthenticateDTO,
  // RecoverPasswordDTO,
  // ResetPasswordDTO,
  // ValidateRecoverPasswordTokenDTO,
} from './dto';
// import { EmailService } from '../email';
// import { TemplateEnum } from '../email/enum/template.enum';
// import { TEMPLATE_TRANSLATIONS } from '../email/i18n';
// import { getRecoverPasswordContext } from './email';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    // private readonly emailService: EmailService,
  ) {}

  async authenticate(authenticateDTO: AuthenticateDTO, i18nContext: I18nContext) {
    const { email, password } = authenticateDTO;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        i18nContext.translate(I18n.MODULES.AUTH_SERVICE.PASSWORD_OR_EMAIL_INVALID.KEY),
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        i18nContext.translate(I18n.MODULES.AUTH_SERVICE.PASSWORD_OR_EMAIL_INVALID.KEY),
      );
    }

    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    await this.sessionService.createSession(
      user.id,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
    );

    delete user.password;

    return {
      user,
      token,
      refreshToken,
      accessTokenExpiry,
    };
  }

  async me(userId: number, token: string, i18nContext: I18nContext) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotFoundException(
        i18nContext.translate(I18n.MODULES.AUTH_SERVICE.USER_NOT_FOUND.KEY),
      );
    }

    const lastSession = await this.sessionService.findSessionByToken(token);
    const lastRefreshToken = lastSession ? lastSession.refreshToken : null;

    return {
      user,
      token,
      lastRefreshToken,
    };
  }

  async refreshToken(oldRefreshToken: string, i18nContext: I18nContext) {
    if (!oldRefreshToken) {
      throw new UnauthorizedException(
        i18nContext.translate(I18n.MODULES.AUTH_SERVICE.REFRESH_TOKEN_NOT_FOUND.KEY),
      );
    }

    const { token, refreshToken } = await this.sessionService.refreshToken(
      oldRefreshToken,
      i18nContext,
    );

    const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    return { token, refreshToken, accessTokenExpiry };
  }

  async logout(userId: number) {
    return await this.sessionService.revokeAllSessions(userId);
  }

  // async recoverPassword(recoverPasswordDTO: RecoverPasswordDTO, i18nContext: I18nContext) {
  //   const i18n = I18nContext.current();
  //   const language = i18n?.lang || 'en';
  //   const user = await this.usersService.findOneByEmail(recoverPasswordDTO.Email);

  //   if (!user) {
  //     throw new NotFoundException(
  //       i18nContext.translate(I18n.MODULES.AUTH_SERVICE.USER_NOT_FOUND.KEY),
  //     );
  //   }

  //   const recoverPasswordToken = await this.jwtService.signAsync(
  //     { sub: user.UserID },
  //     {
  //       secret: process.env.RECOVER_PASSWORD_TOKEN_SECRET,
  //       expiresIn: process.env.RECOVER_PASSWORD_TOKEN_EXPIRES_IN,
  //     },
  //   );

  //   await this.emailService.sendMail({
  //     to: user.Email,
  //     subject: TEMPLATE_TRANSLATIONS[language].recover_password_template.subject,
  //     template: TemplateEnum.RECOVER_PASSWORD,
  //     context: {
  //       data: {
  //         name: user.Name,
  //         url: `${process.env.FRONTEND_URL}/${language}/auth/reset-password?Token=${recoverPasswordToken}`,
  //       },
  //       templateConfig: {
  //         ...getRecoverPasswordContext(language),
  //       },
  //     },
  //   });

  //   return {
  //     success: i18nContext.translate(I18n.MODULES.AUTH_SERVICE.EMAIL_SENT.KEY),
  //   };
  // }

  // async validateRecoverPasswordToken(
  //   validateRecoverPasswordToken: ValidateRecoverPasswordTokenDTO,
  //   i18nContext: I18nContext,
  // ) {
  //   try {
  //     const { Token } = validateRecoverPasswordToken;

  //     await this.jwtService.verifyAsync(Token, {
  //       secret: process.env.RECOVER_PASSWORD_TOKEN_SECRET,
  //     });

  //     return {
  //       success: i18nContext.translate(
  //         I18n.MODULES.AUTH_SERVICE.RECOVER_PASSWORD_TOKEN_IS_VALID.KEY,
  //       ),
  //     };
  //   } catch (e) {
  //     throw new UnauthorizedException(
  //       i18nContext.translate(I18n.MODULES.AUTH_SERVICE.TOKEN_IS_NOT_VALID.KEY),
  //     );
  //   }
  // }

  // async resetPassword(resetPasswordDTO: ResetPasswordDTO, i18nContext: I18nContext) {
  //   const { Password, Token } = resetPasswordDTO;
  //   let userId;
  //   try {
  //     const { sub }: { sub: number } = await this.jwtService.verifyAsync(Token, {
  //       secret: process.env.RECOVER_PASSWORD_TOKEN_SECRET,
  //     });
  //     userId = sub;
  //   } catch (e) {
  //     throw new UnauthorizedException(
  //       i18nContext.translate(I18n.MODULES.AUTH_SERVICE.TOKEN_IS_NOT_VALID.KEY),
  //     );
  //   }

  //   const user = await this.usersService.checkUserExistsToRecoverPassword(userId);

  //   if (!user) {
  //     throw new NotFoundException(
  //       i18nContext.translate(I18n.MODULES.AUTH_SERVICE.USER_NOT_FOUND.KEY),
  //     );
  //   }

  //   await this.usersService.updatePassword(user.UserID, Password);

  //   return {
  //     success: i18nContext.translate(I18n.MODULES.AUTH_SERVICE.PASSWORD_UPDATED.KEY),
  //   };
  // }
}
