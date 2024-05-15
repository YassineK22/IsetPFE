import { Module } from '@nestjs/common';
import { ProjetController } from './projet.controller';
import { ProjetService } from './projet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjetSchema } from 'src/model/project.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Projet', schema: ProjetSchema },
    ]),
  ],
  controllers: [ProjetController],
  providers: [ProjetService]
})
export class ProjetModule {}
