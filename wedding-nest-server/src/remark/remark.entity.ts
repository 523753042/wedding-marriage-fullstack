import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Remark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    remark: string;
}