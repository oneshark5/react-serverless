// 将字符拆转换为json数据
export const parseJsonByString = (str, defaultValue) => {
  let returnValue = defaultValue;
  try {
    returnValue = JSON.parse(str)
  } catch (error) {}
  return returnValue
}