import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateOwnUserData } from './dto/update-own-user-data.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already exists');
    }

    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // create the user entity
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async register(registerUserDto: RegisterUserDto) {
    // check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already exists');
    }

    if (registerUserDto.password !== registerUserDto.confirmPassword) {
      throw new ConflictException('The passwords do not match');
    }
    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );

    // create the user entity
    const user = this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async findAll(query: FindUsersQueryDto): Promise<{
    data: User[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, name, email, role } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.userRepository
      .createQueryBuilder('users')
      .skip(skip)
      .take(limit);

    if (name) {
      queryBuilder.andWhere(
        '(LOWER(user.firstName) LIKE LOWER(:name) OR LOWER(user.lastName) LIKE LOWER(:name))',
        { name: `%${name}` },
      );
    }
    if (email) {
      queryBuilder.andWhere('LOWER(user.email) LIKE LOWER(:email)', {
        email: `%${email}`,
      });
    }

    if (role) {
      queryBuilder.andWhere('user.role = :role', {
        role,
      });
    }

    queryBuilder.orderBy('user.createdAt', 'DESC');

    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async updateOwnData(
    id: string,
    updatedOwnUSerData: UpdateOwnUserData,
  ): Promise<User> {
    const user = await this.findById(id);

    this.userRepository.merge(user, updatedOwnUSerData);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }

  async findByEmailForAuth(emailToFind: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', {
        email: emailToFind,
      })
      .getOne();
  }
}
