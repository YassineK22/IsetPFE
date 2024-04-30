import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Soutenance extends Document {
  @Prop({ required: true, type: Number })
  noteTechnique: number;

  @Prop({ required: true, type: Number })
  notePresentation: number;

  @Prop({ required: true })
  jugeTechnique: string;

  @Prop({ required: true })
  jugePresentation: string;

  @Prop({ required: true })
  etat: string;
}

export const SoutenanceSchema = SchemaFactory.createForClass(Soutenance);
