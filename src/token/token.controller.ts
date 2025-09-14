import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async getToken() {
    const { token, expiresAt } = await this.tokenService.getAccessToken();
    return {
      tokenType: 'Bearer',
      token,
      expiresAt,
      hint: 'Use this token in Authorization header: Bearer <token>',
      scope: process.env.GOOGLE_SCOPES || 'https://www.googleapis.com/auth/firebase.messaging',
    };
  }
}
