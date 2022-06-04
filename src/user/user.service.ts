import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {

    }

    async editUser(uId: number, editUserDto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: {
                id: uId,
            },
            data: {
                ...editUserDto
            }
        });

        delete user.hash

        return user;
    }
}
