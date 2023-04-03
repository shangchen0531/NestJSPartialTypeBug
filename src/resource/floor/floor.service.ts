import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginate } from '../../misc/paginate';
import { CreateFloorDto } from './dto/create-floor.dto';
import { QueryFloorDto } from './dto/query-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { Floor, FloorDocument } from './schemas/floor.schema';

@Injectable()
export class FloorService {
    constructor(
        @InjectModel(Floor.name) private floorModel: Model<FloorDocument>,
    ) {}

    create(createFloorDto: CreateFloorDto) {
        const createdFloor = new this.floorModel(createFloorDto);
        return createdFloor.save({
            validateBeforeSave: true,
        });
    }

    findAll(query: QueryFloorDto) {
        const { page, pageSize, all } = query;

        const queryCmd = this.floorModel.find().select({ __v: 0 });

        if (!all) {
            paginate(queryCmd, page, pageSize);
        }

        return queryCmd.exec();
    }

    async findOne(id: string) {
        try {
            const res = await this.floorModel
                .findById(id)
                .select({ __v: 0 })
                .exec();
            return res;
        } catch (err) {
            console.error(err); // 打印日志
            return null;
        }
    }

    update(id: string, updateFloorDto: UpdateFloorDto | CreateFloorDto) {
        const updatedFloor = this.floorModel
            .findByIdAndUpdate(id, updateFloorDto, {
                new: true, // 返回修改后的文档
            })
            .exec();
        return updatedFloor;
    }

    remove(id: string) {
        return this.floorModel.findByIdAndRemove(id).exec();
    }
}
