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
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
import { Users } from './entities/User.entity';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Users | null> {
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
  ): Promise<InsertResult> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch('/:id/password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdateResult> {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
