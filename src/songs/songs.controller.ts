import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}


  @Post('/add-song')
  newSong(@Body() createSongDto: CreateSongDto) {
    return this.songsService.createSong(createSongDto);
  }

  @Get('load-songs')
  getSongs(@Request() req: Request) {
    const user = req['user'] as User;
    if (!user) {
      throw new Error('User not found in request');
    }
    return this.songsService.getSongs(user);
  }

  // @Get()
  // findAll() {
  //   return this.songsService.findAll();
  // }

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
