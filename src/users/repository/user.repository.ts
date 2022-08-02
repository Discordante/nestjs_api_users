import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/User.entity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async findById(id: number): Promise<Users | null> {
    return this.createQueryBuilder('u')
      .where('u.id = :id', { id })
      .andWhere('u.deleted_at = :deleted_at', { deleted_at: null })
      .getOne();
  }
}
