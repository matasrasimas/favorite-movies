import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { Controller, Query, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get()
    async validateUser(
        @Query('username') username: string,
        @Query('password') password: string,): Promise<User | null> {
            return this.authService.validateUser(username, password);
        }
}
