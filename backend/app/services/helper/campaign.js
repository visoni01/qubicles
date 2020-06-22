import { Campaign, XCampaignStatus } from '../../db/models'

export const getCampaignById = async ({ campaignId }) => {
  const campaignData = await Campaign.findOne({ where: { campaign_id: campaignId }, raw: true })
  return campaignData
}

export const getCampaignStatusesByCampaignId = async ({ campaignId }) => {
  return XCampaignStatus.findAll({ where: { campaign_id: campaignId }, raw: true})
}