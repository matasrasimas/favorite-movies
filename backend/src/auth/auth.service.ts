import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByName(username);
        if(user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
}
