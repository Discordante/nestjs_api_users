import { Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'src/config/logger/logging';
import { Repository } from 'typeorm';
import { CreatedUserDto } from './dto/added-user.dto';
import { CreateUserDto } from './dto/user.dto';
import { Users } from './entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @Logger(UserService.name) private readonly logger: LoggerService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async findById(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    this.logger.log('Adding user');
    return { id: 2 };
  }
}
