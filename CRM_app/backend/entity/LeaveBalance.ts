//this entity is schema for leaves each employee can have.

import {
  Entity,
  PrimaryGeneratedColumn,   
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./User";


@Entity("leave_balances")
export class LeaveBalance {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ default: 3 })
    sickLeaves!: number;

    @Column({ default: 3 })
    casualLeaves!: number

    @Column({ default: 1})
    earnedLeaves!: number;

    @OneToOne(()=>User)
    @JoinColumn()
    user!:User;

}