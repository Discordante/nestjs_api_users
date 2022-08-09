import {
  HttpException,
  HttpStatus,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'src/config/logger/logging';
import { Repository } from 'typeorm';
import { CreatedUserDto } from './dto/added-user.dto';

import { CreateUserDto } from './dto/user.dto';
import { Users } from './entities/User.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @Logger(UserService.name) private readonly logger: LoggerService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly userMapper: UserMapper,
  ) {}
  async findById(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new HttpException(
        'A user with that email already exists.',
        HttpStatus.CONFLICT,
      );
    }

    this.logger.log('Adding user');
    const newUser = this.usersRepository.create(createUserDto);
    const result = await this.usersRepository.save(newUser);
    return this.userMapper.toCreatedUserDto(result);
  }

  async deleteUser(id: number): Promise<void> {
    const existingUser = await this.usersRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException();
    }
    this.logger.log('Deleting user');
    const deletedUser = await this.usersRepository.softDelete(id);
  }
}
