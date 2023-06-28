import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Movie } from './entities/movie.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, UsersModule, AuthModule, TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'SteveHarvey' /* Change this value with your own local MYSQL password */,
      database: 'mydb',
      entities: [User, Movie],
      synchronize: true,
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
