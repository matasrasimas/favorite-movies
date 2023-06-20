import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[,.\-_?!]).*$/, {message: 'Password must contain: at least 1 capital letter, at least one digit and at least one special symbol (,./-_?!*)'})
    readonly password: string;
}