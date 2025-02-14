// import { createPublicClient, http } from 'viem'
import { mainnet, polygon, polygonAmoy, base, bscTestnet, bsc, arbitrum, avalanche, avalancheFuji } from 'viem/chains'
import Web3 from 'web3'

const isProduct = 'local'

// const PROVIDER_URL_BSC = 'https://binance.llamarpc.com'
const PROVIDER_URL_BSC = 'https://bsc.meowrpc.com'
const PROVIDER_URL_TESTBSC = 'https://bsc-testnet-rpc.publicnode.com'
const PROVIDER_URL_BASE = 'https://mainnet.base.org'
const PROVIDER_URL_POL = 'https://polygon.llamarpc.com'
const PROVIDER_URL_ETH = 'https://ethereum-rpc.publicnode.com'
const PROVIDER_URL_ARB = 'https://arbitrum.meowrpc.com'
const PROVIDER_URL_AVAX = 'https://avalanche-c-chain-rpc.publicnode.com'
const PROVIDER_URL_AMOY = 'https://rpc-amoy.polygon.technology/'
export const web3ClientBsc = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_BSC))
export const web3ClientTestBsc = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_TESTBSC))
export const web3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_ETH))
export const baseWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_BASE))
export const polWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_POL))
export const arbWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_ARB))
export const avaxWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_AVAX))
export const amoyWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_AMOY))
export const web3Clients = {
    56: web3ClientBsc,
    //80002: amoyWeb3Client,
    // 97: web3ClientTestBsc,
    // 1: web3Client,
    //137: polWeb3Client,
    // 8453: baseWeb3Client,
    // 42161: arbWeb3Client,
    // 43114: avaxWeb3Client,
}

export const imageUrl = isProduct !== 'local' ? 'http://localhost:8000/api/uploads/' : 'https://api.blackpump.net/api/uploads/'

export const apiUrl = isProduct !== 'local' ? 'http://localhost:8000' : 'https://api.blackpump.net'

export const imageUploadUrl = isProduct !== 'local' ? 'http://localhost:8000/' : 'https://api.blackpump.net/'

export const ethPriceApiUrl = {
    1: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
    56: 'https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD',
    97: 'https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD',
    8453: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
    137: 'https://min-api.cryptocompare.com/data/price?fsym=POL&tsyms=USD',
    42161: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
    43114: 'https://min-api.cryptocompare.com/data/price?fsym=AVAX&tsyms=USD',
}

export const supportedChainIds = [bsc.id, mainnet.id, base.id, polygon.id, polygonAmoy.id]
// export const supportedChainIds = [bsc.id, mainnet.id, base.id, polygon.id, bscTestnet.id, arbitrum.id, avalanche.id, ]

export const chainLogos = {
    1: 'img/chains/eth.svg',
    56: 'img/chains/bsc.svg',
    97: 'img/chains/testbsc.svg',
    137: 'img/chains/polygon.svg',
    8453: 'img/chains/base.svg',
    42161: 'img/chains/arbitrum.svg',
    43114: 'img/chains/avalanche.svg',
    80002: 'img/chains/amoy.svg',
}

export const feeAmounts = {
    1: 0.0012,
    56: 0.005,
    // 137: 7.13,
    97: 0.01,
    137: 7.13,
    80002: 0.0012,
    8453: 0.0012,
    42161: 0.0012,
    43114: 0.0012,
}

export const gasLimit = {
    1: 30_000_000n,
    56: 140_000_000n,
    // 137: 7.13,
    97: 0.005,
    137: 30_000_000n,
    8453: 30_000_000,
    42161: 30_000_000,
    43114: 30_000_000,
    80002: 30_000_000,
}



export const initialEth = {
    1: 2.07,
    56: 8.8,
    97: 8.7,
    137: 12558,
    8453: 2.07,
    42161: 2.07,
    43114: 2.07,
    80002: 2.07,
}

export const coinNames = {
    1: 'ETH',
    10: 'ETH',
    56: 'BNB',
    137: 'POL',
    97: 'BNB',
    8453: 'ETH',
    42161: 'ETH',
    43114: 'AVAX',
    80002: 'POL',
}

export const featureAmounts = {
    1: [0, 0.12, 0.18, 0.24],
    56: [0, 0.5, 0.75, 1],
    97: [0, 0.5, 0.75, 1],
    137: [0, 713, 1070, 1426],
    8453: [0, 0.12, 0.18, 0.24],
    42161: [0, 0.12, 0.18, 0.24],
    43114: [0, 0.12, 0.18, 0.24],
    80002: [0, 0.12, 0.18, 0.24],
}

export const scanLinks = {
    8453: 'https://basescan.org/',
    1: 'https://etherscan.io/',
    56: 'https://bscscan.com/',
    97: 'https://testnet.bscscan.com/',
    137: 'https://polygonscan.com/',
    10: 'https://optimistic.etherscan.io/',
    42161: 'https://arbitrum.io/',
    43114: 'https://www.avax.network/',
    80002: 'https://amoy.polygonscan.com/'
}

export const scanApiLinks = {
    8453: 'https://api.basescan.org/api',
    1: 'https://api.etherscan.io/api',
    56: 'https://api.bscscan.com/api',
    97: 'https://api-testnet.bscscan.com/api',
    137: 'https://api.polygonscan.com/api',
    80002: 'https://api-amoy.polygonscan.com/api'
}

export const shortenAddress = (address: string, length: number) => {
    return address.slice(0, length + 2) + '...' + address.slice(-length)
}
export const apiKeys = {
    56: 'Y7TXAF2H8KCPY7AXFT7DSTBFUVH794ZCST',
    97: 'Y7TXAF2H8KCPY7AXFT7DSTBFUVH794ZCST',
    80002: 'Y7TXAF2H8KCPY7AXFT7DSTBFUVH794ZCST'
}
export const usdtAddress = '0x55d398326f99059ff775485246999027b3197955'
//export const usdtAddress = '0x0d124116651bbD9f71c51e975324574c20797c64'
export const chainNames = {
    1: 'eth',
    8453: 'base',
    56: 'bnb',
    97: 'bnb',
    137: 'polygon',
    42161: 'arbitrum',
    43114: 'avalanche'
}

export const chainNames1 = {
    1: 'ethereum',
    8453: 'base',
    56: 'bsc',
    97: 'bsc',
    137: 'polygon',
    42161: 'arbitrum',
    43114: 'avalanche'
}

export const melegaRouters = {
    1: '0xFF8EBf8edf1C533A02d066f852788773BdCD631C',
    56: '0xc25033218D181b27D4a2944Fbb04FC055da4EAB3',
    97: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
    137: '0x64935e2A3d8F3840445fB2DdF37FBBfc3b292EFe',
    8453: '0x1B30D21354a082EeBC66c4C5E56320759f7994e5',
    42161: '0x1B30D21354a082EeBC66c4C5E56320759f7994e5',
    43114: '0x1B30D21354a082EeBC66c4C5E56320759f7994e5',
}

export const melegaAddress = {
    1: '0x5911Dc98a9E1A4FfFD802C3A57cdA6bbd26Cdb76',
    56: '0x963556de0eb8138E97A85F0A86eE0acD159D210b',
    97: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd',
    137: '0xD3e28c74177B812d1543A406aD1A97ee3C398AC2',
    8453: '0x56e46bE7714550A4Cb7bD0863BaB2680c099d8d7',
    42161: '0x56e46bE7714550A4Cb7bD0863BaB2680c099d8d7',
    43114: '0x56e46bE7714550A4Cb7bD0863BaB2680c099d8d7',
}

export default function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toLocaleString() + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toLocaleString() + 'K';
    } else {
        return number.toString();
    }
}