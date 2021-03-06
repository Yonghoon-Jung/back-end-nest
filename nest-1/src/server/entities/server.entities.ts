import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  other: number;
}
