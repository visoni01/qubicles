import ServiceBase from '../../common/serviceBase'
import GetClientsService from './getClients'

const constraints = {
  user: {
    presence: { allowEmpty: false }
  }
}

export const USER_LEVEL = {
  AGENT: 2,
  // such as a client of our customer
  EXTERNAL: 6,
  SUPERVISOR: 7,
  ADMIN: 8,
  SYSTEM: 9
}

// This service will work same as security context constructor mentioned in
// https://github.com/qubicles/manager/blob/master/FC2.Library/SecurityContext.cs#L15
export default class GetSecurityContextService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // fetching the clients and clientIds
    const { clients, clientIds } = await GetClientsService.run({ userId: this.user.user_id })
    // TODO: Below implementation will be done when we start work on campaign
    // if (ClientIdsRef.Count > 0) {
    //   CampaignsRef = mf.GetCampaigns (ClientIdsRef [0]).ToList ();
    //   IngroupsRef = mf.GetInboundGroups (ClientIdsRef [0]).ToList ();
    // }
    return {
      userRef: this.user,
      username: this.user.user,
      clients: clients,
      currentClientId: (clients && clients.length) ? clients[0].client_id : 0,
      clientIds: clientIds
    }
  }
}
