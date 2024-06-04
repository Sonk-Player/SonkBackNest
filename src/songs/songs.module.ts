import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './entities/song.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/entities/user.entity';

@Module({
  controllers: [SongsController],
  providers: [SongsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Song.name,
        schema: SongSchema
      },
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
  ],
})
export class SongsModule {}
