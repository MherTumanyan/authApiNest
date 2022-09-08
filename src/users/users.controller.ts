import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //post/ /users/signup
  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
  ) 
  {
    //hash password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);

    const result = await this.usersService.insertUser(
      userName,
      hashedPassword,
    );
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username
    };
  }

  //Post users/login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): { User: User; msg: string; } {
    return {
      User: req.user,
      msg: 'User logged in'
    };
  }

  //Get users/me
  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  getHello(@Request() req): string {
    return req.user;
  }

  //Get / logout
  @Get('/logout')
    logout(@Request() req): { msg: string; } {
      req.session.destroy()
      return { msg: 'The user session has ended' }
    }
}
