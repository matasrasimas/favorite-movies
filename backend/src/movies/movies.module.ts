import {Module} from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie, User])],
    controllers: [MoviesController],
    providers: [MoviesService, UsersService],
})
export class MoviesModule {}