import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './entities/playlist.entity';

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Playlist.name,
        schema: PlaylistSchema
      }
    ]),
  ],
})
export class PlaylistsModule {}
