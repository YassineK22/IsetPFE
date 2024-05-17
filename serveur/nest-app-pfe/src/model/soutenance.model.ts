import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export enum EtatSoutenance{
  premier = 'premier',
  enAttente = 'enAttente',
  confirmer = 'confirmer',
  annuler = 'annuler',
}

@Schema()
export class Soutenance extends Document {
  @Prop({ type: Number })
  noteTechnique: number;

  @Prop({ required: true, unique: true })
  idEtudiant: string;

  @Prop({ type: Number })
  notePresentation: number;

  @Prop()
  jugeTechnique: string;

  @Prop()
  jugePresentation: string;

  @Prop({enum: EtatSoutenance, default: EtatSoutenance.premier})
  etat: string;

  @Prop({ required: true })
  rapport : string;
}

export const SoutenanceSchema = SchemaFactory.createForClass(Soutenance);
