import { XLeadsList } from '../../db/models'

export const getListByListId = ({ list_id }) => {
  return XLeadsList.findOne({ where: { list_id }, raw: true })
}
