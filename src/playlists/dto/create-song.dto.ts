import { IsString } from "class-validator";

export class CreateSongDto {

    @IsString()
    playlistId: string;

    @IsString()
    userId: string;

    @IsString()
    img: string;

    @IsString()
    title: string;

    @IsString()
    artist: string;

    @IsString()
    duration: string;
}
