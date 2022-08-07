import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

export class CreatedUserDto extends PickType(CreateUserDto, [
  'email',
] as const) {}
