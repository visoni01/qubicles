import { Campaign } from '../../db/models'

export const getCampaignById = async ({ campaignId }) => {
  const campaignData = await Campaign.findOne({ where: { campaign_id: campaignId }, raw: true })
  return campaignData
}
