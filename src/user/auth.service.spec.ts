import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";

describe('AuthService-Test', () => {
  let service:AuthService 
  let authUserFake :Partial<UserService>
  beforeEach(async() => {
    /** OLD WAY (more static) */
    // //create a copy of fake data
    // authUserFake = {
    //   find:() => Promise.resolve([]),
    //   createUser : (email:string , password:string ) => 
    //   Promise.resolve({id:1 , email , password } as User)
    // }

    /** NEW WAY (more dynamic) */
    //create a copy of fake data
    const users : User[] = []
    authUserFake = {
      find:(email? : string) =>{
        const filteredUsers = users.filter((user)=> user.email === email)
        return Promise.resolve(filteredUsers)
      } ,
      createUser : (email:string , password:string ) => {
        const user = {
          id: Math.floor( Math.random() * 999),
          email,
          password
        }as User
        users.push(user)
        return Promise.resolve(user)
      }
    }
    
  const module:TestingModule = await Test.createTestingModule({
    providers:[
      AuthService,
      {
        provide:UserService,
        useValue:authUserFake
      }
    ]
  }).compile()

  service = module.get<AuthService>(AuthService)

  })
  
  it('test Authentacation Service ', async ()=>{
    expect(service).toBeDefined()
  })

  it('create a user with hashed password ' , async() => {
    const user = await service.signUp('rere@rere.com' , 'qwr')
    
    expect(user.password).not.toEqual('qwr')

    const [ salt , hashedPassword ] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hashedPassword).toBeDefined()
  })

  it('throws an error message if email of user already used while sign-up' , async () => {
    //overrides the find method
    authUserFake.find = () => {
      return Promise.resolve([{ id: 1, email: 'a', password: '1' } as User])
    }
    await expect( service.signUp('rere@rere.com' , 'qwr') ).rejects.toThrow(
      BadRequestException
    )
  })

  it('throws an error message if sign-in is called with email of user is not found ' , async () => {
    // if find method is success 
    await expect( service.signIn('rere@rere.com' , 'qwr') ).rejects.toThrow(
      NotFoundException
    )
  })

  it('throws an error message if an invalid password is provided while sign-in' , async () => {
    //overrides the find method
    authUserFake.find = () => {
      return Promise.resolve([{ email: '2rehamoo1000@gmail.com', password: 'P2assword#123' } as User])
    }
    await expect( service.signIn('rere@we.com' , '1')).rejects.toThrow(
      UnauthorizedException
    )
  })

  it('sign-in with hashed password ' , async() => {
    /** OLD WAY (more static) */
    //overrides the find method
    // authUserFake.find = () => {
    //   return Promise.resolve([
    //     { 
    //       email: '2rehamoo1000@gmail.com',
    //       password: 
    //       '66988cb95e8d8341.b9c1897f073993cd23c82a907b784c5b6bb2ecbff472100f8ec893a3952f59c67614b8d6c7aa0b329c6859454048096219ea99024fb7bdb97eb3b385d3d547cc'
    //     } as User
    //   ])
    // }
    // const user = await service.signIn('2rehamoo1000@gmail.com' , 'P2assword#123');
    // expect(user).toBeDefined()

    /** NEW WAY (more dynamic) */
    await service.signUp('jecekaoni@gmail.com' , 'J123'); 
    const user = await service.signIn('jecekaoni@gmail.com' , 'J123'); 
    expect(user).toBeDefined()
  })

})