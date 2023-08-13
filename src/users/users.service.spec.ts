import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

type MockType<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
// type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

// const mockUsersRepository = () => ({
//   findOneByUserId: jest.fn(),
// });

const mockDataSource = () => ({
  createEntityManager: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;
  // let usersRepository: MockRepository<UsersRepository>;
  let dataSource: MockType<DataSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        // {
        //   provide: UsersRepository,
        //   useValue: mockUsersRepository(),
        // },
        {
          provide: DataSource,
          useValue: mockDataSource(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    // usersRepository =
    //   module.get<MockRepository<UsersRepository>>(UsersRepository);
    dataSource = module.get<MockType<DataSource>>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update Patch /users/id', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const id = 10;
      const requestDto = UserUpdateRequestDto.of('illon', 'must');
      jest.spyOn(usersRepository, 'findOneByUserId').mockResolvedValue(null);

      const result = async () => {
        await service.update(id, requestDto);
      };

      expect(result).rejects.toThrowError(
        new NotFoundException('유저가 없습니다.'),
      );
    });
  });
});
