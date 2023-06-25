import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private usersRepository : Repository<User>) {}


    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.usersRepository.findOneBy({id});
    }

    async findByName(name: string): Promise<User | null> {
        return await this.usersRepository.findOne({where: {name}})
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}