import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './interfaces/movie.interface';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.findById(id);
    }

    @Get('user/:user_id')
    async findByUserId(@Param('user_id') user_id: string): Promise<Movie[]> {
        return this.moviesService.findByUserId(user_id);
    }

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        const movie: Movie = {
            id: '', // json-server will generate the ID
            ...createMovieDto,
        };
        return this.moviesService.create(movie);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.delete(id);
    }
}