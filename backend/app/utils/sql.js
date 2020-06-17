import { sequelize } from '../db/models'

export const SqlHelper = {
  query: async (queryString) => {
    return sequelize.query(queryString,
      { raw: true, type: sequelize.QueryTypes.SELECT })
  }
}
