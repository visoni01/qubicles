import { Campaign, XCampaignStatus } from '../../db/models'

export const getCampaignById = async ({ campaign_id }) => {
  const campaignData = await Campaign.findOne({ where: { campaign_id }, raw: true })
  return campaignData
}

export const getCampaignStatusesByCampaignId = async ({ campaign_id }) => {
  return XCampaignStatus.findAll({ where: { campaign_id }, raw: true })
}
