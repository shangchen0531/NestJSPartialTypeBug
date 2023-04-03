import {
    Controller,
    Get,
    Put,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpStatus,
    HttpCode,
    Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Response } from 'express';
import { QueryRoomDto } from './dto/query-room.dto';
import { arrayValidate } from '../../pipes/arrayValidation.pipe';
import { UpdateManyRoomDto } from './dto/updatemany-room.dto';
import { RemoveManyRoomDto } from './dto/removeMany-room.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomService.create(createRoomDto);
    }

    @Post('batch')
    createMany(
        @Body(arrayValidate(CreateRoomDto))
        createRoomDtoArray: CreateRoomDto[],
    ) {
        return this.roomService.createMany(createRoomDtoArray);
    }

    @Get()
    findAll(@Query() query: QueryRoomDto) {
        return this.roomService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response) {
        const res = await this.roomService.findOne(id);
        if (res) {
            response.status(HttpStatus.OK); // 成功找到资源
            response.send(res);
        } else {
            response.status(HttpStatus.NO_CONTENT); // 资源找不到
            response.send();
        }
    }

    @Patch('batch')
    async updateMany(
        @Body(arrayValidate(UpdateManyRoomDto))
        updateManyRoomDto: UpdateManyRoomDto[],
        @Res() response: Response,
    ) {
        const res = await this.roomService.updateMany(updateManyRoomDto);
        let errors: string[] = [];
        if (Array.isArray(res)) {
            // 错误数组
            if (res.length === updateManyRoomDto.length) {
                // 全部出错
                response.status(HttpStatus.BAD_REQUEST);
            } else {
                // 部分出错
                response.status(HttpStatus.CREATED);
            }
            errors = res;
        } else {
            response.status(HttpStatus.CREATED);
        }
        response.send({
            errors,
        });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.CREATED)
    updateOptional(
        @Param('id') id: string,
        @Body() updateRoomDto: UpdateRoomDto,
    ) {
        return this.roomService.update(id, updateRoomDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    updateEntire(
        @Param('id') id: string,
        @Body() updateRoomDto: CreateRoomDto,
    ) {
        return this.roomService.update(id, updateRoomDto);
    }

    @Delete('batch')
    @HttpCode(HttpStatus.OK)
    removeMany(@Body() removeManyRoomDto: RemoveManyRoomDto) {
        return this.roomService.removeMany(removeManyRoomDto);
    }

    // 注意使用了 @Res 获取 响应对象后，需要自己管理 response, 如果不进行 .json
    // 或者 .send, 则请求将一直挂起
    // https://docs.nestjs.com/controllers#request-object
    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response: Response) {
        const res = await this.roomService.remove(id);
        if (res) {
            response.status(HttpStatus.NO_CONTENT); // 成功删除，没有内容返回
            response.send();
        } else {
            response.status(HttpStatus.GONE); // 资源已经删除
            response.send();
        }
    }
}
