import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Egg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    _id: string;

    @Column()
    avatarUrl: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    del: string;

    @Column()
    gender: string;

    @Column()
    language: string;

    @Column()
    money: string;

    @Column()
    nickName: string;

    @Column()
    province: string;

    @Column()
    rank: string;

    @Column()
    time: number;
}