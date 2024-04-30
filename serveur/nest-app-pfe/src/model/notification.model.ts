import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ type: [String], required: true })
  utilisateur: string[];

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, default: Date.now })
  dateNotification: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
