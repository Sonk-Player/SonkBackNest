import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './entities/song.entity';

@Module({
  controllers: [SongsController],
  providers: [SongsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Song.name,
        schema: SongSchema
      }
    ]),
  ],
})
export class SongsModule {}
