import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Song {

    @Prop({ required: true })
    playlistId: string;

    @Prop()
    userId: string;

    @Prop()
    videoId: string;

    @Prop()
    img: string;

    @Prop()
    title: string;

    @Prop()
    artist: string;

    @Prop()
    duration: string;

}

export const SongSchema = SchemaFactory.createForClass( Song )