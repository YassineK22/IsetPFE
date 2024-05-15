import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EtatProjet {
  premier = 'premier',
  enAttente = 'enAttente',
  confirmer = 'confirmer',
  annuler = 'annuler',
}
@Schema()
export class Projet extends Document {
  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  problematique: string;

  @Prop({ required: true })
  natureSujet: string;

  @Prop({ required: true })
  entrepriseAccuel: string;

  @Prop()
  encadreurEntreprise: string;

  @Prop()
  encadreurEnseignant: string;

  @Prop()
  attestation: string;

  @Prop({enum: EtatProjet, default: EtatProjet.premier})
  etatProjet: string;
}

export const ProjetSchema = SchemaFactory.createForClass(Projet);
