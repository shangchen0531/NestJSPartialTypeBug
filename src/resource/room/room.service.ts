import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { paginate } from '../../misc/paginate';
import { CreateRoomDto } from './dto/create-room.dto';
import { QueryRoomDto } from './dto/query-room.dto';
import { RemoveManyRoomDto } from './dto/removeMany-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UpdateManyRoomDto } from './dto/updatemany-room.dto';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    ) {}

    create(createRoomDto: CreateRoomDto) {
        const createdRoom = new this.roomModel(createRoomDto);
        return createdRoom.save({
            validateBeforeSave: true,
        });
    }

    createMany(createRoomDtoArray: CreateRoomDto[]) {
        return this.roomModel.insertMany(createRoomDtoArray);
    }

    findAll(query: QueryRoomDto) {
        const { page, pageSize, all } = query;

        const queryCmd = this.roomModel.find();

        if (!all) {
            paginate(queryCmd, page, pageSize);
        }

        ['x', 'y', 'z'].forEach((v) => {
            if (typeof query[v] === 'number') {
                queryCmd.where(v, query[v]);
            }
        });

        return queryCmd.exec();
    }

    async findOne(id: string) {
        try {
            const res = await this.roomModel.findById(id).exec();
            return res;
        } catch (err) {
            console.error(err); // 打印日志
            return null;
        }
    }

    update(id: string, updateRoomDto: UpdateRoomDto | CreateRoomDto) {
        console.log('updateRoom', updateRoomDto);
        const updatedRoom = this.roomModel
            .findByIdAndUpdate(id, updateRoomDto, {
                new: true, // 返回修改后的文档
            })
            .exec();
        return updatedRoom;
    }

    async updateMany(updateRecords: UpdateManyRoomDto[]) {
        const promiseArray = updateRecords.map((v) =>
            this.update(v.id, v.room),
        );

        const results = await Promise.allSettled(promiseArray);

        const errors: string[] = [];
        results.forEach((v, idx) => {
            if (v.status === 'rejected') {
                if (v.reason instanceof Error) {
                    errors.push(
                        `${updateRecords[idx].id} 更新错误, 错误信息: ${v.reason.message}`,
                    );
                } else {
                    errors.push(`${updateRecords[idx].id} 更新错误, 未知错误`);
                }
            }
        });
        return errors.length ? errors : true;
    }

    remove(id: string) {
        return this.roomModel.findByIdAndRemove(id).exec();
    }

    /**
     * 根据条件删除房间
     * @param removeFloorDto 条件对象
     */
    removeMany(removeManyRoomDto: RemoveManyRoomDto) {
        console.log(removeManyRoomDto);
        if (removeManyRoomDto.ids?.length) {
            return this.roomModel.deleteMany({
                _id: {
                    $in: removeManyRoomDto.ids,
                },
            });
        } else if (Object.keys(removeManyRoomDto.conditions ?? {}).length) {
            return this.roomModel.deleteMany(removeManyRoomDto.conditions);
        }
        return {
            acknowledged: true,
            deletedCount: 0,
        };
    }
}
