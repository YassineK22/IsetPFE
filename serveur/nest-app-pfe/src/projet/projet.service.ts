import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Projet } from 'src/model/project.model';

@Injectable()
export class ProjetService {
  constructor(
    @InjectModel(Projet.name) private readonly projetModel: Model<Projet>,
  ) {}

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

  async getAllProjectsAttpremier(): Promise<Projet[]> {
    return this.projetModel.find({ etatProjet: 'Attpremier' }).exec();
  }

  async getProjetByIdEtudiant(idEtudiant: string): Promise<Projet> {
    return this.projetModel.findOne({ idEtudiant }).exec();
  }

  async getProjetsByEncadreurEnseignant(
    encadreurEnseignant: string,
  ): Promise<Projet[]> {
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

  
  async changeEtatProjet(id: string, etat: string): Promise<Projet> {
    const updatedProjet = await this.projetModel
      .findByIdAndUpdate(id, { etatProjet: etat }, { new: true })
      .exec();
    if (!updatedProjet) {
      throw new NotFoundException('Could not find projet.');
    }
    return updatedProjet;
  }

  async changeEtatProjetByIdEtudiant(idEtudiant: string, etat: string): Promise<Projet> {
    const updatedProjet = await this.projetModel.findOneAndUpdate({ idEtudiant }, { etatProjet: etat }, { new: true }).exec();
    if (!updatedProjet) {
      throw new NotFoundException('Could not find projet.');
    }
    return updatedProjet;
  }
  
}
