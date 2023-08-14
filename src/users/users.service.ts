import { Injectable, NotFoundException } from '@nestjs/common';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UsersRepository } from './users.repository';
import { Users } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async update(id: number, requestDto: UserUpdateRequestDto) {
    const user = await this.findUserById(id);
    const { firstName, lastName } = requestDto;

    user.firstName = firstName;
    user.lastName = lastName;

    return await this.usersRepository.save(user);
  }

  async findUserById(id: number): Promise<Users> {
    const user = await this.usersRepository.findOneByUserId(id);
    console.log('findUserById() >>>>>');
    if (!user) {
      throw new NotFoundException('유저가 없습니다.');
    }

    return user;
  }
}
