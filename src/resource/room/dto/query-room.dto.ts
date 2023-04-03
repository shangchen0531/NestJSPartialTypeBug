import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class QueryRoomDto {
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

    /**
     * 查询 页数 条件
     */
    @IsInt()
    @IsOptional()
    @Min(1)
    page: number = 1;

    /**
     * 查询 分页数 条件
     */
    @IsInt()
    @IsOptional()
    @IsPositive()
    pageSize: number = 10;

    /**
     * 是否全量查询
     */
    @IsInt()
    @IsOptional()
    all: number = 0;
}
