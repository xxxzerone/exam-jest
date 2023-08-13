import { CustomRepository } from 'src/common/decorators/typeorm-custom.decorator';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@CustomRepository(Users)
export class UsersRepository extends Repository<Users> {
  async findOneByUserId(id: number): Promise<Users> {
    return await this.findOne({
      where: { id },
    });
  }
}
