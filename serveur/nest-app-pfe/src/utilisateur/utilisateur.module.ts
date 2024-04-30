import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';

@Module({
  controllers: [UtilisateurController]
})
export class UtilisateurModule {}
