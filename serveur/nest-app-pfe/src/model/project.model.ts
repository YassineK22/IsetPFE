import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EntrepriseAccueil } from './entreprise-accueil.model';
import { EncadreurEntreprise } from './encadreur-entreprise.model';

export enum EtatProjet {
  premier = 'premier',
  Attpremier = 'Attpremier',
  nonPremier = 'nonPremier',
  enAttente = 'enAttente',
  confirmer = 'confirmer',
  annuler = 'annuler',
}

@Schema()
export class Projet extends Document {
  @Prop({ required: true, unique: true })
  idEtudiant: string;

  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  problematique: string;

  @Prop({ required: true })
  natureSujet: string;

  @Prop({ type: EntrepriseAccueil, required: true })
  entrepriseAccuel: EntrepriseAccueil;

  @Prop({ type: EncadreurEntreprise, required: true })
  encadreurEntreprise: EncadreurEntreprise;

  @Prop()
  encadreurEnseignant: string;

  @Prop()
  attestation: string;

  @Prop({ enum: EtatProjet, default: EtatProjet.Attpremier })
  etatProjet: string;
}

export const ProjetSchema = SchemaFactory.createForClass(Projet);
