import { Query } from 'mongoose';

export function paginate<T extends Query<any, any>>(
    query: T,
    page: number,
    pageSize: number,
): T {
    if (page === 1) {
        query.limit(pageSize);
    } else {
        // skip + limit 的分页效率很低，后期进行优化
        const prevPageNum = (page - 1) * pageSize;
        query.skip(prevPageNum).limit(pageSize);
    }
    return query;
}
