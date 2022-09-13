import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    filename: string;

    @Column({
        type: 'blob',
    })
    data: Uint8Array;
}