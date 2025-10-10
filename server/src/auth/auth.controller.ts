import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from './dto/new-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('google-login')
    async registerUser(@Body() newUserDto: NewUserDto) {
        return this.authService.loginOrRegisterUser(newUserDto);
    }
}
