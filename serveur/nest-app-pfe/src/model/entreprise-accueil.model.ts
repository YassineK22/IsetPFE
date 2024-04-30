import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Adresse schema
@Schema()
export class Adresse {
  @Prop({ required: true })
  rue: string;

  @Prop({ required: true })
  ville: string;

  @Prop({ required: true })
  codePostal: string;

  @Prop({ required: true })
  pays: string;
}

export const AdresseSchema = SchemaFactory.createForClass(Adresse);

// EntrepriseAccueil schema
@Schema()
export class EntrepriseAccueil extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ type: AdresseSchema, required: true })
  adresseEntreprise: Adresse;

  @Prop({ required: true })
  governorat: string;
}

export const EntrepriseAccueilSchema = SchemaFactory.createForClass(EntrepriseAccueil);
