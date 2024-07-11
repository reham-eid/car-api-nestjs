import { Report } from '../report/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Report, (report) => report.user)
  // report.user cause we are in user-entity which defined
  reports: Report[];

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`insert user with ID ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Update user with ID ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Remove user with ID ${this.id}`);
  }
}
