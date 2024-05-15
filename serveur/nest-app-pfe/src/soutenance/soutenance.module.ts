import { Module } from '@nestjs/common';
import { SoutenanceService } from './soutenance.service';
import { SoutenanceController } from './soutenance.controller';
import { SoutenanceSchema } from 'src/model/soutenance.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Soutenance', schema: SoutenanceSchema },
    ]),
  ],
  providers: [SoutenanceService],
  controllers: [SoutenanceController]
})
export class SoutenanceModule {}
