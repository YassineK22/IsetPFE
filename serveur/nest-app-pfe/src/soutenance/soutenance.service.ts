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

  async getAllSoutenancesByState(state: string): Promise<Soutenance[]> {
    return this.soutenanceModel.find({ etat: state }).exec();
  }

  async getAllSoutenancesAttpremier(): Promise<Soutenance[]> {
    return this.getAllSoutenancesByState('Attpremier');
  }

  async getAllSoutenancesPremier(): Promise<Soutenance[]> {
    return this.getAllSoutenancesByState('premier');
  }

  async getAllSoutenancesNoteDonner(): Promise<Soutenance[]> {
    return this.getAllSoutenancesByState('noteDonner');
  }

  async getSoutenanceByStudentId(idEtudiant: string): Promise<Soutenance> {
    const soutenance = await this.soutenanceModel.findOne({ idEtudiant }).exec();
    if (!soutenance) {
      throw new NotFoundException('Soutenance not found for the given student id');
    }
    return soutenance;
  }

  async createSoutenance(
    idEtudiant: string,
    rapport: string,
  ): Promise<Soutenance> {
    const soutenance = new this.soutenanceModel({ idEtudiant, rapport });
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

  async getResultat(id: string): Promise<number> {
    const soutenance = await this.getSoutenanceById(id);
    if (!soutenance) {
      throw new NotFoundException('Soutenance not found');
    }

    // Calculate the result by adding the two notes and dividing by 2
    const resultat =
      soutenance.noteTechnique * 0.6 + soutenance.notePresentation * 0.4;
    return resultat;
  }

  async changeEtatSoutenance(id: string, etat: string): Promise<Soutenance> {
    const updatedSoutenance = await this.soutenanceModel
      .findByIdAndUpdate(id, { etat }, { new: true })
      .exec();
    if (!updatedSoutenance) {
      throw new NotFoundException('Could not find soutenance.');
    }
    return updatedSoutenance;
  }

  async changeEtatPremier(id: string): Promise<Soutenance> {
    return this.changeEtatSoutenance(id, 'premier');
  }

  async changeEtatAttpremier(id: string): Promise<Soutenance> {
    return this.changeEtatSoutenance(id, 'Attpremier');
  }

  async changeEtatNonPremier(id: string): Promise<Soutenance> {
    return this.changeEtatSoutenance(id, 'nonPremier');
  }

  async changeEtatEnAttenteS(id: string): Promise<Soutenance> {
    return this.changeEtatSoutenance(id, 'enAttenteS');
  }

  async changeEtatNoteDonner(id: string): Promise<Soutenance> {
    return this.changeEtatSoutenance(id, 'noteDonner');
  }

  async changeEtatNoteValider(id: string): Promise<Soutenance> {
    return this.changeEtatSoutenance(id, 'noteValider');
  }

  async changeEtatNoteNValider(id: string): Promise<Soutenance> {
    return this.changeEtatSoutenance(id, 'noteNValider');
  }
}
