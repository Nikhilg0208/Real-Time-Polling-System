import { Injectable } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import { PrismaService } from 'src/database/postgres/prisma/prisma.service';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async createUser(data: NewUserDto) {

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                profileUrl: data.profileUrl,
                dob: data.dob ? new Date(data.dob) : null,
            },
        });

        return { message: 'User created successfully', user };
    }
}
