import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Table name
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}