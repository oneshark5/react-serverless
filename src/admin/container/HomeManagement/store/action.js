import { CHANGE_SCHEMA, ADD_PAGE_CHILDREN, CHANGE_PAGE_CHILD, DELETE_PAGE_CHILD } from "./constant"

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