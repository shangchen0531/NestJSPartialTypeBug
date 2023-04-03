import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

class Conditions {
    /**
     * 查询 x 条件
     */
    @IsInt()
    @IsOptional()
    x?: number;

    /**
     * 查询 y 条件
     */
    @IsInt()
    @IsOptional()
    y?: number;

    /**
     * 查询 z 条件
     */
    @IsInt()
    @IsOptional()
    z?: number;
}

export class RemoveManyRoomDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => Conditions)
    conditions?: Conditions;

    @IsOptional()
    @IsString({
        each: true,
    })
    ids?: string[];
}
