import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    email: string;

    @IsString()
    username: string;

    @MinLength(6)
    password: string;

}
