import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { RoomModule } from './resource/room/room.module';
import { FloorModule } from './resource/floor/floor.module';

@Module({
    imports: [MyConfigModule, DatabaseModule, RoomModule, FloorModule],
    controllers: [AppController], // 应用自用的控制器，可以去除
    providers: [AppService], // 供控制器调用的服务
})
export class AppModule {}
