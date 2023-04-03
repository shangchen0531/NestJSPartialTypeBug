// import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
    IsInt,
    IsArray,
    IsOptional,
    ValidateNested,
    IsString,
    IsBoolean,
} from 'class-validator';
import { BossItemDto } from './create-floor.dto';

export class UpdateFloorDto {
    /**
     * 绑定层数
     */
    @IsInt()
    @IsOptional()
    bindZ?: number;

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
    @IsOptional()
    name?: string;

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
    @IsOptional()
    open?: boolean;
}
