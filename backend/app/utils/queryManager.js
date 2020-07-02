import { SqlHelper } from './sql'
import { formatDate } from '../services/helper'

const QueryMethods = {
  getGroupsByClient: ({ tableName, client_id }) => {
    return `SELECT t.* FROM ${tableName} t JOIN x_client_ingroups x ON t.group_id = x.group_id WHERE x.client_id =${client_id}`
  },
  getDataByColumnName: ({ sourceTable, columnName, columnValue }) => {
    return `SELECT * FROM ${sourceTable} WHERE ${columnName} = '${columnValue}'`
  },
  getLeadCustomData: ({ sourceTable, lead_id }) => {
    return `SELECT * FROM ${sourceTable} WHERE lead_id='${lead_id}' LIMIT 1`
  },
  deleteLeadCustomData: ({ sourceTable, lead_id }) => {
    return `DELETE FROM ${sourceTable} WHERE lead_id='${lead_id}' LIMIT 1`
  },
  getCampaignsByClientId: ({ sourceTable, client_id, orderByColumnName }) => {
    let query = `SELECT t.* FROM ${sourceTable} t JOIN x_client_campaigns x ON t.campaign_id = x.campaign_id WHERE x.client_id = '${client_id}'`
    if (orderByColumnName) {
      query = `${query} ORDER BY ${orderByColumnName}`
    }
    return query
  },
  getLogForContactByDates: ({ sourceTable, lead_id, startDate, endDate }) => {
    return `SELECT * FROM ${sourceTable} WHERE lead_id='${lead_id}' AND call_date >= '${startDate}' AND call_date <= '${endDate}' UNION SELECT * FROM x_log_outbound_archive WHERE lead_id='${lead_id}' AND call_date >= '${startDate}' AND call_date <= '${endDate}' UNION SELECT * FROM x_log_outbound_historical WHERE lead_id='${lead_id}' AND call_date >= '${startDate}' AND call_date <= '${endDate}' ORDER BY call_date desc Limit 500`
  },
  getCloserLogForContactByDates: ({ sourceTable, lead_id, startDate, endDate }) => {
    return `SELECT * FROM ${sourceTable} WHERE lead_id='${lead_id}' AND call_date >= '${startDate}' AND call_date <= '${endDate}' UNION SELECT * FROM ${sourceTable}_archive WHERE lead_id='${lead_id}' AND call_date >= '${startDate}' AND call_date <= '${endDate}' UNION SELECT * FROM ${sourceTable}_historical WHERE lead_id='${lead_id}' AND call_date >= '${startDate}' AND call_date <= '${endDate}' ORDER BY call_date desc Limit 500`
  },
  getListsByCampaignID: ({ sourceTable, campaign_id }) => {
    return `SELECT * FROM ${sourceTable} WHERE campaign_id = '${campaign_id}'`
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
          whereClause += ` AND \`${property}\` = '${data[property]}'`
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
  },
  delete: ({ sourceTable, model, data }) => {
    if (sourceTable) {
      sourceTable = model.tableName
    }

    const modelProperties = model.rawAttributes
    let sql = `DELETE FROM ${sourceTable}`
    let whereClause = ''
    let hasWhereClause = false

    const objProperties = Object.keys(data)

    objProperties.forEach((property) => {
      // Check if primaryKey attribute is set to true for the property
      if (modelProperties[property] && modelProperties[property].primaryKey) {
        // If we have multiple primary keys (composite key) then we also need
        // to use AND in the where clause
        if (hasWhereClause) {
          whereClause += ` AND \`${property}\` = '${data[property]}'`
        } else {
          whereClause = ` WHERE \`${property}\` = '${data[property]}'`
        }

        hasWhereClause = true
      }
    })

    sql = sql + whereClause
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

export const executeDeleteQuery = ({ method, ...restArgs }) => {
  return SqlHelper.delete(QueryMethods[method](restArgs))
}
