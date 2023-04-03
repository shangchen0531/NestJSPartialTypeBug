import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { UpdateRoomDto } from './update-room.dto';

export class UpdateManyRoomDto {
    @IsString()
    id: string;

    @ValidateNested()
    @Type(() => UpdateRoomDto)
    room: UpdateRoomDto;
}
