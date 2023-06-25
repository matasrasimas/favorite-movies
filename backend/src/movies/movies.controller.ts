import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from 'src/entities/movie.entity';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Movie> {
        return this.moviesService.findById(id);
    }

    @Get('user/:id')
    async findByUserId(@Param('id') user_id: number): Promise<Movie[]> {
        return this.moviesService.findByUserId(user_id);
    }

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.moviesService.delete(id);
    }
}