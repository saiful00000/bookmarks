import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarksController {
    constructor(private bookMarksService: BookmarksService) { }


    @Post('create')
    createBookmarks(
        @GetUser('id') uId: number,
        @Body() dto: CreateBookmarkDto,
    ) {
        return this.bookMarksService.createBookmarks(uId, dto);
    }

    @Get('all')
    getBookmarks(
        @GetUser('id') uId: number,
    ) {
        return this.bookMarksService.getBookmarks(uId);
    }

    @Get('single/:id')
    getBookmarksById(
        @GetUser('id') uId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookMarksService.getBookmarksById(uId, bookmarkId);
    }

    @Patch('update/:id')
    updateBookmark(
        @GetUser('id') uId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto,
    ) {
        return this.bookMarksService.updateBookmark(uId, dto, bookmarkId);
    }

    @Delete('delete/:id')
    deleteBookmark(
        @GetUser('id') uId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookMarksService.deleteBookmark(uId, bookmarkId);
     }
}
