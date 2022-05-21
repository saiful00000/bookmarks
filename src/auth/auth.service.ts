import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        try {
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
            });

            delete user.hash;

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code = 'p2002') {
                    throw new ForbiddenException('Credential already taken.');
                }
            }
            throw error;
        }
    }
    login(email: string) {
        return { 'login': 'login success.' };
    }
}