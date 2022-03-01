import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  no: number;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
