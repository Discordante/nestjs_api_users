import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
}
