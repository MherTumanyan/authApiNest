import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly UserModel: Model<User>) {}
 
  //Signup user with username and password
  async insertUser(userName: string, password: string) {
    const lowerCasedUsername = userName.toLowerCase();
    const newUser = new this.UserModel({
      username: lowerCasedUsername,
      password,
    });
    await newUser.save();
    return newUser;
  }

  //log in user
  async getUser(userName: string) {
    const lowerCasedUsername = userName.toLowerCase();
    const user = await this.UserModel.findOne({ username: lowerCasedUsername });
    return user;
  }
}
