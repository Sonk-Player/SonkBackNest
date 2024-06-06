import { Controller, Get, Post, Body, Request, UseGuards, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}


  @Post('/add-song')
  newSong(@Body() createSongDto: CreateSongDto) {
    return this.songsService.createSong(createSongDto);
  }

  @UseGuards(AuthGuard)
  @Get('/load-songs')
  getSongsByUser(@Request() req: Request) {
    const user = req['user'] as User;
    if (!user) {
      throw new Error('User not found in request');
    }
    return this.songsService.findById(user);
  }

@UseGuards(AuthGuard)
@Get('/load-playlist-songs')
getPlaylistsSongsByUser(@Request() req: Request, @Query('playlistId') playlistId: string) {
  const user = req['user'] as User;
  if (!user) {
    throw new Error('User not found in request');
  }
  return this.songsService.findPlaylistsSongsById(user, playlistId);
}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.songsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
  //   return this.songsService.update(+id, updateSongDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.songsService.remove(+id);
  // }
}
