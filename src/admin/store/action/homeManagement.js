import { CHANGE_SCHEMA } from "../constant/homeManagement"

export const getChangeSchemaAction = (schema) => {
  return {
    type:CHANGE_SCHEMA,
    value:schema
  }
}