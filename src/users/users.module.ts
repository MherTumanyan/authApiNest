import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./users.controller";
import { UserSchema } from "./users.model";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([ {name: 'user', schema: UserSchema} ]),
        ConfigModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, ConfigService],
    exports: [UsersService]
})

export class UsersModule{}

