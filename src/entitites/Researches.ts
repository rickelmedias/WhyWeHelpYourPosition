import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from "uuid";

@Entity("researches")
export class Researches {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    keyword: string;

    @Column()
    website: string;

    @Column({ type: 'datetime' })
    created_at: Date;

    constructor () {
        if (!this.id) {
            this.id = uuid();
        }
    }
}