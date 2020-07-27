import ServiceBase from '../../common/serviceBase'
import { addChannel } from '../helper'
import { XClientUser } from '../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  title: {
    presence: { allowEmpty: false }
  },
  is_public: {
    presence: { allowEmpty: true }
  },
  category_id: {
    presence: { allowEmpty: false }
  },
  is_company_ann: {
    presence: { allowEmpty: true }
  }
}

export default class ForumAddNewChannelService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, title, is_public, category_id, is_company_ann } = this.args
    const { client_id } = await XClientUser.findOne({ where: { user_id }, raw: true, attributes: ['client_id'] })

    const data = await addChannel({
      channel_title: title,
      owner_id: user_id,
      is_public: is_public,
      client_id,
      category_id: category_id,
      is_company_ann: is_company_ann
    })

    return {
      channel_title: data.channel_title,
      client_id: data.client_id
    }
  }
}
