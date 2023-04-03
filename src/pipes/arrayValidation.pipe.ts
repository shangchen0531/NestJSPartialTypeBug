import {
    ParseArrayOptions,
    ParseArrayPipe,
    UnprocessableEntityException,
} from '@nestjs/common';

type Items = ParseArrayOptions['items'];

export function arrayValidate(items: Items) {
    return new ParseArrayPipe({
        items,
        exceptionFactory(errors) {
            let err: string | unknown[] = '未知错误';
            if (Array.isArray(errors)) {
                err = errors
                    .map((v) => Object.values(v.constraints ?? {}))
                    .flat();
            } else if (typeof errors === 'string') {
                err = errors;
            }
            return new UnprocessableEntityException({
                error: err,
            });
        },
    });
}
