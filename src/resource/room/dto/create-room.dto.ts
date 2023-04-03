import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsInt,
    IsOptional,
    IsString,
    MinLength,
    ValidateNested,
} from 'class-validator';

class MonsterItemDto {
    /**
     * boss id
     */
    @IsString()
    id: string;

    /**
     * boss 名称
     */
    @IsString()
    name: string;

    /**
     * boss 数量
     */
    @IsInt()
    num: number;
}

export class CreateRoomDto {
    /**
     * 房间内的怪物
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({
        each: true,
    })
    @Type(() => MonsterItemDto)
    monsters?: MonsterItemDto[];

    /**
     * 名字，房间名字
     */
    @IsString()
    @MinLength(1)
    name: string;

    /**
     * 房间内的玩家 id
     */
    @IsOptional()
    @IsString({
        each: true,
    })
    players?: string[];

    /**
     * 此处的商店id
     */
    @IsOptional()
    @IsInt()
    storeId?: number | null;

    /**
     * x坐标
     */
    @IsInt()
    x: number;

    /**
     * y坐标
     */
    @IsInt()
    y: number;

    /**
     * z坐标
     */
    @IsInt()
    z: number;
}
