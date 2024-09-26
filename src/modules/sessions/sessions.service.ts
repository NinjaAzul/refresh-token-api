// src/session/session.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { I18nContext } from 'nestjs-i18n';
import { I18n } from 'src/i18n';

import { SessionRepository } from './sessions.repository';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createSession(userId: number, refreshToken: string, expiresIn: Date) {
    return this.sessionRepository.createSession(userId, refreshToken, expiresIn);
  }

  async findSessionByToken(refreshToken: string) {
    return this.sessionRepository.findSessionByToken(refreshToken);
  }

  async revokeSession(refreshToken: string) {
    return this.sessionRepository.revokeSession(refreshToken);
  }

  async revokeAllSessions(userId: number) {
    return this.sessionRepository.revokeAllSessions(userId);
  }

  async refreshToken(oldRefreshToken: string, i18nContext: I18nContext) {
    const session = await this.findSessionByToken(oldRefreshToken);

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException(
        i18nContext.translate(I18n.MODULES.SESSIONS_SERVICE.SESSION_NOT_VALID_OR_EXPIRED.KEY),
      );
    }

    const payload = { sub: session.userId };
    const newToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    await this.revokeSession(oldRefreshToken);
    await this.createSession(
      session.userId,
      newRefreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 dias
    );

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}
