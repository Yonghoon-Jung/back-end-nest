import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsString, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  id: false, // id가 true일 경우 ObjectId와 동일하게 생성되지만 소켓 id를 넣어줄 것이기에 false
  collection: 'sockets',
  timestamps: true,
};

@Schema(options)
export class Socket extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}

export const SocketSchema = SchemaFactory.createForClass(Socket);
