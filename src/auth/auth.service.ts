import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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
        },
      });

      delete user.hash;

      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if ((error.code = 'p2002')) {
          throw new ForbiddenException(
            'Credential already taken.',
          );
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    // try to find the user
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    // if user does not exists throw an error
    if (!user) {
      throw new ForbiddenException(
        'Wrong credentials',
      );
    }

    // check the password is a match
    const isMatch = await argon.verify(
      user.hash,
      dto.password,
    );

    // if not match through an exception
    if (isMatch == false) {
      throw new ForbiddenException(
        'Wrong Credentials',
      );
    }

    // if everything is fine then send back the user
    delete user.hash;

    return user;
  }
}
