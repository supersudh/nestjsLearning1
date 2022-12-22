import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';


describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service

    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) => Promise.resolve({ id: 1, email, password })
    };


    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
      ],
    }).compile(); // We are creating a new DI (Dp inj) container with this block of code

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await service.signup('qwe@qwe.com', 'qwe');
    expect(user.password).not.toEqual('qwe');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async (done) => {
    fakeUsersService.find = () =>

      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    try {
      await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
        BadRequestException,
      );
    } catch (error) {
      done();
    }
  });

  // it('throws if signin is called with an unused email', async () => {
  //   await expect(
  //     service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
  //   ).rejects.toThrow(NotFoundException);
  // });
});

