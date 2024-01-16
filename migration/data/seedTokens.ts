import { COINGECKO_TOKEN_IDS } from '../../src/adapters/price/CoingeckoPriceAdapter';
import { NETWORK_IDS } from '../../src/provider';
import { ChainType } from '../../src/types/network';
import { SOLANA_SYSTEM_PROGRAM } from '../../src/utils/networks';

interface ITokenData {
  name: string;
  symbol: string;
  address: string;
  mainnetAddress?: string;
  isGivbackEligible?: boolean;
  decimals: number;
  networkId: number;
  chainType?: ChainType;
  coingeckoId?: string;
}
const seedTokens: ITokenData[] = [
  // Mainnet tokens
  {
    name: 'Ethereum native token',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Giveth Token',
    symbol: 'GIV',
    address: '0x900db999074d9277c5da2a43f252d74366230da0',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Panvala',
    symbol: 'PAN',
    address: '0xd56dac73a4d6766464b38ec6d91eb45ce7457c44',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Dai',
    symbol: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Rai Reflex Index',
    symbol: 'RAI',
    address: '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'dAppNode',
    symbol: 'NODE',
    address: '0xda007777d86ac6d989cc9f79a73261b3fc5e0da0',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Gemini Dollar',
    symbol: 'GUSD',
    address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    decimals: 2,
    networkId: 1,
  },
  {
    name: 'Gitcoin',
    symbol: 'GTC',
    address: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'ShapeShift FOX Token (FOX)',
    symbol: 'FOX',
    address: '0xc770eefad204b5180df6a14ee197d99d808ee52d',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Curve DAO Token',
    symbol: 'CRV',
    address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'TerraUSD',
    symbol: 'UST',
    address: '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Sushi Token',
    symbol: 'SUSHI',
    address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Balancer',
    symbol: 'BAL',
    address: '0xba100000625a3754423978a60c9317c58a424e3d',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'PieDAO DOUGH',
    symbol: 'DOUGH',
    address: '0xad32a8e6220741182940c5abf610bde99e737b2d',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Wrapped MIR Token',
    symbol: 'MIR',
    address: '0x09a3ecafa817268f77be1283176b946c4ff2e608',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Metagame SEED',
    symbol: 'SEED',
    address: '0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'PoH Universal Basic Income',
    symbol: 'UBI',
    address: '0xdd1ad9a21ce722c151a836373babe42c868ce9a4',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
    networkId: 1,
  },
  {
    name: 'Crypto.com Coin',
    symbol: 'CRO',
    address: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
    decimals: 8,
    networkId: 1,
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    address: '0x514910771af9ca656af840dff83e8264ecf986ca',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'UNUS SED LEO',
    symbol: 'LEO',
    address: '0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    networkId: 1,
  },
  {
    name: 'Huobi Token',
    symbol: 'HT',
    address: '0x6f259637dcd74c767781e37bc6133cd6a68aa161',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Compound',
    symbol: 'COMP',
    address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Maker',
    symbol: 'MKR',
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'HedgeTrade',
    symbol: 'HEDG',
    address: '0xf1290473e210b2108a85237fbcd7b6eb42cc654f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Basic Attention Token',
    symbol: 'BAT',
    address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'OKB',
    symbol: 'OKB',
    address: '0x75231f58b43240c9718dd58b4967c5114342a86c',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Paxos Standard',
    symbol: 'PAX',
    address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'ZRX 0x',
    symbol: 'ZRX',
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Kyber Network',
    symbol: 'KNC',
    address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'OMG Network',
    symbol: 'OMG',
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'The Midas Touch Gold',
    symbol: 'TMTG',
    address: '0x10086399dd8c1e3de736724af52587a2044c9fa2',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Augur',
    symbol: 'REP',
    address: '0x1985365e9f78359a9b6ad760e32412f4a445e862',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Lend Aave',
    symbol: 'LEND',
    address: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Synthetix Network Token',
    symbol: 'SNX',
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Hyperion',
    symbol: 'HYN',
    address: '0xe99a894a69d7c2e3c92e61b64c505a6a57d2bc07',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Enjin Coin',
    symbol: 'ENJ',
    address: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Ren',
    symbol: 'REN',
    address: '0x408e41876cccdc0f92210600ef50372656052a38',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'HUSD',
    symbol: 'HUSD',
    address: '0xdf574c24545e5ffecb9a659c229253d4111d87e1',
    decimals: 8,
    networkId: 1,
  },
  {
    name: 'Celsius',
    symbol: 'CEL',
    address: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d',
    decimals: 4,
    networkId: 1,
  },
  {
    name: 'ZB Token',
    symbol: 'ZB',
    address: '0xbd0793332e9fb844a52a205a233ef27a5b34b927',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'DxChain Token',
    symbol: 'DX',
    address: '0x973e52691176d36453868d9d86572788d27041a9',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Quant',
    symbol: 'QNT',
    address: '0x4a220e6096b25eadb88358cb44068a3248254675',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Holo',
    symbol: 'HOT',
    address: '0x6c6ee5e31d828de241282b9606c8e98ea48526e2',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'SwissBorg',
    symbol: 'CHSB',
    address: '0xba9d4199fab4f26efe3551d490e3821486f135ba',
    decimals: 8,
    networkId: 1,
  },
  {
    name: 'Loopring',
    symbol: 'LRC',
    address: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Status',
    symbol: 'SNT',
    address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Mixin',
    symbol: 'XIN',
    address: '0xa974c709cfb4566686553a20790685a47aceaa33',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Bancor',
    symbol: 'BNT',
    address: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'KuCoin Shares',
    symbol: 'KCS',
    address: '0x039b5649a59967e3e936d7471f9c3700100ee1ab',
    decimals: 6,
    networkId: 1,
  },
  {
    name: 'MCO',
    symbol: 'MCO',
    address: '0xb63b606ac810a52cca15e44bb630fd42d8d1d83d',
    decimals: 8,
    networkId: 1,
  },
  {
    name: 'Matic Network',
    symbol: 'MATIC',
    address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Egoras',
    symbol: 'EGR',
    address: '0x73cee8348b9bdd48c64e13452b8a6fbc81630573',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Numeraire',
    symbol: 'NMR',
    address: '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    decimals: 8,
    networkId: 1,
  },
  {
    name: 'Decentraland',
    symbol: 'MANA',
    address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Golem',
    symbol: 'GNT',
    address: '0xa74476443119a942de498590fe1f2454d7d4ac0d',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'PAX Gold',
    symbol: 'PAXG',
    address: '0x45804880de22913dafe09f4980848ece6ecbaf78',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'iExec RLC',
    symbol: 'RLC',
    address: '0x607f4c5bb672230e8672085532f7e901544a7375',
    decimals: 9,
    networkId: 1,
  },
  {
    name: 'aelf',
    symbol: 'ELF',
    address: '0xbf2179859fc6d5bee9bf9158632dc51678a4100e',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'SOLVE',
    symbol: 'SOLVE',
    address: '0x446c9033e7516d820cc9a2ce2d0b7328b579406f',
    decimals: 8,
    networkId: 1,
  },
  {
    name: 'Reserve Rights',
    symbol: 'RSR',
    address: '0x8762db106b2c2a0bccb3a80d1ed41273552616e8',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'APIX',
    symbol: 'APIX',
    address: '0xf51ebf9a26dbc02b13f8b3a9110dac47a4d62d78',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Aragon',
    symbol: 'ANT',
    address: '0xa117000000f279d81a1d3cc75430faa017fa5a2e',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Unibright',
    symbol: 'UBT',
    address: '0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e',
    decimals: 8,
    networkId: 1,
  },
  {
    name: 'BrightID',
    symbol: 'BRIGHT',
    address: '0x5dd57da40e6866c9fcc34f4b6ddc89f1ba740dfe',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'yearn.finance',
    symbol: 'YFI',
    address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'SHIBA INU',
    symbol: 'SHIB',
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    decimals: 18,
    networkId: 1,
  },
  {
    name: '1INCH Token',
    symbol: '1INCH',
    address: '0x111111111117dc0aa78b770fa6a738034120c302',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'CyberVein',
    symbol: 'CVT',
    address: '0xbe428c3867f05dea2a89fc76a102b544eac7f772',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'BTU Protocol',
    symbol: 'BTU',
    address: '0xb683d83a532e2cb7dfa5275eed3698436371cc9f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Digitex Futures',
    symbol: 'DGTX',
    address: '0xc666081073e8dff8d3d1c2292a29ae1a2153ec09',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Xensor',
    symbol: 'XSR',
    address: '0x6bc1f3a1ae56231dbb64d3e82e070857eae86045',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Dragonchain',
    symbol: 'DRGN',
    address: '0x419c4db4b9e25d6db2ad9691ccb832c8d9fda05e',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'STASIS EURO',
    symbol: 'EURS',
    address: '0xdb25f211ab05b1c97d595516f45794528a807ad8',
    decimals: 2,
    networkId: 1,
  },
  {
    name: 'Power Ledger',
    symbol: 'POWR',
    address: '0x595832f8fc6bf59c85c527fec3740a1b7a361269',
    decimals: 6,
    networkId: 1,
  },
  {
    name: 'Swipe',
    symbol: 'SXP',
    address: '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Pundi X',
    symbol: 'NPXS',
    address: '0xa15c7ebe1f07caf6bff097d8a589fb8ac49ae5b3',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Gatechain Token',
    symbol: 'GT',
    address: '0xe66747a101bff2dba3697199dcce5b743b454759',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Molecular Future',
    symbol: 'MOF',
    address: '0x653430560be843c4a3d143d0110e896c2ab8ac0d',
    decimals: 16,
    networkId: 1,
  },
  {
    name: 'Orbs',
    symbol: 'ORBS',
    address: '0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Crypterium',
    symbol: 'CRPT',
    address: '0x80a7e048f37a50500351c204cb407766fa3bae7f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Ripio Credit Network',
    symbol: 'RCN',
    address: '0xf970b8e36e23f7fc3fd752eea86f8be8d83375a6',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Streamr',
    symbol: 'DATA',
    address: '0x0cf0ee63788a0849fe5297f3407f701e122cc023',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Huobi Pool Token',
    symbol: 'HPT',
    address: '0xa66daa57432024023db65477ba87d4e7f5f95213',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'BHEX Token',
    symbol: 'BHT',
    address: '0xfc29b6e626b67776675fff55d5bc0452d042f434',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Gnosis',
    symbol: 'GNO',
    address: '0x6810e776880c02933d47db1b9fc05908e5386b96',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'IDEX',
    symbol: 'IDEX',
    address: '0xb705268213d593b8fd88d3fdeff93aff5cbdcfae',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'NuCypher',
    symbol: 'NU',
    address: '0x4fE83213D56308330EC302a8BD641f1d0113A4Cc',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Idle Finance',
    symbol: 'IDLE',
    address: '0x875773784Af8135eA0ef43b5a374AaD105c5D39e',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Yield Guild',
    symbol: 'YGG',
    address: '0x25f8087ead173b73d6e8b84329989a8eea16cf73',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Alchemix',
    symbol: 'ALCX',
    address: '0xdbdb4d16eda451d0503b854cf79d55697f90c8df',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Amp',
    symbol: 'AMP',
    address: '0xff20817765cb7f73d4bde2e66e067e58d11095c2',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Ankr Network',
    symbol: 'ANKR',
    address: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Axie Infinity Shard',
    symbol: 'AXS',
    address: '0xbb0e17ef65f82ab018d8edd776e8dd940327b28b',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'BarnBridge Governance Token',
    symbol: 'BOND',
    address: '0x0391D2021f89DC339F60Fff84546EA23E337750f',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Cryptex',
    symbol: 'CTX',
    address: '0x321c2fe4446c7c963dc41dd58879af648838f98d',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Fantom Token',
    symbol: 'FTM',
    address: '0x4e15361fd6b4bb609fa63c81a2be19d873717870',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Graph Token',
    symbol: 'GRT',
    address: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Injective Token',
    symbol: 'INJ',
    address: '0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Livepeer Token',
    symbol: 'LPT',
    address: '0x58b6a8a3302369daec383334672404ee733ab239',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Moss Carbon Credit',
    symbol: 'MCO2',
    address: '0xfc98e825a2264d890f9a1e68ed50e1526abccacd',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Orchid',
    symbol: 'OXT',
    address: '0x4575f41308EC1483f3d399aa9a2826d74Da13Deb',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'The Sandbox',
    symbol: 'SAND',
    address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Skale',
    symbol: 'SKALE',
    address: '0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Smooth Love Potion',
    symbol: 'SLP',
    address: '0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Somnium Space Cubes',
    symbol: 'CUBE',
    address: '0xdf801468a808a32656d2ed2d2d80b72a129739f4',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Storj',
    symbol: 'STORJ',
    address: '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Wrapped LUNA Token',
    symbol: 'LUNA',
    address: '0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'UMA Voting Token v1',
    symbol: 'UMA',
    address: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Uniswap',
    symbol: 'UNI',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Wrapped Centrifuge',
    symbol: 'wCFG',
    address: '0xc221b7e65ffc80de234bbb6667abdd46593d34f0',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Audius',
    symbol: 'AUDIO',
    address: '0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Mask Network',
    symbol: 'MASK',
    address: '0x69af81e73a73b40adf4f3d4223cd9b1ece623074',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Radicle',
    symbol: 'RAD',
    address: '0x31c8eacbffdd875c74b94b077895bd78cf1e64a3',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'API3',
    symbol: 'API3',
    address: '0x0b38210ea11411557c13457D4dA7dC6ea731B88a',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'The Burn Token',
    symbol: 'ASH',
    address: '0x71590d4ed14d9cbacb2cff8abf919ac4d22c5b7b',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'SuperRare',
    symbol: 'RARE',
    address: '0xba5bde662c17e2adff1075610382b9b691296350',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Fetch',
    symbol: 'FET',
    address: '0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85',
    decimals: 18,
    networkId: 1,
  },
  {
    name: 'Ethereum native token',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: 3,
  },
  {
    name: 'DAI Ropsten',
    symbol: 'DAI',
    address: '0xad6d458402f60fd3bd25163575031acdce07538d',
    decimals: 18,
    networkId: 3,
  },
  {
    name: 'Giveth Ropsten Test',
    symbol: 'YAY',
    address: '0x067eA48882E6D728A37acfd1535ec03f8E33794a',
    decimals: 18,
    networkId: 3,
  },
  {
    name: 'UNI Ropsten',
    symbol: 'UNI',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    decimals: 18,
    networkId: 3,
  },
  {
    name: 'Xdai native token',
    symbol: 'XDAI',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Giveth Token',
    symbol: 'GIV',
    address: '0x4f4F9b8D5B4d0Dc10506e5551B0513B61fD59e75',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Curve DAO Token',
    symbol: 'CRV',
    address: '0x1337BedC9D22ecbe766dF105c9623922A27963EC',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'dAppNode on xDAI',
    symbol: 'XNODE',
    address: '0xc60e38C6352875c051B481Cbe79Dd0383AdB7817',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Panvala',
    symbol: 'PAN',
    address: '0x981fb9ba94078a2275a8fc906898ea107b9462a8',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Honey',
    symbol: 'HNY',
    address: '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'STAKE on xDai',
    symbol: 'STAKE',
    address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'USDC on xDai',
    symbol: 'USDC',
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    decimals: 6,
    networkId: 100,
  },
  {
    name: 'Wrapped Ether on xDai',
    symbol: 'WETH',
    address: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'ChainLink Token on xDai',
    symbol: 'LINK',
    address: '0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Moons on xDai',
    symbol: 'xMOON',
    address: '0x1e16aa4Df73d29C029d94CeDa3e3114EC191E25A',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Wrapped XDAI',
    symbol: 'WXDAI',
    address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Tether USD on xDai',
    symbol: 'USDT',
    address: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
    decimals: 6,
    networkId: 100,
  },
  {
    name: 'Wrapped BTC on xDai',
    symbol: 'WBTC',
    address: '0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252',
    decimals: 8,
    networkId: 100,
  },
  {
    name: 'Agave Token',
    symbol: 'AGVE',
    address: '0x3a97704a1b25F08aa230ae53B352e2e72ef52843',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'xDAI Native Comb',
    symbol: 'XCOMB',
    address: '0x38Fb649Ad3d6BA1113Be5F57B927053E97fC5bF7',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'DAOhaus',
    symbol: 'HAUS',
    address: '0xb0C5f3100A4d9d9532a4CfD68c55F1AE8da987Eb',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Fox Token',
    symbol: 'FOX',
    address: '0x21a42669643f45Bc0e086b8Fc2ed70c23D67509d',
    decimals: 18,
    networkId: 100,
  },
  {
    name: 'Bright on xDAI',
    symbol: 'BRIGHT',
    address: '0x83FF60E2f93F8eDD0637Ef669C69D5Fb4f64cA8E',
    decimals: 18,
    networkId: 100,
  },

  // Goerli tokens
  {
    name: 'Ethereum native token',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: 5,
  },
  {
    address: '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60',
    symbol: 'DAI',
    name: 'DAI Goerli',
    decimals: 18,
    networkId: 5,
  },
  {
    address: '0xA2470F25bb8b53Bd3924C7AC0C68d32BF2aBd5be',
    symbol: 'DRGIV3',
    name: 'GIV test',
    decimals: 18,
    networkId: 5,
  },

  // POLYGON tokens
  {
    name: 'POLYGON native token',
    symbol: 'MATIC',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    mainnetAddress: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    networkId: NETWORK_IDS.POLYGON,
  },

  // OPTIMISM Goerli tokens
  {
    name: 'OPTIMISM Goerli native token',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISM_GOERLI,
  },
  {
    name: 'OPTIMISM Goerli OP token',
    symbol: 'OP',
    address: '0x4200000000000000000000000000000000000042',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISM_GOERLI,
  },
  {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISM_GOERLI,
  },
  {
    name: 'Dai',
    symbol: 'DAI',
    address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISM_GOERLI,
  },

  // OPTIMISTIC tokens
  {
    name: 'OPTIMISTIC native token',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'OPTIMISTIC OP token',
    symbol: 'OP',
    address: '0x4200000000000000000000000000000000000042',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    address: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    address: '0x68f180fcce6836688e9084f035309e29bf0a2095',
    decimals: 8,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'Synthetix Network',
    symbol: 'SNX',
    address: '0x8700daec35af8ff88c16bdf0418774cb3d7599b4',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    decimals: 6,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    decimals: 6,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  {
    name: 'Dai',
    symbol: 'DAI',
    address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    decimals: 18,
    networkId: NETWORK_IDS.OPTIMISTIC,
  },
  // CELO tokens
  {
    symbol: 'CELO',
    name: 'Celo Native',
    address: '0x0000000000000000000000000000000000000000',
    // address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
    decimals: 18,
    // We usually set isGivbackEligible true for native tokens
    isGivbackEligible: true,
    networkId: NETWORK_IDS.CELO,
  },
  {
    symbol: 'cUSD',
    name: 'Celo Dollar',
    address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    decimals: 18,
    networkId: NETWORK_IDS.CELO,
  },
  {
    symbol: 'cEUR',
    name: 'Celo Euro',
    address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73',
    decimals: 18,
    networkId: NETWORK_IDS.CELO,
  },
  {
    symbol: 'cREAL',
    name: 'Celo Brazilian Real',
    address: '0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787',
    decimals: 18,
    networkId: NETWORK_IDS.CELO,
  },
  // CELO ALFAJORES tokens
  {
    symbol: 'CELO',
    name: 'Celo Native',
    address: '0x0000000000000000000000000000000000000000',
    // address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
    decimals: 18,
    networkId: NETWORK_IDS.CELO_ALFAJORES,
  },
  {
    symbol: 'cUSD',
    name: 'Celo Dollar',
    address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
    decimals: 18,
    networkId: NETWORK_IDS.CELO_ALFAJORES,
  },
  {
    symbol: 'cEUR',
    name: 'Celo Euro',
    address: '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F',
    decimals: 18,
    networkId: NETWORK_IDS.CELO_ALFAJORES,
  },
  {
    symbol: 'cREAL',
    name: 'Celo Brazilian Real',
    address: '0xE4D517785D091D3c54818832dB6094bcc2744545',
    decimals: 18,
    networkId: NETWORK_IDS.CELO_ALFAJORES,
  },

  // ETC tokens
  {
    name: 'ETC native token',
    symbol: 'ETC',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: NETWORK_IDS.ETC,
  },

  // ETC tokens
  {
    name: 'Wrapped ETC token',
    symbol: 'WETC',
    address: '0x82A618305706B14e7bcf2592D4B9324A366b6dAd',
    decimals: 18,
    networkId: NETWORK_IDS.ETC,
  },
  // HEBE tokens
  {
    name: 'HEBE',
    symbol: 'HEBE',
    address: '0x88d8C3Dc6B5324f34E8Cf229a93E197048671abD',
    decimals: 18,
    networkId: NETWORK_IDS.ETC,
  },

  // Mordor ETC testnet tokens
  {
    name: 'Mordor ETC native token',
    symbol: 'mETC',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    networkId: NETWORK_IDS.MORDOR_ETC_TESTNET,
  },
  {
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    address: '0x3B2e50b6CBe03AcA7578Da058eFe2Acc56dd386e',
    decimals: 18,
    networkId: NETWORK_IDS.MORDOR_ETC_TESTNET,
  },
  // SOLANA mainnet
  {
    name: 'Solana native token',
    symbol: 'SOL',
    address: SOLANA_SYSTEM_PROGRAM,
    decimals: 9,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.SOLANA,
  },
  {
    name: 'Marinade staked SOL',
    symbol: 'mSOL',
    address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    decimals: 9,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.MSOL,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.USDC,
  },
  {
    name: 'Tether',
    symbol: 'USDCT',
    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.USDT,
  },
  {
    name: 'Raydium',
    symbol: 'RAY',
    address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.RAY,
  },
  {
    name: 'BlazeStake Staked SOL',
    symbol: 'BSOL',
    address: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1',
    decimals: 9,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.BSOL,
  },
  {
    name: 'Audius (Wormhole)',
    symbol: 'AUDIO',
    address: '9LzCMqDgTKYz9Drzqnpgee3SGa89up3a247ypMj2xrqM',
    decimals: 8,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.AUDIO,
  },
  {
    name: 'Mango',
    symbol: 'MANGO',
    address: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
    decimals: 6,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.MANGO,
  },
  {
    name: 'Coin98',
    symbol: 'C98',
    address: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
    decimals: 6,
    networkId: NETWORK_IDS.SOLANA_MAINNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.C98,
  },

  // SOLANA devnet
  {
    name: 'Solana native token',
    symbol: 'SOL',
    address: SOLANA_SYSTEM_PROGRAM,
    decimals: 9,
    networkId: NETWORK_IDS.SOLANA_DEVNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.SOLANA,
  },

  {
    // Mohammad has deployed it on solana devnet, so you can get some tokens from him
    name: 'Test SPL token',
    symbol: 'TEST-SPL-TOKEN',
    address: 'BrEahxkTrCKfjVy36pLD2gvVoMCUMEb1PinrAFtvJqPX',
    decimals: 9,
    networkId: NETWORK_IDS.SOLANA_DEVNET,
    chainType: ChainType.SOLANA,
  },

  // SOLANA testnet
  {
    name: 'Solana native token',
    symbol: 'SOL',
    address: SOLANA_SYSTEM_PROGRAM,
    decimals: 9,
    networkId: NETWORK_IDS.SOLANA_DEVNET,
    chainType: ChainType.SOLANA,
    coingeckoId: COINGECKO_TOKEN_IDS.SOLANA,
  },
];

export default seedTokens;
