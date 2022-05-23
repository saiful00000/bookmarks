import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    BookmarksModule,
  ],
})
export class AppModule {}
