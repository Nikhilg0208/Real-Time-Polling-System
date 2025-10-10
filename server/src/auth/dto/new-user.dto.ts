import { IsEmail, IsOptional, IsString, IsDateString } from 'class-validator';

export class NewUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    profileUrl?: string;

    @IsOptional()
    @IsDateString()
    dob?: string;
}
