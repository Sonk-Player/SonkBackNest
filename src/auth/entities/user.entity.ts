import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    _id?: string;

    @Prop({default: 0})
    admin: number

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ minlength: 6, required: true })
    password?: string;

    @Prop({ default: false })
    isGoogle: boolean;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: ['user'] })
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass( User )