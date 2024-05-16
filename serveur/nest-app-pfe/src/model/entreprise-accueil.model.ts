import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



// EntrepriseAccueil schema
@Schema()
export class EntrepriseAccueil extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  adresseEntreprise: string;

  @Prop({ required: true })
  governorat: string;
}

export const EntrepriseAccueilSchema = SchemaFactory.createForClass(EntrepriseAccueil);
