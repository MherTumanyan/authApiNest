import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

import { User } from "src/users/users.model";


@Injectable()
export class SessionSerializer extends PassportSerializer {
    //serialize user
    serializeUser (user: User, done: (err:Error, user: User) => void): void {
        done(null, user); 
    }
    //deserialize user
    deserializeUser(payload: string, done: (err: Error, payload: string) => void): void {
        done(null, payload);
    }
}