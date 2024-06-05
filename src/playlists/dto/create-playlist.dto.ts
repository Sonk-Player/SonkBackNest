import { IsString } from "class-validator";

export class CreatePlaylistDto {


    @IsString()
    userId: string;

    @IsString()
    playlistName: string;
}
