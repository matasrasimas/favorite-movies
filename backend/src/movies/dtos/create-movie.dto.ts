import {IsString, IsNotEmpty, IsOptional, IsUrl, IsNumber, MinLength, MaxLength} from 'class-validator';

export class CreateMovieDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;

    @IsString()
    @MaxLength(150)
    readonly description: string;

    @IsString()
    @MaxLength(200)
    readonly img_url: string;

    @IsNumber()
    @IsNotEmpty()
    readonly user_id: number;
}
