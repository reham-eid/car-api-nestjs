import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class User{

  @PrimaryGeneratedColumn()
  id:number

  @Column()
  email:string

  @Column()
  password:string

  @AfterInsert()
  logInsert(){
    console.log(`insert user with ID ${this.id}`);
  }
  @AfterUpdate()
  logUpdate(){
    console.log(`Update user with ID ${this.id}`);
  }
  @AfterRemove()
  logRemove(){
    console.log(`Remove user with ID ${this.id}`);
  }
}