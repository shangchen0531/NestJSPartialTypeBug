import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ _id: false })
class MonterItem {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    num: number;
}

const MonsterItemSchema = SchemaFactory.createForClass(MonterItem);

@Schema()
export class Room extends Document {
    /**
     * 房间内的怪物
     */
    @Prop({
        type: [MonsterItemSchema],
        required: false,
    })
    monsters: MonterItem[];

    /**
     * 名字，房间名字
     */
    @Prop({ required: true })
    name: string;

    /**
     * 房间内的玩家 id
     */
    @Prop({ type: [String], required: false })
    players: string[];

    /**
     * 此处的商店id
     */
    @Prop({ required: false })
    storeId: number;

    /**
     * x坐标
     */
    @Prop()
    x: number;

    /**
     * y坐标
     */
    @Prop()
    y: number;

    /**
     * z坐标
     */
    @Prop()
    z: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
