import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Group extends Document {
  @Prop({ required: true })
  nomGroup: string;

  @Prop({ type: [String], required: true })
  listUtilisateur: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
