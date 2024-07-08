import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
// import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;
  let controller: UserController;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUserService = {
      find: (email?: string) => {
        return Promise.resolve([{ id: 1, email, password: 'rere' } as User]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 're@gmail.com',
          password: 'rere',
        } as User);
      },
      update: async (id: number, attrs: Partial<User>) => {
        const user = await fakeUserService.findOne(id);
        Object.assign(user, attrs);
        return Promise.resolve(user);
      },
      remove: async (id: number) => {
        const user = await fakeUserService.findOne(id);
        users.filter((user) => user.id == id);
        return Promise.resolve(user);
      },
      createUser: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    fakeAuthService = {
      // signUp: (email: string, password: string) => {
      //   return fakeUserService.createUser(email, password);
      // },
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('returns list of all users with the given email', async () => {
  //   const users = await controller.AllUsers('re@g.com');
  //   expect(users.length).toEqual(1);
  //   expect(users[0].email).toEqual('re@g.com');
  // });

  // it('findUser throws an error if user with given id is not found', async () => {
  //   fakeUserService.findOne = () => null;
  //   await expect(controller.OneUser('1')).rejects.toThrow(NotFoundException);
  // });

  // it('returns single user with the given id', async () => {
  //   const user = await fakeUserService.findOne(1);

  //   expect(user).toBeDefined();
  // });

  // it('updates sission object and return user', async () => {
  //   const session = { userId: 10 };
    
  //   const user = await controller.signIn(
  //     { email: 're@g.com', password: '123' },
  //     session,
  //   );

//     expect(user.id).toEqual(1); // same in fakeAuthService.signIn()
//     expect(session.userId).toEqual(1);
//   });
});
