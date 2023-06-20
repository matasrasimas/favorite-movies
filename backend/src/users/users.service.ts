import {Injectable} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import axios from 'axios';

@Injectable()
export class UsersService {
    private readonly jsonServerUrl = 'http://localhost:5000/users';

    async findAll(): Promise<User[]> {
        try {
            const response = await axios.get<User[]>(this.jsonServerUrl);
            return response.data;
        } catch(error) {
            console.log('Error occurred while retrieving users: ', error.message);
            throw new Error('Failed to retrieve users');
        }
    }

    async FindById(id: string): Promise<User> {
        const response = await axios.get<User>(`${this.jsonServerUrl}/${id}`);
        return response.data;
    }

    async create(user: User): Promise<User> {
        const response = await axios.post<User>(this.jsonServerUrl, user);
        return response.data;
    }

    async delete(id: string): Promise<User> {
        const response = await axios.delete<User>(`${this.jsonServerUrl}/${id}`);
        return response.data;
    }
}