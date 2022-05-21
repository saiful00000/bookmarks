import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        // generate the password
        const hash = await argon.hash(dto.password);

        // save new user to database
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
                first_name: dto.first_name,
                last_name: dto.last_name,
            },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                created_at: true,
                updated_at: true
            }
        });

        return user;
    }

    login(email: string) {
        return { 'login': 'login success.' };
    }
}