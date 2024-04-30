import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Projet extends Document {
  @Prop({ required: true })
  titre: string;

  @Prop()
  problematique: string;

  @Prop()
  natureSujet: string;

  @Prop({ required: true })
  entrepriseAccuel: string;

  @Prop({ required: true })
  encadreurEntreprise: string;

  @Prop()
  encadreurEnseignant: string;

  @Prop({ required: true })
  attestation: string;

  @Prop()
  etatProjet: string;
}

export const ProjetSchema = SchemaFactory.createForClass(Projet);
