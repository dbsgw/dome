import request from '../utils/request';
// 单纯的一个api 和 vue2 毫无区别
export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
