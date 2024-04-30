import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EntrepriseAccueil } from './entreprise-accueil.model';
import { EncadreurEntreprise } from './encadreur-entreprise.model';

@Schema()
export class OffreStage extends Document {
  @Prop({ type: EntrepriseAccueil, required: true })
  entrepriseAccueil: EntrepriseAccueil;

  @Prop({ type: EncadreurEntreprise, required: true })
  encadreurEntreprise: EncadreurEntreprise;

  @Prop({ required: true })
  attestation: string;

  @Prop({ required: true })
  problematique: string;

  @Prop({ required: true })
  natureSujet: string;

  @Prop({ required: true })
  etat: string;
}

export const OffreStageSchema = SchemaFactory.createForClass(OffreStage);
