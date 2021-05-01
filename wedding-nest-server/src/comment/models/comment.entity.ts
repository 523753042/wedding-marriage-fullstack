import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    avatarUrl: string;

    @Column()
    city: string;

    @Column()
    comment: string;

    @Column()
    country: string;

    @Column()
    gender: string;

    @Column()
    language: string;

    @Column()
    nickName: string;

    @Column()
    province: string;

    @Column()
    time: string;

    @Column()
    _openid: string;

    @Column()
    isDel: string;
}