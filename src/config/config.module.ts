import { ConfigModule } from '@nestjs/config';
import yamlConfiguration from './yaml/yaml.config';

// 借助官方提供的配置模块构建全局可用的配置模块
const MyConfigModule = ConfigModule.forRoot({
    load: [yamlConfiguration], // 加载函数列表，返回结构为 Record<string, any> 的配置对象
    ignoreEnvFile: true, // 忽略默认读取 .env 文件的行为
    isGlobal: true, // 指定该配置模块全局可用，注册后无需 import
});

export { MyConfigModule };
