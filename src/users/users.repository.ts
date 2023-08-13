import { Injectable } from '@nestjs/common';
import { Users } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

// custom repository 참고 자료
// https://hou27.tistory.com/entry/TypeORM-Custom-Repository-%EA%B0%9C%EC%84%A0%EC%95%88
@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private readonly dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findOneByUserId(id: number): Promise<Users> {
    return await this.findOne({
      where: { id },
    });
  }
}
