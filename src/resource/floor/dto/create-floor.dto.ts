import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

export class BossItemDto {
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

export class CreateFloorDto {
    /**
     * 绑定层数
     */
    @IsInt()
    bindZ: number;

    /**
     * 守关BOSS
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({
        each: true,
    })
    @Type(() => BossItemDto)
    boss?: BossItemDto[];

    /**
     * 层名称
     */
    @IsString()
    name: string;

    /**
     * 击杀BOOS后解禁的层
     */
    @IsOptional()
    @IsString()
    nextFloorId?: string;

    /**
     * 开放状态
     */
    @IsBoolean()
    open: boolean;
}
