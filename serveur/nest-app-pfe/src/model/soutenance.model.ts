import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({
    enum: [
      'premier', //Jury Affecter
      'Attpremier', // Attendre jury affectation
      'nonPremier', // Refuse de la soutenace
      'enAttenteS', // Attendre note des jury
      'noteDonner', 
      'noteValider',
      'noteNValider',
    ],
    default: 'Attpremier',
  })
  etat: string;

  @Prop({ required: true })
  rapport: string;
}

export const SoutenanceSchema = SchemaFactory.createForClass(Soutenance);
