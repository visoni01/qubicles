import apiClient from '../../utils/apiClient'
import { talentCards } from '../../containers/NewPeople/ContactCenter/testData'

class NewPeople {
  // Talent Api's
  static async getTalentCards() {
    // WIP Add Talent cards backend getter api
    const response = { talentCards }
    return response
  }
}

export default NewPeople
