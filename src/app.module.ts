import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './config/database/typeorm.config.module';
import { TypeOrmConfigService } from './config/database/typeorm.config.service';
import { UsersModule } from './users/users.module';

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [TypeOrmConfigModule],
  useClass: TypeOrmConfigService,
  inject: [TypeOrmConfigService],
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    typeOrmModule,
    UsersModule,
  ],
})
export class AppModule {}
