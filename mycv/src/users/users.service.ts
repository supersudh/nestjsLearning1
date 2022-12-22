import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user); // alt: return this.repo.save({ email, password }) side effect: Hooks are not executed
    // Also, insert() and update() are used with plain objects
    // save and remove are used to work with entity instances
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('You are not logged in')
    }
    return this.repo.findOneBy({ id }); // if id is null, then we get the first among the list of users
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) { // Partial Type helper tells us that attrs can be any object that has atleast or none someof the properties of User class
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    // Note: .remove is designed to work with an Entity and .delete is designed to work with plain id
    // Twice the work to get the hooks executed, i.e, if we use .remove instead of .delete ... Hope you understand ^_^
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
