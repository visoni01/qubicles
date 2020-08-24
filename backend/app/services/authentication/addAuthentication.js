import ServiceBase from '../../common/serviceBase'
import { getUserById, getUserDetails } from '../helper/user'
import Checkr from './checkr'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class AddAuthenticationService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs
    const promises = [
      () => getUserById({ user_id }),
      () => getUserDetails({ user_id })
    ]
    const [{ email }, { first_name, last_name, ssn, dob }] = await Promise.all(promises.map(promise => promise()))
    // Create User Candidate
    const { id } = await Checkr.createCandidate({
      first_name,
      last_name,
      email,
      dob,
      ssn
    })

    // Send Invitation to Candidate
    const { invitation_url } = await Checkr.createInvitation({ candidate_id: id })
    return invitation_url
  }
}
