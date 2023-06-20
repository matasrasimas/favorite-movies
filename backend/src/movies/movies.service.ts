import {Injectable} from '@nestjs/common';
import axios from 'axios';
import { Movie } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
    private readonly jsonServerUrl = 'http://localhost:5000/movies';

    async findAll(): Promise<Movie[]> {
        try {
            const response = await axios.get<Movie[]>(this.jsonServerUrl);
            return response.data;
        } catch(error) {
            console.log('Error occurred while retrieving movies: ', error.message);
            throw new Error('Failed to retrieve movies');
        }
    }

    async findById(id: string): Promise<Movie> {
            const response = await axios.get<Movie>(`${this.jsonServerUrl}/${id}`);
            return response.data;
    }

    async findByUserId(user_id: string): Promise<Movie[]> {
        const response = await axios.get<Movie[]>(`${this.jsonServerUrl}?user_id=${user_id}`);
        return response.data;
    }

    async create(movie: Movie): Promise<Movie> {
        const response = await axios.post<Movie>(this.jsonServerUrl, movie);
        return response.data;
    }

    async delete(id: string): Promise<Movie> {
        const response = await axios.delete<Movie>(`${this.jsonServerUrl}/${id}`);
        return response.data;
    }
}