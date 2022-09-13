import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manager {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    OPENID: string;

}