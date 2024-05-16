import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Projet } from 'src/model/project.model';

@Injectable()
export class ProjetService {
  constructor(@InjectModel(Projet.name) private readonly projetModel: Model<Projet>) {}

  async getAllProjets(): Promise<Projet[]> {
    return this.projetModel.find().exec();
  }

  async getAllProjects(etatProjet?: string): Promise<Projet[]> {
    const filter: any = etatProjet ? { etatProjet } : {};
    return this.projetModel.find(filter).exec();
  }

  async getProjetById(id: string): Promise<Projet> {
    return this.projetModel.findById(id).exec();
  }

  async getProjetByIdEtudiant(idEtudiant: string): Promise<Projet> {
    return this.projetModel.findOne({ idEtudiant }).exec();
  }

  async getProjetsByEncadreurEnseignant(encadreurEnseignant: string): Promise<Projet[]> {
    return this.projetModel.find({ encadreurEnseignant }).exec();
  }

  async createProjet(data: any): Promise<Projet> {
    const projet = new this.projetModel(data);
    return await projet.save();
  }

  async updateProjet(id: string, data: any): Promise<Projet> {
    delete data.etatProjet; // Remove etatProjet from data
    return await this.projetModel.findByIdAndUpdate(id, data, { new: true });
  }

  async updateAllProjet(id: string, data: any): Promise<Projet> {
    return await this.projetModel.findByIdAndUpdate(id, data, { new: true });
  }

  async changeEtatToEnAttente(id: string): Promise<Projet> {
    return await this.projetModel.findByIdAndUpdate(id, { etatProjet: 'enAttente' }, { new: true });
  }

  async changeEtatToConfirmer(id: string): Promise<Projet> {
    return await this.projetModel.findByIdAndUpdate(id, { etatProjet: 'confirmer' }, { new: true });
  }

  async changeEtatToAnnuler(id: string): Promise<Projet> {
    return await this.projetModel.findByIdAndUpdate(id, { etatProjet: 'annuler' }, { new: true });
  }
}
