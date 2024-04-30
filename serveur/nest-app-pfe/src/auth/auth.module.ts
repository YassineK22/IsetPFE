import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; // Import your service
import { JwtStrategy } from './strategy';
import { UtilisateurSchema } from 'src/model/utilisateur.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Utilisateur', schema: UtilisateurSchema },
    ]),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
