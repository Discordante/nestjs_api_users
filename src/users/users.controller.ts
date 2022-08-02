import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatedUserDto } from './dto/added-user.dto';
import { CreateUserDto } from './dto/user.dto';
import { Users } from './entities/User.entity';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Users | null> {
    return this.userService.findById(id);
  }

  @Post()
  async createUser( @Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    return this.userService.createUser(createUserDto);
  }
}
