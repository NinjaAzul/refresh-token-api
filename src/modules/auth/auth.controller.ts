import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';
import { I18n as I18nDecorator, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from 'src/@shared/guards';
import { I18n } from 'src/i18n';

import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/')
  async authenticate(
    @Body() authenticateDTO: AuthenticateDTO,
    @I18nDecorator() i18nContext: I18nContext,
  ) {
    const result = await this.authService.authenticate(authenticateDTO, i18nContext);

    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Req() req: Request, @I18nDecorator() i18nContext: I18nContext) {
    const token = req.headers['authorization'];

    return this.authService.me(req.user.id, token, i18nContext);
  }

  @Post('/refresh')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @I18nDecorator() i18nContext: I18nContext,
  ) {
    return await this.authService.refreshToken(refreshToken, i18nContext);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req: Request, @I18nDecorator() i18nContext: I18nContext) {
    await this.authService.logout(req.user.id);

    return { message: i18nContext.translate(I18n.MODULES.AUTH_SERVICE.LOGOUT_SUCEFFULLY.KEY) };
  }

  // @Post('/recover-password')
  // async recoverPassword(
  //   @Body() recoverPasswordDTO: RecoverPasswordDTO,
  //   @I18n() i18nContext: I18nContext,
  // ) {
  //   return this.authService.recoverPassword(recoverPasswordDTO, i18nContext);
  // }

  // @Post('/validate-recover-password-token')
  // @HttpCode(200)
  // async validateRecoverPasswordToken(
  //   @Body() validateRecoverPasswordToken: ValidateRecoverPasswordTokenDTO,
  //   @I18n() i18nContext: I18nContext,
  // ) {
  //   return this.authService.validateRecoverPasswordToken(validateRecoverPasswordToken, i18nContext);
  // }

  // @Put('/reset-password')
  // async resetPassword(
  //   @Body() resetPasswordDTO: ResetPasswordDTO,
  //   @I18n() i18nContext: I18nContext,
  // ) {
  //   return this.authService.resetPassword(resetPasswordDTO, i18nContext);
  // }
}
