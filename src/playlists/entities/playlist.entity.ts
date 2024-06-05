import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Playlist {

    @Prop({ unique: true, required: true})
    playlistId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true})
    playlistName: string;

}

export const PlaylistSchema = SchemaFactory.createForClass( Playlist )