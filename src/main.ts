import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import globalValidationPipe from './pipes/globalValidation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(globalValidationPipe); // 设置全局类型转换管道
    app.setGlobalPrefix('v1'); // 设置全局版本前缀
    const configService = app.get(ConfigService); // 获取全局配置模块，从模块中获取服务信息

    const cors = configService.get('yaml.cors'); // 获取跨域信息
    app.enableCors(cors); // 配置跨域

    const port = configService.get('yaml.server.port');
    await app.listen(port, () => {
        console.log(`The application is now listening on localhost:${port}.`);
    });
}
bootstrap();
