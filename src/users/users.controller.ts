import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dto/page.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { UpdateResult } from 'typeorm';
import { CreatedUserDto } from './dto/added-user.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
import { Users } from './entities/User.entity';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Users | null> {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({
    description: 'List of users registration data.',
    type: [PageDto<UsersDto[]>],
  })
  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UsersDto>> {
    return this.userService.findAll(pageOptionsDto);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreatedUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
