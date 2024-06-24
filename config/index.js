import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { 
  fallback,
  http,
} from 'wagmi'
// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID

if (!projectId) throw new Error('Project ID is not defined') 

const metadata = {
    name: 'Linagee',
    description: 'Linagee is a decentralized naming service for Ethereum.',
    url: 'https://linagee.vision', // origin must match your domain & subdomain
    icons: ['https://linagee.vision/']
  }

  const rpcEndpoints = [
    // Replace these with your desired RPC endpoints (e.g., Infura, Alchemy)
    "https://eth.llamarpc.com",
    "https://eth-mainnet.public.blastapi.io",
    "https://rpc.ankr.com/eth",
    "https://rpc.flashbots.net/",
    "https://cloudflare-eth.com/",
    "https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79",
    "https://ethereum.publicnode.com",
    "https://nodes.mewapi.io/rpc/eth",
    "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",

  ];



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
  transports: {
    [mainnet.id]: fallback(
      rpcEndpoints.map(endpoint => http(endpoint))
    ) 
  },
})