import { IsString } from "class-validator";

export class CreatePlaylistDto {

    @IsString()
    PlaylistId: string;

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
