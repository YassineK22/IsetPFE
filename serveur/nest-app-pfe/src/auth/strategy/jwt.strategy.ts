import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Utilisateur } from 'src/model/utilisateur.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel('Utilisateur') private utilisateurModel: Model<Utilisateur>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: string;
    userId: string;
    email: string;
    role: string;
    theme: string;
  }) {
    console.log(payload)
    const user = await this.utilisateurModel.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { _id, pieceIdentite, email, role, theme } = user.toJSON();
    return { _id, pieceIdentite, email, role, theme };
  }
}
