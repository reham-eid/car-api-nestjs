import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor( @InjectRepository(User) 
  private repo: Repository<User>){}
  // Repository is a class contained methods related to DB created by TypeOrm

  createUser(email:string , password:string ): Promise<User>{
    const user = this.repo.create({email , password })
    return this.repo.save(user)
  }

  findOne(id:number):Promise<User>{
    if(!id) return null
    return this.repo.findOneBy({ id })
  }

  find(email?:string): Promise<User[]>{
    return this.repo.find({ where : { email }})
  }

  async update(id:number , attrs : Partial<User>):Promise<User>{
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    Object.assign(user , attrs)
    return this.repo.save(user) // hooks will excuted
  }

  async remove(id:number):Promise<User>{
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return this.repo.remove(user) // hooks will excuted
  }
  
}
