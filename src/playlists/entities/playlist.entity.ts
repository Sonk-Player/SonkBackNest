import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Playlist {

    @Prop({ unique: true})
    playlistId: string;

    @Prop()
    userId: string;

    @Prop()
    img: string;

    @Prop()
    title: string;

    @Prop()
    artist: string;

    @Prop()
    duration: string;

}

export const PlaylistSchema = SchemaFactory.createForClass( Playlist )