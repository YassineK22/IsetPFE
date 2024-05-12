import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Utilisateur extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({enum: ['M', 'F'], required: true })
  sexe: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  telephone: string;

  @Prop({ required: true })
  pieceIdentite: string;

  @Prop({ required: true })
  motDePasse: string;

  @Prop({ enum: ['light', 'dark'], default: 'light' })
  theme: string;

  @Prop()
  specialite: string;

  @Prop({ enum: ['etudiant','enseignant','responsable'], required: true })
  role: string;

  //For the forget password option
  @Prop()
  resetPasswordToken: string;

  @Prop({ type: Date })
  resetPasswordExpires: Date;
}

export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur);
