import { MongooseModule } from '@nestjs/mongoose';
import { Global, Module } from '@nestjs/common';

// 声明全局的数据库模块
@Global()
@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_CONNECT_URL)],
    exports: [MongooseModule],
})
export class DatabaseModule {}
