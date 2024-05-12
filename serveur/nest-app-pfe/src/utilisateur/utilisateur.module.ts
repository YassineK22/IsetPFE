import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilisateurSchema } from 'src/model/utilisateur.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Utilisateur', schema: UtilisateurSchema },
    ]),
  ],
  providers: [UtilisateurService],
  controllers: [UtilisateurController]
})
export class UtilisateurModule {}
