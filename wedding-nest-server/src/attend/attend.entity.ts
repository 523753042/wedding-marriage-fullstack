import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attend {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    _id: string;

    @Column()
    attendInfo: string;

    @Column()
    userInfo: string;

    @Column()
    time: string;
}