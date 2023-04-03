import { MyConfigModule as ConfigModule } from './config.module';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

describe('测试配置项是否读取成功', () => {
    let configService: ConfigService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule],
        }).compile();

        configService = moduleRef.get<ConfigService>(ConfigService);
    });

    test('测试端口号是否读取成功', () => {
        const port = configService.get('yaml.db.port');
        expect(port).toBeDefined();
    });

    test('测试 host 是否读取成功', () => {
        const host = configService.get('yaml.db.host');
        expect(host).toBeDefined();
    });

    test('测试数据库名是否读取成功', () => {
        const name = configService.get('yaml.db.name');
        expect(name).toBeDefined();
    });
});
