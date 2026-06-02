import { Body, Controller, Post, Get, Req, UseGuards, Param, SetMetadata, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVO } from './vo/login-user.vo';
import { LoginGuard } from 'src/login.guard';
import { PemissionGuard } from './pemission.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    return this.userService.register(user);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<LoginUserVO> {
    return this.userService.login(user);
  }

  @Get()
  @UseGuards(LoginGuard)
  async getProfile(@Req() req: Request): Promise<any> {
    const user = req['user'];
    const userId = user.id;
    return this.userService.getProfile(userId);
  }

  @Delete('delete/:id')
  @UseGuards(LoginGuard, PemissionGuard)
  @SetMetadata('permissions', ['DEL_USER'])
  async deleteUser(@Param('id') id: number) {
    return `Delete user successfully, ${id}`;
  }
}
