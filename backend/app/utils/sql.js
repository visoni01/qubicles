import { sequelize } from '../db/models'
import logger from '../common/logger'

// Note: sequelize.QueryTypes
// sequelize.QueryTypes {
//   SELECT: 'SELECT',
//   INSERT: 'INSERT',
//   UPDATE: 'UPDATE',
//   BULKUPDATE: 'BULKUPDATE',
//   BULKDELETE: 'BULKDELETE',
//   DELETE: 'DELETE',
//   UPSERT: 'UPSERT',
//   VERSION: 'VERSION',
//   SHOWTABLES: 'SHOWTABLES',
//   SHOWINDEXES: 'SHOWINDEXES',
//   DESCRIBE: 'DESCRIBE',
//   RAW: 'RAW',
//   FOREIGNKEYS: 'FOREIGNKEYS',
//   SHOWCONSTRAINTS: 'SHOWCONSTRAINTS'
// }

export const SqlHelper = {
  select: async (queryString) => {
    logger.info('Select query ' + queryString)
    return sequelize.query(queryString,
      { raw: true, type: sequelize.QueryTypes.SELECT })
  },

  update: async (queryString) => {
    logger.info('Update query ' + queryString)
    return sequelize.query(queryString,
      { raw: true, type: sequelize.QueryTypes.UPDATE })
  },

  insert: async (queryString) => {
    logger.info('Insert query ' + queryString)
    return sequelize.query(queryString,
      { raw: true, type: sequelize.QueryTypes.INSERT })
  }
}
