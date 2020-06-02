import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser } from '../../../db/models'
import { findUniqueID, generateID } from '../../../utils/generateId'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  source: {
    presence: { allowEmpty: false }
  },
  interactions_per_month: {
    presence: { allowEmpty: false }
  },
  website: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupEmployerStep3Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const xClientUserData = await XClientUser.findOne({ where: { user_id: this.user_id }, raw: true })
    if (xClientUserData) {
      const clientInfo = await XClient.findOne({ where: { client_id: xClientUserData.client_id }, raw: true })
      const clientObject = {
        source: this.source,
        interactions_per_month: this.interactions_per_month,
        website: this.website
      }
      try {
        // Generate Client username here
        clientObject.client_username = await generateClientUserName({ name: clientInfo.client_name, maxLength: 100 })

        // Update client in x_clients
        await XClient.update(
          clientObject, {
            where: {
              client_id: xClientUserData.client_id
            }
          }
        )

        return `Post signup step 3 for user ${this.user_id} is completed`
      } catch (e) {
        this.addError(e.message, e.json || e.errors[0].message)
      }
    } else {
      this.addError('xClient', 'Client does not exist for this user, Please complete step 1 First')
    }
  }
}

async function generateClientUserName ({ name, maxLength }) {
  let isUnique = false
  let id = await generateID(name, maxLength)
  let chkID = id
  let appendCount = 0
  const allUsernames = await XClient.findAll({ attributes: ['client_username'], raw: true })
  while (!isUnique) {
    const current = allUsernames.find(obj => obj.client_username !== null && obj.client_username.toLowerCase() === chkID.toLowerCase())
    if (current === undefined || current === null) {
      // We have no existing username with same id
      id = chkID
      isUnique = true
    } else {
      // We have an existing username with same id
      appendCount += 1
      chkID = await findUniqueID(id, appendCount, maxLength)
    }
  }
  return id
}
