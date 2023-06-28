import {Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from 'src/entities/movie.entity';
import { UpdateResult } from 'typeorm';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Movie | null> {
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

    @Put(':id')
    async update(@Param('id') id: number, @Body() createMovieDto: CreateMovieDto): Promise<UpdateResult> {
        return this.moviesService.update(id, createMovieDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.moviesService.delete(id);
    }
}