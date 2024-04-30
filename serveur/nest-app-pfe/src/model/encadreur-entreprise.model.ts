import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EncadreurEntreprise extends Document {
  @Prop({ required: true })
  nomEncadreurEntreprise: string;

  @Prop({ required: true })
  nomEncadreurE: string;

  @Prop({ required: true })
  emailEncadreurE: string;

  @Prop({ required: true })
  telephoneEncadreurE: string;
}

export const EncadreurEntrepriseSchema = SchemaFactory.createForClass(EncadreurEntreprise);
