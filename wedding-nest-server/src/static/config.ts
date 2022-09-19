
// 彩蛋提示关键字  评论中带了xxx字 就会有几率提示寻找彩蛋方式
export const keyword = /私房钱/g;


/**
 * [probability 彩蛋提示概率]
 *
 * @return  {[Number]}  [return 彩蛋提示概率 单位%]
 */
export function probability() {
  // 可以做一些修改 比如判断时间  最后几天概率提高之类的
  return 4
}

/**
 * [money 根据排名返回彩蛋金额]
 *
 * @param   {[type]}  rank  [rank 彩蛋排名]
 *
 * @return  {Number}      [return 获得金额（单位：分）]
 */
export function money() {
  // 我的话 没有根据排名来  所有人都是8.88元
  // 这个金额主要是后台显示用 没有实际意义  想发多少由自己决定
  return 888
}