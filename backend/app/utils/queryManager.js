import { SqlHelper } from './sql'

const QueryMethods = {
  getGroupsByClient: (args) => {
    const { tableName, clientId } = args
    return `SELECT t.* FROM ${tableName} t JOIN qubiclesapp.x_client_ingroups x ON t.group_id = x.group_id WHERE x.client_id =${clientId}`
  }
}

export const getRawQuery = ({ method, ...restArgs }) => {
  return QueryMethods[method](restArgs)
}

export const executeSelectQuery = ({ method, ...restArgs }) => {
  return SqlHelper.query(QueryMethods[method](restArgs))
}
