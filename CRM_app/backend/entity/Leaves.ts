import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("leaves")
export class Leaves {
  @PrimaryGeneratedColumn("uuid")
  leaveId!: string;

  @Column()
  employeeId!: string;   //from context

  @Column()
  leaveType!: "sick" | "casual" | "earned"; //leavetype

  @Column()
  startDate!: Date;
  @Column()
  endDate!: Date;

  @Column()
  reason!: string;

  @Column({ default: "pending" })
  status!: "pending" | "approved" | "rejected";  

  @Column({ nullable: true })
  approvedBy!: string; //Emp id of manager

  @ManyToOne(() => User, (user) => user.leaves)
  @JoinColumn({ name: "userId" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
