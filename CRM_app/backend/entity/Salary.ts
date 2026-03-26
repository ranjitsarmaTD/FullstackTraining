import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("salaries")
export class Salary {
  @PrimaryGeneratedColumn("uuid")
  salaryId!: string;

  @Column()
  baseSalary!: number;

  @Column({ default: 0 })
  bonus!: number;

  @Column({ default: 0 })
  deductions!: number;

  @Column()
  month!: string; 

  @Column()
  year!: number; 

  @Column()
  netSalary!: number;

  // RELATION
  @ManyToOne(() => User, (user) => user.salaries)
  @JoinColumn({ name: "userId" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}