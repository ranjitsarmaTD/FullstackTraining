import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Leaves } from "./Leaves";
import { Salary } from "./Salary";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  employeeId!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; //this is userPassword but hashed. Not the actual password

  @Column()
  name!: string;

  @Column()
  role!: "hr" | "admin" | "employee";

  @Column({ type: "date", nullable: true })
  dob!: Date;

  @Column({ type: "date", nullable: true })
  joiningDate!: Date;

  @Column({ nullable: true })
  location!: string;

  @OneToMany(() => Leaves, (leave) => leave.user)
  leaves!: Leaves[];

  @OneToMany(() => Salary, (salary) => salary.user)
  salaries!: Salary[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
//soft delete
