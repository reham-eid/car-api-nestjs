import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reports)
  // {user.reports} the same defined in User entity
  user: User;

  @Column({ default: false })
  approved: boolean; // ststus of report

  @Column()
  price: number;

  @Column()
  company: string; // like:toyota

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number; // km that vahicle was driven when it sold
}
