import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Soutenance } from 'src/model/soutenance.model';

@Injectable()
export class SoutenanceService {
  constructor(
    @InjectModel(Soutenance.name)
    private readonly soutenanceModel: Model<Soutenance>,
  ) {}

  async getAllSoutenances(): Promise<Soutenance[]> {
    return this.soutenanceModel.find().exec();
  }

  async getSoutenanceById(id: string): Promise<Soutenance> {
    return this.soutenanceModel.findById(id).exec();
  }

  async createSoutenance(rapport: string): Promise<Soutenance> {
    const soutenance = new this.soutenanceModel({ rapport });
    return await soutenance.save();
  }

  async editSoutenance(
    id: string,
    data: Partial<Soutenance>,
  ): Promise<Soutenance> {
    const soutenance = await this.soutenanceModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!soutenance) {
      throw new NotFoundException('Soutenance not found');
    }
    return soutenance;
  }
}
