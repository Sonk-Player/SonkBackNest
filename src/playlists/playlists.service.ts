import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistResponse } from './interfaces/playlist-response';
import { Playlist } from './entities/playlist.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>
  ) {}

  async createPlaylist(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    try {
      const playlistData = {
        ...createPlaylistDto,
        playlistId: this.generatePlaylistId(), 
      };

      const newPlaylist = new this.playlistModel(playlistData);

      await newPlaylist.save();

      return newPlaylist;

    } catch (error) {
      console.error(error); 
      throw error; 
    }
  }


  async newTask(createPlaylistDto: CreatePlaylistDto): Promise<PlaylistResponse> {

    const song = await this.createPlaylist(createPlaylistDto);

    return {
      playlistId: song.playlistId,
      userId: song.userId,
      playlistName: song.playlistName,
      img: song.img,
      title: song.title,
      artist: song.artist,
      duration: song.duration
    }
  }

  generatePlaylistId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  findAll() {
    return `This action returns all playlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
