import { Module } from '@nestjs/common';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SoutenanceModule } from './soutenance/soutenance.module';
import { ProjetModule } from './projet/projet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule accessible everywhere in the app
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService], // Inject ConfigService into the useFactory function
    }),
    AuthModule,
    UtilisateurModule,
    SoutenanceModule,
    ProjetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
