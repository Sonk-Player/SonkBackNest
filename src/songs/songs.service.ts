import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { InjectModel } from '@nestjs/mongoose';
import { SongResponse } from './interfaces/song-response';
import { Model } from 'mongoose';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>
  ) {}
  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    try {

      const newSong = new this.songModel(createSongDto);

      await newSong.save();

      return newSong;

    } catch (error) {
      console.error(error); 
      throw error; 
    }
  }

  async addSong(createSongDto: CreateSongDto): Promise<SongResponse> {

    const song = await this.createSong(createSongDto);

    return {
      playlistId: song.playlistId,
      userId: song.userId,
      videoId: song.videoId,
      img: song.img,
      title: song.title,
      artist: song.artist,
      duration: song.duration
    }
  }

  findAll() {
    return `This action returns all songs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
