import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}


    @Get('me')
    getUser(@GetUser('') user: User, @GetUser('id') userId: number) {
        console.log(user);
        console.log(userId)
        return user;
    }

    @Patch('edit')
    edituser(@GetUser('id') uId: number, @Body() editUserDto: EditUserDto){
        return this.userService.editUser(uId, editUserDto);
    }
}
