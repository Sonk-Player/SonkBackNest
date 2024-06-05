import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post('/new-playlist')
  newPlaylist(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.createPlaylist(createPlaylistDto);
  }


  @Get('/find-by-user-id')
  findByUserId(@Body() user: User) {
    return this.playlistsService.findById(user._id);
  }

  @Get('/all-playlists')
  findAll() {
    return this.playlistsService.findAll();
  }


  // @Get()
  // findAll() {
  //   return this.playlistsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.playlistsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
  //   return this.playlistsService.update(+id, updatePlaylistDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.playlistsService.remove(+id);
  // }
}
