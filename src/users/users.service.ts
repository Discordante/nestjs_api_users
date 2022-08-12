import {
  HttpException,
  HttpStatus,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/pageMeta.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { Logger } from 'src/config/logger/logging';
import { Repository, UpdateResult } from 'typeorm';
import { CreatedUserDto } from './dto/added-user.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
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

  async findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UsersDto>> {
    const { skip, take, order } = pageOptionsDto;

    const entities = await this.usersRepository.find({
      select: ['id', 'email'],
      skip: skip,
      take: take,
      order: { id: order },
    });
    const itemCount = await this.usersRepository.count();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const existingUserbyEmail = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUserbyEmail) {
      throw new HttpException(
        { errors: 'Email already exists.' },
        HttpStatus.CONFLICT,
      );
    }

    const existingUser = await this.usersRepository.findOneBy({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
    });

    if (existingUser) {
      throw new HttpException(
        { errors: 'User already exists.' },
        HttpStatus.CONFLICT,
      );
    }
    
    const newUser = this.usersRepository.create(createUserDto);
    const result = await this.usersRepository.save(newUser);
    return this.userMapper.toCreatedUserDto(result);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.findOne(id);
    const update = this.usersRepository.update(id, updateUserDto);
    return update;
  }

  async deleteUser(id: number): Promise<void> {
    const existingUser = await this.usersRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException();
    }
    const deletedUser = await this.usersRepository.softDelete(id);
  }
}
