import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Info {
    @PrimaryColumn()
    _id: number;

    @Column()
    style: string;

    @Column()
    photos: string;

    @Column()
    groom: string;

    @Column()
    bride: string;

    @Column()
    phone1: string;

    @Column()
    phone2: string;

    @Column()
    date1: string;

    @Column()
    date2: string;

    @Column()
    time: string;

    @Column()
    hotel: string;

    @Column()
    address: string;

    @Column()
    lon: string;

    @Column()
    lat: string;

    @Column()
    music: string;
}