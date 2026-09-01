import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from '../../users/users.service';
import type { Request } from 'express';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      // Get JWT from the HTTP-only cookie
      jwtFromRequest: (request: Request): any => {
        console.log('COOKIES:', request.cookies);
        return request.cookies?.access_token;
      },

      //TODO: Fix the lens error (any)

      // Reject expired tokens
      ignoreExpiration: false,

      // Get secret from .env
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    // Find user using UUID from JWT
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Becomes request.user
    return user;
  }
}
