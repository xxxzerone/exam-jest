import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/config/database/typeorm-custom.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { Users } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([Users, UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
