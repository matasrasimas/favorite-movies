import {Controller, Get, Param, Post, Body, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<User | null> {
        return this.usersService.findById(id);
    }

    @Get('name/:name')
    async findByName(@Param('name') name: string): Promise<User | null> {
        return this.usersService.findByName(name);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.usersService.delete(id);
    } 
}