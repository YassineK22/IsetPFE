import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  utilisateurExpediteur: string;

  @Prop({ required: true })
  utilisateurDestinataire: string;

  @Prop({ required: true })
  contenu: string;

  @Prop()
  group: string;

  @Prop({ required: true, default: false })
  estGlobal: boolean;

  @Prop({ required: true, default: Date.now })
  date: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
