import IpfsHttpClient from 'ipfs-http-client'
import config from '../../../config/app'

const ipfs = IpfsHttpClient({
  host: config.get('ipfs.host'),
  port: config.get('ipfs.port'),
  protocol: config.get('ipfs.protocol')
})

export const uploadFileToIPFS = async (fileContent) => {
  const response = await ipfs.add(fileContent)
  return `https://ipfs.io/ipfs/${response.cid}`
}
