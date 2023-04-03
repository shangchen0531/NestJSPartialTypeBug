import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Put,
    Query,
    Res,
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { QueryFloorDto } from './dto/query-floor.dto';
import { Response } from 'express';

@Controller('floor')
export class FloorController {
    constructor(private readonly floorService: FloorService) {}

    @Post()
    create(@Body() createFloorDto: CreateFloorDto) {
        return this.floorService.create(createFloorDto);
    }

    @Get()
    findAll(@Query() query: QueryFloorDto) {
        return this.floorService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response) {
        const res = await this.floorService.findOne(id);
        if (res) {
            response.status(HttpStatus.OK); // 成功找到资源
            response.send(res);
        } else {
            response.status(HttpStatus.NO_CONTENT); // 资源找不到
            response.send();
        }
    }

    @Patch(':id')
    @HttpCode(HttpStatus.CREATED)
    updateOptional(
        @Param('id') id: string,
        @Body() updateFloorDto: UpdateFloorDto,
    ) {
        return this.floorService.update(id, updateFloorDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    updateEntire(
        @Param('id') id: string,
        @Body() updateFloorDto: CreateFloorDto,
    ) {
        return this.floorService.update(id, updateFloorDto);
    }

    // 注意使用了 @Res 获取 响应对象后，需要自己管理 response, 如果不进行 .json
    // 或者 .send, 则请求将一直挂起
    // https://docs.nestjs.com/controllers#request-object
    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response: Response) {
        const res = await this.floorService.remove(id);
        if (res) {
            response.status(HttpStatus.NO_CONTENT); // 成功删除，没有内容返回
            response.send();
        } else {
            response.status(HttpStatus.GONE); // 资源已经删除
            response.send();
        }
    }
}
