import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
    name: 'Linagee',
    description: 'Linagee is a decentralized naming service for Ethereum.',
    url: 'https://linagee.vision', // origin must match your domain & subdomain
    icons: ['https://linagee.vision/']
  }

// Create wagmiConfig
const chains = [mainnet] 
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})