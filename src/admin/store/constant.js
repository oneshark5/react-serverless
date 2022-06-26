// 为避免重复写的字符串出错，定义个常量
// 命名空间
const nameSpace = 'COMMON';//写redux时避免与其他页面action冲突

export const CHANGE_SCHEMA = `${nameSpace}/CHANGE_SCHEMA`
export const ADD_PAGE_CHILDREN = `${nameSpace}/ADD_PAGE_CHILDREN`
export const CHANGE_PAGE_CHILD = `${nameSpace}/CHANGE_PAGE_CHILD`
export const DELETE_PAGE_CHILD = `${nameSpace}/DELETE_PAGE_CHILD`
export const CHANGE_PAGE_CHILD_POSITION = `${nameSpace}/CHANGE_PAGE_CHILD_POSITION`
export const CHANGE_PAGE_ATTRIBUTE = `${nameSpace}/CHANGE_PAGE_ATTRIBUTE`
export const CHANGE_COM_CHILD_ATTRIBUTE = `${nameSpace}/CHANGE_PAGE_ATTRIBUTE`