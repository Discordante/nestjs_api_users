import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

export class UsersDto extends PickType(CreateUserDto, ['email'] as const) {}
