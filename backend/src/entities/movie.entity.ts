import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('movies')
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name:string

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    img_url: string;

    @ManyToOne((type) => User, (user) => user.movies)
    @JoinColumn({name: 'user_id'})
    user: User;

}