import http from './http';


/**
 * 获取所有前来参加的人信息，用户摇奖
 */
export function getAttendList() {
    return http.get('https://www.xtybusiness.cn/api/attend/getAll')
}


/**
 * 获取所有评论的消息，用于上面的轮播显示
 */
export function getAllCommentList() {
    return http.get('https://www.xtybusiness.cn/api/comment/getAllList')
}