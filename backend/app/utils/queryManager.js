import { SqlHelper } from './sql'
import { formatDate } from '../services/helper'

const QueryMethods = {
  getGroupsByClient: ({ tableName, clientId }) => {
    return `SELECT t.* FROM ${tableName} t JOIN x_client_ingroups x ON t.group_id = x.group_id WHERE x.client_id =${clientId}`
  },
  getDataByColumnName: ({ sourceTable, columnName, columnValue }) => {
    return `SELECT * FROM ${sourceTable} WHERE ${columnName} = '${columnValue}'`
  },
  update: ({ sourceTable, model, data }) => {
    // get sourceTable from model if sourceTable property is empty
    if (sourceTable) {
      sourceTable = model.tableName
    }

    // This will return the model attributes
    // Example: if sourceTable is 'x_leads_lists'
    // list_id: {
    //   autoIncrement: true,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    // list_name: {
    //   fieldName: 'list_name'
    // }
    const modelProperties = model.rawAttributes
    let sql = `UPDATE ${sourceTable} SET `
    let whereClause = ''
    let hasWhereClause = false
    // Creating an array of property key
    // Example: updatedDataProperties = ['list_id', 'list_name']
    const updatedDataProperties = Object.keys(data)
    updatedDataProperties.forEach((property) => {
      // Check if primaryKey attribute is set to true for the property
      if (modelProperties[property] && modelProperties[property].primaryKey) {
        // If we have multiple primary keys (composite key) then we also need
        // to use AND in the where clause
        if (hasWhereClause) {
          whereClause += `AND \`${property}\` = '${data[property]}'`
        } else {
          whereClause = ` WHERE \`${property}\` = '${data[property]}'`
        }

        hasWhereClause = true
      } else if (modelProperties[property]) {
        // Check if model field type is DATE
        if (modelProperties[property].type.key === 'DATE' || modelProperties[property].type === 'TIMESTAMP') {
          data[property] = formatDate(data[property])
        }

        // Setting the property field name and value
        sql += `\`${property}\` = '${data[property]}',`
      }
    })

    // remove trailing comma before appending where clause
    sql = sql.substring(0, sql.length - 1) + whereClause
    return sql
  }
}

export const getRawQuery = ({ method, ...restArgs }) => {
  return QueryMethods[method](restArgs)
}

export const executeSelectQuery = ({ method, ...restArgs }) => {
  return SqlHelper.select(QueryMethods[method](restArgs))
}

export const executeUpdateQuery = ({ method, ...restArgs }) => {
  return SqlHelper.update(QueryMethods[method](restArgs))
}
