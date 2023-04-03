import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import yaml from 'yaml';
import { z } from 'zod';

const YAML_CONFIG_FILENAME = 'config.yaml'; // 配置文件名常量

// 配置项解析策略
const yamlSchema = z.object({
    db: z.object({
        port: z.number().catch(27017),
        host: z.string().catch('localhost'),
        name: z.string().catch('jiuzhou-test'),
    }),
    server: z.object({
        port: z.number().catch(3000),
    }),
    cors: z.object({
        origin: z.union([z.boolean(), z.string(), z.array(z.string())]),
        methods: z.array(z.string()).or(z.string()),
    }),
});

// 使用 @nestjs/config 提供的 registerAs 将自定函数注册为配置项加载函数
export default registerAs('yaml' /** 配置项注册 id */, () =>
    yamlSchema.parse(
        yaml.parse(
            readFileSync(resolve(process.cwd(), YAML_CONFIG_FILENAME), 'utf-8'),
        ),
    ),
);
