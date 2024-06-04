import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),

    AuthModule,

    PlaylistsModule,

    SongsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
