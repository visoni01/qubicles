import { XLeadsList } from '../../db/models'

export const getListByListId = ({ listId }) => {
  return XLeadsList.findOne({ where: { list_id: listId }, raw: true })
}
