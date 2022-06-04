import { IsEmail, IsOptional, IsString } from "class-validator";

export class EditUserDto{
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    first_name?: string

    @IsOptional()
    @IsString()
    last_name?: string
}