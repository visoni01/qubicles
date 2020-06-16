import { Campaign } from '../../db/models/campaign'

export const getCompaignById = async ({ compaignId }) => {
  const campaignData = await Campaign.findOne({ where: { campaign_id: compaignId }, raw: true })
  return campaignData
}
