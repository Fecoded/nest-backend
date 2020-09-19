import { IsNotEmpty, Length, IsEmail, IsPhoneNumber } from 'class-validator';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Contact {
  @Prop()
  @IsNotEmpty()
  @Length(3, 25)
  name: string;

  @Prop({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ unique: true })
  @IsPhoneNumber('ZZ')
  @IsNotEmpty()
  phone: string;

  @Prop()
  city: string;

  @Prop()
  state: string;
  @Prop()
  country: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
