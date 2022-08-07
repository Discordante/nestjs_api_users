import { Injectable } from '@nestjs/common';
import { CreatedUserDto } from '../dto/added-user.dto';

import { Users } from '../entities/User.entity';

@Injectable()
export class UserMapper {
  toCreatedUserDto(user: Users): CreatedUserDto {
    return {
      email: user.email,
    };
  }
}
