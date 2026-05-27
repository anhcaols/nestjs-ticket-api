import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { createHash } from 'crypto';
import { LoginUserVO } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ProfileUserVO } from './vo/profile-user.vo';

function md5(text: string) {
  const hash = createHash('md5');
  hash.update(text);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  // jwt
  @Inject(JwtService)
  private jwtService: JwtService;

  async register(user: RegisterUserDto) {
    // Check existing user
    const existingUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (existingUser) {
      throw new HttpException('User already exists', 200);
    }

    // Create new user
    const newUser = new User();
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.password = md5(user.password);
    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException('Error', 500);
    }
    return 'OK';
  }

  async login(user: LoginUserDto): Promise<LoginUserVO> {
    // Find user
    const foundUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }

    // Check password
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('Error', 401);
    }

    // JWT generate token
    const token = this.jwtService.sign({
      id: foundUser.id,
      username: foundUser.username,
      iat: Math.floor(Date.now() / 1000),
    });

    return {
      elements: {
        user: foundUser,
        token,
      },
      status: '200',
    };
  }

  async getProfile(userId: number): Promise<ProfileUserVO> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    return {
      user: foundUser,
      status: '200',
    };
  }
}
