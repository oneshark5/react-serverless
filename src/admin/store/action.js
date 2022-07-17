import { CHANGE_SCHEMA, ADD_PAGE_CHILDREN, CHANGE_PAGE_CHILD, DELETE_PAGE_CHILD,
  CHANGE_PAGE_CHILD_POSITION, CHANGE_PAGE_ATTRIBUTE, CHANGE_COM_CHILD_ATTRIBUTE,
   DELETE_PAGE_CHILD_CHILDREN, CHANGE_ASIDE_CHILD_POSITION } from "./constant"

export const getChangeSchemaAction = (schema) => {
  return {
    type:CHANGE_SCHEMA,
    value:schema
  }
}
export const getAddPageChildrenAction = () => {
  return {
    type:ADD_PAGE_CHILDREN,
    value:{}
  }
}
export const getChangePageChildAction = (index, value) => {
  return {
    type:CHANGE_PAGE_CHILD,
    value,
    index
  }
}
export const getDeletePageChildAction = (index) => {
  return {
    type:DELETE_PAGE_CHILD,
    index
  }
}
export const getChangePageChildPositionAction = (oldIndex, newIndex) => {
  return {
    type:CHANGE_PAGE_CHILD_POSITION,
    oldIndex,
    newIndex
  }
}
export const getChangeAsideChildPositionAction = (oldIndex, newIndex) => {
  return {
    type:CHANGE_ASIDE_CHILD_POSITION,
    oldIndex,
    newIndex
  }
}

export const getChangePageAttributeAction = (key, value) => {
  return { type:CHANGE_PAGE_ATTRIBUTE, key, value }
}

// 更改每个组件的属性
export const getChangeComChildAttributeAction = (key, value) => {
  return { type:CHANGE_COM_CHILD_ATTRIBUTE, key, value }
}

// 更改每个组件的子元素
export const getChangeComChildChildrenAction = (index, value) => {
  return { type:CHANGE_COM_CHILD_ATTRIBUTE, index, value }
}

// 更改每个组件的子元素
export const getDeletePageChildChildrenAction = (index, value) => {
  return { type:DELETE_PAGE_CHILD_CHILDREN, index, value }
}