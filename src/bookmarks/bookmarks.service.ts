import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarksService {

    constructor(private prisma: PrismaService) { }

    async createBookmarks(userId: number, dto: CreateBookmarkDto) {
        const bookmark = await this.prisma.bookmark.create({
            data: { userId, ...dto },
        });

        return bookmark;
    }

    async getBookmarks(userId: number) {
        return await this.prisma.bookmark.findMany({
            where: { userId }
        });

    }

    async getBookmarksById(userId: number, bookmarksId: number) {
        const bmk = await this.prisma.bookmark.findFirst({
            where: {
                id: bookmarksId,
                userId,
            }
        });

        if (bmk) {
            return bmk;
        }

        throw new ForbiddenException('Bookmark with given id is forbidden,');
    }

    async updateBookmark(
        userId: number,
        dto: EditBookmarkDto,
        bookmarkId: number,
    ) {
        var bmk = await this.prisma.bookmark.findUnique({
            where: { id: bookmarkId }
        });

        if (!bmk || bmk.userId !== userId) {
            throw new ForbiddenException('Access to Bookmar denied.');
        }

        return await this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: { ...dto },
        });

    }

    async deleteBookmark(userId: number, bookmarkId: number) {
        const bmk = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            }
        });

        if (!bmk || bmk.userId !== userId) {
            throw new ForbiddenException('Access to this bookmark has forbidden');
        }

        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId,
            }
        });
    }

}
