import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export interface IUser {
    id?: string
    email: string
    password: string
    phone?: string
}

@Entity('user')
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    email: string
    @Column()
    password: string
    @Column({nullable: true})
    phone: string
}