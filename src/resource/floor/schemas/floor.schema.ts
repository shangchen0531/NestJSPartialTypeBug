import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FloorDocument = HydratedDocument<Floor>;

@Schema({ _id: false })
class FloorItem {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    num: number;
}

const FloorItemSchema = SchemaFactory.createForClass(FloorItem);

@Schema()
export class Floor {
    /**
     * 绑定层数
     */
    @Prop({ required: true })
    bindZ: number;

    /**
     * 守关BOSS
     */
    @Prop({
        type: [FloorItemSchema],
        required: false,
    })
    boss: FloorItem[];

    /**
     * 层名称
     */
    @Prop({ required: true, unique: true })
    name: string;

    /**
     * 击杀BOOS后解禁的层
     */
    @Prop({ required: false })
    nextFloorId: string;

    /**
     * 开放状态
     */
    @Prop({ required: true })
    open: boolean;
}

export const FloorSchema = SchemaFactory.createForClass(Floor);
