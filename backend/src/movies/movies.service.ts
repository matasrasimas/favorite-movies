import { UsersService } from './../users/users.service';
import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Injectable()
export class MoviesService {

    constructor(
        @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
        private readonly usersService: UsersService
    ) {}
    
    
    async findAll(): Promise<Movie[]> {
        return await this.moviesRepository.find();
    }
    
    async findById(id: number): Promise<Movie> {
        return await this.moviesRepository.findOneBy({id});
    }

    async findByUserId(user_id: number): Promise<Movie[]> {
        return await this.moviesRepository.findBy({user: {id: user_id}});
    }

    async create(createMovieDto: CreateMovieDto): Promise<Movie> {
        const movie = await this.moviesRepository.create(createMovieDto);
        movie.user = await this.usersService.findById(createMovieDto.user_id);
        return this.moviesRepository.save(movie);
    }

    async delete(id: number): Promise<void> {
        await this.moviesRepository.delete(id);
    }
}