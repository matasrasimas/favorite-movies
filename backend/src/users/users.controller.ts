import {Controller, Get, Param, Post, Body, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User> {
        return this.usersService.FindById(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user: User = {
            id: '', // json-server will generate the ID
            ...createUserDto,
        }
        return this.usersService.create(user)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.usersService.delete(id);
    }
}