import { ValidationPipe, UnprocessableEntityException } from '@nestjs/common';
export default new ValidationPipe({
    whitelist: true, // 启用字段白名单，传输对象中没定义的字段会被去除
    transform: true, // 启用自动转换，将字面对象转换运行时对象
    exceptionFactory: (errors) => {
        // 转换错误对象到指定结构
        return new UnprocessableEntityException({
            error: errors
                .map((v) => {
                    if (v.constraints) {
                        return Object.values(v.constraints);
                    } else {
                        return [`the field '${v.property}' is wrong`];
                    }
                })
                .flat(),
        });
    },

    transformOptions: {
        exposeDefaultValues: true, // 启用默认值，会读取 dto 中的默认值作为缺省值
        /**
         * 启用隐式转换，会读取 ts 提供的类型信息
         * 注意, dto 中属性没有 ts 类型标注时不会进行转换 (需要定义 dto 为 class 对象
         * 这样才能在运行时保留编译信息)
         */
        enableImplicitConversion: true,
    },
});
