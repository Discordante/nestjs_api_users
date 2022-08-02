import { Injectable } from '@nestjs/common';
import { Users } from './entities/User.entity';
import { UsersRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findById(id: number): Promise<Users | null> {
    return this.usersRepository.findById(id);
  }
}
