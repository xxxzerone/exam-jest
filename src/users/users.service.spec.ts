import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { Users } from '../entities/user.entity';

type MockType<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

const mockUsersRepository = () => ({
  findOneByUserId: jest.fn(),
  save: jest.fn(),
});

const mockDataSource = () => ({
  createEntityManager: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;
  let usersRepository_test: MockRepository<UsersRepository>;
  let dataSource: MockType<DataSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository(),
        },
        {
          provide: DataSource,
          useValue: mockDataSource(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    usersRepository_test =
      module.get<MockRepository<UsersRepository>>(UsersRepository);
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

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 수정하고 수정된 유저를 반환한다', async () => {
      const id = 2;
      const lastName = 'jang';
      const firstName = 'bal';
      const requestDto = UserUpdateRequestDto.of(firstName, lastName);
      const existedUser = Users.of('bo', lastName);
      const savedUser = Users.of(firstName, lastName);
      jest
        .spyOn(usersRepository, 'findOneByUserId')
        .mockResolvedValue(existedUser);
      jest.spyOn(usersRepository, 'save').mockResolvedValue(savedUser);
      // usersRepository_test.findOneByUserId.mockResolvedValue(existedUser);
      // usersRepository_test.save.mockResolvedValue(savedUser);

      const result = await service.update(id, requestDto);

      expect(usersRepository.findOneByUserId).toBeCalledTimes(1);
      expect(usersRepository.findOneByUserId).toBeCalledWith(id);
      expect(usersRepository.save).toBeCalledTimes(1);
      expect(usersRepository.save).toBeCalledWith(existedUser);
      expect(result.firstName).toBe(firstName);
      expect(result.lastName).toBe(lastName);
      expect(result).toStrictEqual(savedUser);
      expect(result).toMatchObject(savedUser);
    });
  });
});
