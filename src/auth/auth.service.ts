import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //validate a user
  async validateUser(username: string, password: string): Promise<{ userId: string; userName: string; }> {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotAcceptableException('User not found');
    }
    const passwordValid = await bcrypt.compare(password, user.password)

    if (passwordValid) {
      return {
        userId: user.id,
        userName: user.username
      };
    }

    return null;
  }
}

