import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attend {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    attendInfo: string;

    @Column()
    userInfo: string;

    @Column()
    time: Date;
}