import { BadRequestException, Injectable } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import { PrismaService } from 'src/database/postgres/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async loginOrRegisterUser(data: NewUserDto) {
        let user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            if (!data.gender || !data.dob) {
                throw new BadRequestException('Gender and DOB are required for first-time login.');
            }
            user = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    profileUrl: data.profileUrl,
                    gender: data.gender,
                    dob: data.dob ? new Date(data.dob) : null,
                },
            });
            return { message: 'User created successfully', user };
        }

        return { message: 'User logged in successfully', user };
    }
}
