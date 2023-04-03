import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Floor, FloorSchema } from './schemas/floor.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Floor.name, schema: FloorSchema }]),
    ],
    controllers: [FloorController],
    providers: [FloorService],
})
export class FloorModule {}
