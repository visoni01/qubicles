import ServiceBase from '../../common/serviceBase'
import Checkr from './checkr'

const constraints = {
  email: {
    presence: { allowEmpty: false }
  },
  phone_number: {
    presence: { allowEmpty: false }
  },
  first_name: {
    presence: { allowEmpty: false }
  },
  last_name: {
    presence: { allowEmpty: false }
  },
  ssn: {
    presence: { allowEmpty: false }
  },
  dob: {
    presence: { allowEmpty: false }
  }
}

export default class AddAuthenticationService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { first_name, last_name, email, dob, ssn } = this.filteredArgs
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
