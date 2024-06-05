import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistResponse } from './interfaces/playlist-response';
import { Playlist } from './entities/playlist.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

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


  async newPlaylist(createPlaylistDto: CreatePlaylistDto): Promise<PlaylistResponse> {

    const playlist = await this.createPlaylist(createPlaylistDto);

    return {
      playlistId: playlist.playlistId,
      userId: playlist.userId,
      playlistName: playlist.playlistName,
    }
  }

  

  generatePlaylistId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  async findAll(): Promise<Playlist[]> {
    try {
      const playlists = await this.playlistModel.find().exec();
      return playlists;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(user: User): Promise<PlaylistResponse> {
    try {
      const playlist: Playlist[] = await this.playlistModel.find({ userId: user._id }).exec();
      return playlist.map((playlist: Playlist) => ({
        playlistId: playlist.playlistId,
        userId: playlist.userId,
        playlistName: playlist.playlistName,
        }))[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
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
