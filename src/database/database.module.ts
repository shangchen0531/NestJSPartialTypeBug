import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

// 声明全局的数据库模块
@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                // 返回需要连接的数据库信息
                const port = configService.get('yaml.db.port');
                const host = configService.get('yaml.db.host');
                const name = configService.get('yaml.db.name');
                const uri = `mongodb://${host}:${port}/${name}`;
                return {
                    uri,
                };
            },
            inject: [ConfigService], // inject 注入的服务顺序既是 useFactory 的参数顺序
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
