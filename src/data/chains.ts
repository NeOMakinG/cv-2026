export interface ChainExperience {
  id: string;
  name: string;
  icon: string;
  /** One-liner shown on hover / modal header */
  tagline: string;
  /** Longer description for the modal body */
  description: string;
  /** Concrete deliverables / PR highlights */
  highlights: string[];
  /** Swappers / protocols touched on this chain */
  protocols: string[];
  /** Category for visual grouping */
  category: 'l1' | 'evm-l2' | 'non-evm';
  /** Link to filtered GitHub PRs (optional) */
  prLink?: string;
}

const SS_PRS = (query: string) =>
  `https://github.com/shapeshift/web/pulls?q=is%3Apr+author%3ANeOMakinG+is%3Aclosed+${encodeURIComponent(query)}`;

export const CHAINS: ChainExperience[] = [
  // ── L1 chains ──────────────────────────────────────────────
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/32e51d582a890b3dd3135fe3ee7c20c2fd699a6d/blockchains/ethereum/info/logo.png',
    tagline: 'Core EVM chain — smart contracts, DeFi, and daily driver',
    description:
      'Ethereum is the foundation of everything I build. At ShapeShift I maintain the core trading infrastructure — swappers (0x, CowSwap, LiFi, Portals), limit orders, LP positions, staking flows, and the embeddable swap widget. Outside of ShapeShift, I wrote Solidity contracts for Daily Meme Corp (memecoin launchpad on Abstract/EVM) and Skola DAO governance.',
    highlights: [
      'Built the embeddable swap widget from scratch (React + Vite + WalletConnect)',
      'Implemented limit orders, notifications, and perpetuals trading UI',
      'Migrated the entire ShapeShift frontend from CRA to Vite',
      'Smart contracts for Daily Meme Corp & Skola DAO',
    ],
    protocols: ['0x/ZRX', 'CowSwap', 'LiFi', 'Portals', 'THORChain', 'Uniswap'],
    category: 'l1',
    prLink: SS_PRS('ethereum'),
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/b7a5f12d893fcf58e0eb1dd64478f076857b720b/blockchains/bitcoin/info/logo.png',
    tagline: 'UTXO handling, cross-chain swaps via THORChain & Relay',
    description:
      'Integrated Bitcoin into the swap widget with WalletConnect/Reown support. Worked on UTXO fee estimation, dust thresholds, and cross-chain swaps through THORChain and Relay. Also handled BitcoinCash prefix cleanup in the send flow.',
    highlights: [
      'Added BTC support to the swap widget via Reown',
      'Relay cross-chain BTC swaps',
      'UTXO dust threshold tuning per THORChain docs',
    ],
    protocols: ['THORChain', 'Relay'],
    category: 'l1',
    prLink: SS_PRS('bitcoin'),
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/426526def2f327476e868ecb902c515ab17518af/blockchains/solana/info/logo.png',
    tagline: '10+ PRs — Jupiter swapper, Relay, side-project programs',
    description:
      'Deep Solana experience across the stack. Shipped the Jupiter swapper integration (10 PRs covering fee estimation, signing, Versioned Transactions), Relay swaps, and wallet support. Outside of ShapeShift, I wrote Anchor programs for personal DeFi side-projects.',
    highlights: [
      'Jupiter swapper — full integration including fee estimation & signing',
      'Solana Relay cross-chain swaps',
      'Swap widget BTC + Solana support via Reown',
      'Anchor programs for side-project DeFi tools',
    ],
    protocols: ['Jupiter', 'Relay', 'Raydium'],
    category: 'l1',
    prLink: SS_PRS('solana'),
  },
  {
    id: 'thorchain',
    name: 'THORChain',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/32e51d582a890b3dd3135fe3ee7c20c2fd699a6d/blockchains/thorchain/info/logo.png',
    tagline: '20 PRs — LP, streaming quotes, savers, pool warnings',
    description:
      'THORChain is the backbone of ShapeShift\'s cross-chain swaps. I maintained the THORSwap integration, built LP deposit/withdraw flows, implemented streaming quote support, added pool instability warnings, and handled savers vault interactions across Cosmos SDK and EVM.',
    highlights: [
      'Streaming quotes for THORChain & MAYAChain',
      'LP pool management UI (deposit, withdraw, status tracking)',
      'Pool instability warnings and feature flags',
      'Savers vault interactions',
    ],
    protocols: ['THORSwap', 'MAYAChain'],
    category: 'l1',
    prLink: SS_PRS('thorchain'),
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/b7a5f12d893fcf58e0eb1dd64478f076857b720b/blockchains/cosmos/info/logo.png',
    tagline: '10 PRs — staking, savers, IBC flows',
    description:
      'Worked extensively with the Cosmos SDK at ShapeShift — staking modal, savers deposit/withdraw, IBC transaction handling. Built the "Get Started" merge into the stake modal and handled Cosmos-specific step tracking.',
    highlights: [
      'Cosmos staking modal and step tracking',
      'Savers deposit and withdraw status',
      'USD amount display in stake/unstake flows',
    ],
    protocols: ['Cosmos SDK', 'IBC'],
    category: 'l1',
    prLink: SS_PRS('cosmos'),
  },
  {
    id: 'sui',
    name: 'Sui',
    icon: 'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg?1727791290',
    tagline: 'Full chain support + Cetus aggregator swapper',
    description:
      'Shipped end-to-end Sui integration at ShapeShift — chain adapter, asset grouping, and the Cetus DEX aggregator for token swaps. Handled the Move-based transaction model and SUI object ownership patterns.',
    highlights: [
      'Full Sui chain support (excluding → including tokens)',
      'Cetus aggregator swapper implementation',
      'Asset grouping for SUI tokens',
    ],
    protocols: ['Cetus'],
    category: 'non-evm',
    prLink: SS_PRS('sui'),
  },
  {
    id: 'tron',
    name: 'Tron',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/b7a5f12d893fcf58e0eb1dd64478f076857b720b/blockchains/tron/info/logo.png',
    tagline: 'Full support — SunIO, Butter swaps, LP deposits',
    description:
      'Built the complete Tron integration at ShapeShift — chain adapter with RPC throttling, SunIO and Butter swappers for same-chain and cross-chain trades, LP deposit flows, and asset grouping for TRC-20 tokens.',
    highlights: [
      'Full Tron chain adapter with throttling',
      'Butter cross-chain swapper for TRON',
      'SunIO same-chain swapper',
      'LP deposit/withdraw flows',
    ],
    protocols: ['SunIO', 'Butter'],
    category: 'non-evm',
    prLink: SS_PRS('tron'),
  },
  {
    id: 'ton',
    name: 'TON',
    icon: 'https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png?1696517498',
    tagline: '18 PRs — Stonfi swapper, referral fees, tx history',
    description:
      'One of my most extensive chain integrations. Built the full TON blockchain support — chain adapter, Stonfi DEX swapper with referral fee implementation, transaction history parsing, external receive address handling, and USDC/USDT asset grouping.',
    highlights: [
      'Full TON blockchain support from scratch',
      'Stonfi swapper with referral fee system',
      'Transaction history parsing',
      'Seeker wallet TON support',
    ],
    protocols: ['Stonfi'],
    category: 'non-evm',
    prLink: SS_PRS('ton'),
  },
  {
    id: 'starknet',
    name: 'Starknet',
    icon: 'https://assets.coingecko.com/coins/images/26433/large/starknet.png',
    tagline: 'Full implementation — Avnu swapper, account deploy, DAO treasury',
    description:
      'Built the entire Starknet integration at ShapeShift — from account deployment and fee estimation to the Avnu swapper for token trades. Handled Cairo-based transaction patterns, managed the DAO treasury address, and shipped it to production.',
    highlights: [
      'Starknet chain implementation from scratch',
      'Avnu DEX swapper for token swaps',
      'Account deployment fee estimation',
      'DAO treasury management',
    ],
    protocols: ['Avnu'],
    category: 'non-evm',
    prLink: SS_PRS('starknet'),
  },
  {
    id: 'near',
    name: 'NEAR',
    icon: 'https://assets.coingecko.com/coins/images/10365/large/near.jpg?1696510367',
    tagline: 'Chain enablement + Seeker wallet support',
    description:
      'Enabled NEAR Protocol on ShapeShift with Seeker wallet integration. Handled the account-based model and NEAR-specific transaction patterns.',
    highlights: [
      'NEAR chain enablement',
      'Seeker wallet NEAR support',
    ],
    protocols: [],
    category: 'non-evm',
    prLink: SS_PRS('near'),
  },

  // ── EVM L2s ────────────────────────────────────────────────
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/b7a5f12d893fcf58e0eb1dd64478f076857b720b/blockchains/arbitrum/info/logo.png',
    tagline: 'rFOX bridge, transaction parsing',
    description:
      'Maintained Arbitrum support at ShapeShift — rFOX token bridge between Ethereum and Arbitrum, bridge withdraw status tracking, and Arbitrum-specific transaction parsing.',
    highlights: [
      'rFOX Ethereum ↔ Arbitrum bridge',
      'Bridge transaction status tracking',
      'Arbitrum tx parsing',
    ],
    protocols: ['Arbitrum Bridge'],
    category: 'evm-l2',
    prLink: SS_PRS('arbitrum'),
  },
  {
    id: 'optimism',
    name: 'Optimism',
    icon: 'https://assets.coingecko.com/coins/images/25244/large/Optimism.png?1660904599',
    tagline: 'Core EVM L2 support',
    description:
      'Maintained Optimism as a core L2 at ShapeShift with full swapper support through 0x, CowSwap, and cross-chain via THORChain.',
    highlights: ['Core L2 swapper support', 'Cross-chain trading via THORChain'],
    protocols: ['0x', 'CowSwap'],
    category: 'evm-l2',
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/b7a5f12d893fcf58e0eb1dd64478f076857b720b/blockchains/avalanchec/info/logo.png',
    tagline: 'Core EVM chain with THORChain swaps',
    description:
      'Maintained Avalanche C-Chain support at ShapeShift with full DeFi integrations — swappers, staking, and cross-chain via THORChain.',
    highlights: ['Core EVM chain maintenance', 'THORChain cross-chain swaps'],
    protocols: ['THORChain', '0x'],
    category: 'evm-l2',
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/b7a5f12d893fcf58e0eb1dd64478f076857b720b/blockchains/binance/info/logo.png',
    tagline: 'Core EVM chain support',
    description:
      'Maintained BNB Smart Chain as a first-class EVM chain at ShapeShift with full swapper and DeFi support.',
    highlights: ['Core EVM chain maintenance', 'Multi-swapper support'],
    protocols: ['0x', 'THORChain'],
    category: 'evm-l2',
  },
  {
    id: 'base',
    name: 'Base',
    icon: 'https://rawcdn.githack.com/base-org/brand-kit/8984fe6e08be3058fd7cf5cd0b201f8b92b5a70e/logo/symbol/Base_Symbol_Blue.png',
    tagline: 'Relay integration, treasury management',
    description:
      'Integrated Base with Relay cross-chain swaps and managed the affiliate/treasury address configuration for Base transactions.',
    highlights: [
      'Relay cross-chain swap integration',
      'Treasury address management',
      'TrustWallet token icon migration',
    ],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: 'https://rawcdn.githack.com/trustwallet/assets/b7a5f12d893fcf58e0eb1dd64478f076857b720b/blockchains/polygon/info/logo.png',
    tagline: 'Core EVM chain with full swapper support',
    description:
      'Maintained Polygon as a core chain at ShapeShift — full swapper support, DeFi integrations, and cross-chain trading.',
    highlights: ['Core EVM chain maintenance', 'Multi-swapper support'],
    protocols: ['0x', 'THORChain', 'CowSwap'],
    category: 'evm-l2',
  },
  {
    id: 'gnosis',
    name: 'Gnosis',
    icon: 'https://assets.coingecko.com/asset_platforms/images/11062/large/Aatar_green_white.png?1643204471',
    tagline: 'Core EVM chain support',
    description:
      'Maintained Gnosis Chain (xDAI) as a supported EVM chain at ShapeShift.',
    highlights: ['Core EVM chain maintenance'],
    protocols: ['CowSwap'],
    category: 'evm-l2',
  },
  {
    id: 'linea',
    name: 'Linea',
    icon: 'https://assets.relay.link/icons/59144/light.png',
    tagline: 'Second-class citizen integration via Relay',
    description:
      'Integrated Linea as a second-class citizen EVM chain on ShapeShift with Relay-powered cross-chain swaps.',
    highlights: ['Linea chain integration', 'Relay cross-chain swaps'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'scroll',
    name: 'Scroll',
    icon: 'https://scroll-tech.github.io/token-list/scroll.png',
    tagline: 'Feature-flagged chain support',
    description:
      'Added Scroll chain support behind a feature flag at ShapeShift with Relay integration.',
    highlights: ['Scroll chain support', 'Feature flag rollout'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'blast',
    name: 'Blast',
    icon: 'https://assets.relay.link/icons/81457/light.png',
    tagline: 'Relay chain integration',
    description:
      'Integrated Blast as a second-class Relay chain on ShapeShift.',
    highlights: ['Blast chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'zksync',
    name: 'zkSync Era',
    icon: 'https://assets.relay.link/icons/324/light.png',
    tagline: 'Relay chain integration',
    description:
      'Integrated zkSync Era as a second-class Relay chain on ShapeShift.',
    highlights: ['zkSync Era chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'mantle',
    name: 'Mantle',
    icon: 'https://assets.relay.link/icons/5000/light.png',
    tagline: 'EVM chain integration',
    description:
      'Integrated Mantle as a second-class EVM chain on ShapeShift with Relay support.',
    highlights: ['Mantle chain integration'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'celo',
    name: 'Celo',
    icon: 'https://assets.coingecko.com/coins/images/11090/small/celo.png',
    tagline: 'Relay chain integration',
    description:
      'Integrated Celo as a second-class Relay chain on ShapeShift.',
    highlights: ['Celo chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'sonic',
    name: 'Sonic',
    icon: 'https://assets.coingecko.com/coins/images/38108/standard/200x200_Sonic_Logo.png',
    tagline: 'Second-class EVM chain',
    description:
      'Integrated Sonic (formerly Fantom) as a second-class EVM chain on ShapeShift.',
    highlights: ['Sonic EVM chain integration'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'berachain',
    name: 'Berachain',
    icon: 'https://assets.relay.link/icons/80094/light.png',
    tagline: 'EVM chain integration',
    description:
      'Integrated Berachain as a second-class EVM chain on ShapeShift.',
    highlights: ['Berachain chain integration'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'cronos',
    name: 'Cronos',
    icon: 'https://assets.relay.link/icons/25/light.png',
    tagline: 'EVM chain integration',
    description:
      'Integrated Cronos as a second-class EVM chain on ShapeShift.',
    highlights: ['Cronos chain integration'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'mode',
    name: 'Mode',
    icon: 'https://assets.relay.link/icons/34443/light.png',
    tagline: 'Second-class citizen via Relay',
    description:
      'Integrated Mode as a second-class citizen EVM chain on ShapeShift.',
    highlights: ['Mode chain integration'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'bob',
    name: 'BOB',
    icon: 'https://assets.coingecko.com/asset_platforms/images/255/small/bob.jpeg',
    tagline: 'Bitcoin L2 integration',
    description:
      'Integrated BOB (Build on Bitcoin) as a second-class citizen EVM chain on ShapeShift.',
    highlights: ['BOB chain integration'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'unichain',
    name: 'Unichain',
    icon: 'https://assets.coingecko.com/asset_platforms/images/22206/small/unichain.png',
    tagline: 'Relay citizen integration',
    description:
      'Integrated Unichain as a second-class citizen via Relay on ShapeShift.',
    highlights: ['Unichain chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'hemi',
    name: 'Hemi',
    icon: 'https://assets.relay.link/icons/43111/light.png',
    tagline: 'Relay integration',
    description:
      'Integrated Hemi as a Relay chain on ShapeShift.',
    highlights: ['Hemi chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'soneium',
    name: 'Soneium',
    icon: 'https://assets.relay.link/icons/1868/light.png',
    tagline: 'Relay integration',
    description:
      'Integrated Soneium as a Relay chain on ShapeShift.',
    highlights: ['Soneium chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'worldchain',
    name: 'World Chain',
    icon: 'https://assets.relay.link/icons/480/light.png',
    tagline: 'Relay chain integration',
    description:
      'Integrated World Chain as a second-class Relay chain on ShapeShift.',
    highlights: ['World Chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'plume',
    name: 'Plume',
    icon: 'https://assets.coingecko.com/coins/images/49459/small/plume.jpg',
    tagline: 'Relay chain integration',
    description:
      'Integrated Plume as a second-class Relay chain on ShapeShift.',
    highlights: ['Plume chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'story',
    name: 'Story',
    icon: 'https://assets.coingecko.com/coins/images/51994/small/story-2.png',
    tagline: 'Relay chain integration',
    description:
      'Integrated Story as a second-class Relay chain on ShapeShift.',
    highlights: ['Story chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'flow',
    name: 'Flow EVM',
    icon: 'https://assets.coingecko.com/coins/images/13446/small/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png',
    tagline: 'EVM Relay chain',
    description:
      'Integrated Flow EVM as a second-class Relay chain on ShapeShift.',
    highlights: ['Flow EVM chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'ethereal',
    name: 'Ethereal',
    icon: 'https://assets.relay.link/icons/5064014/light.png',
    tagline: 'Relay chain integration',
    description:
      'Integrated Ethereal as a second-class Relay chain on ShapeShift.',
    highlights: ['Ethereal chain integration via Relay'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'ink',
    name: 'Ink',
    icon: 'https://assets.relay.link/icons/57073/light.png',
    tagline: 'Feature-flagged chain support',
    description:
      'Added Ink chain support behind a feature flag on ShapeShift.',
    highlights: ['Ink chain support with feature flag'],
    protocols: ['Relay'],
    category: 'evm-l2',
  },
  {
    id: 'monad',
    name: 'Monad',
    icon: 'https://assets.coingecko.com/coins/images/38927/standard/monad.png?1764042736',
    tagline: 'Full implementation — RPC throttling, Tenderly simulations',
    description:
      'Built the full Monad integration at ShapeShift — chain adapter with RPC throttling, multicall fixes, and Tenderly gas-limit simulations for transaction accuracy.',
    highlights: [
      'Full Monad chain implementation',
      'RPC call throttling and multicall fixes',
      'Tenderly simulation gas limits',
    ],
    protocols: [],
    category: 'evm-l2',
  },
  {
    id: 'sei',
    name: 'Sei',
    icon: 'https://assets.coingecko.com/coins/images/28205/small/Sei_Logo_-_Transparent.png',
    tagline: 'EVM chain + deBridge cross-chain swapper',
    description:
      'Integrated Sei EVM chain on ShapeShift alongside the deBridge swapper for both cross-chain and same-chain trading — one of the more complex integrations combining a new chain with a new swapper simultaneously.',
    highlights: [
      'Sei EVM chain integration',
      'deBridge swapper (cross-chain + same-chain)',
    ],
    protocols: ['deBridge'],
    category: 'evm-l2',
  },
];

export interface ChainDecoration {
  chainId: string;
  top: string;
  left?: string;
  right?: string;
  size: number;
  opacity: number;
  rotation: number;
  duration: number;
}

export const CHAIN_DECORATIONS: ChainDecoration[] = [
  // Major chains — larger, slightly more visible
  { chainId: 'ethereum',  top: '6%',  left: '8%',   size: 64,  opacity: 0.18, rotation: 12,  duration: 30 },
  { chainId: 'solana',    top: '12%', right: '10%',  size: 56,  opacity: 0.16, rotation: -8,  duration: 35 },
  { chainId: 'bitcoin',   top: '75%', left: '6%',    size: 58,  opacity: 0.15, rotation: 25,  duration: 28 },
  { chainId: 'thorchain', top: '68%', right: '7%',   size: 52,  opacity: 0.14, rotation: -15, duration: 32 },
  { chainId: 'ton',       top: '30%', left: '4%',    size: 50,  opacity: 0.15, rotation: 45,  duration: 26 },
  { chainId: 'starknet',  top: '85%', left: '20%',   size: 48,  opacity: 0.14, rotation: -30, duration: 38 },
  { chainId: 'sui',       top: '20%', left: '15%',   size: 44,  opacity: 0.13, rotation: 60,  duration: 24 },
  { chainId: 'tron',      top: '42%', right: '5%',   size: 46,  opacity: 0.13, rotation: -45, duration: 34 },

  // L2s / secondary — smaller, subtler
  { chainId: 'arbitrum',  top: '8%',  left: '30%',   size: 38,  opacity: 0.10, rotation: 20,  duration: 29 },
  { chainId: 'optimism',  top: '15%', right: '25%',  size: 36,  opacity: 0.09, rotation: -18, duration: 33 },
  { chainId: 'base',      top: '55%', left: '2%',    size: 38,  opacity: 0.10, rotation: 35,  duration: 27 },
  { chainId: 'polygon',   top: '88%', right: '12%',  size: 40,  opacity: 0.10, rotation: -22, duration: 36 },
  { chainId: 'avalanche', top: '38%', left: '90%',   size: 36,  opacity: 0.09, rotation: 15,  duration: 31 },
  { chainId: 'bnb',       top: '60%', right: '18%',  size: 34,  opacity: 0.09, rotation: -40, duration: 25 },
  { chainId: 'cosmos',    top: '48%', left: '12%',   size: 36,  opacity: 0.10, rotation: 50,  duration: 37 },
  { chainId: 'near',      top: '25%', right: '3%',   size: 38,  opacity: 0.10, rotation: -10, duration: 30 },
  { chainId: 'monad',     top: '78%', right: '25%',  size: 34,  opacity: 0.09, rotation: 28,  duration: 29 },
  { chainId: 'gnosis',    top: '92%', left: '40%',   size: 32,  opacity: 0.08, rotation: -35, duration: 33 },
  { chainId: 'linea',     top: '5%',  left: '50%',   size: 30,  opacity: 0.08, rotation: 42,  duration: 27 },
  { chainId: 'berachain', top: '35%', right: '15%',  size: 34,  opacity: 0.09, rotation: -55, duration: 35 },
  { chainId: 'sei',       top: '65%', left: '25%',   size: 32,  opacity: 0.08, rotation: 18,  duration: 31 },
  { chainId: 'zksync',    top: '82%', left: '8%',    size: 30,  opacity: 0.07, rotation: -25, duration: 34 },
  { chainId: 'scroll',    top: '50%', right: '30%',  size: 28,  opacity: 0.07, rotation: 38,  duration: 28 },
  { chainId: 'blast',     top: '18%', left: '42%',   size: 28,  opacity: 0.07, rotation: -48, duration: 32 },
  { chainId: 'mantle',    top: '70%', left: '40%',   size: 30,  opacity: 0.07, rotation: 22,  duration: 36 },
  { chainId: 'sonic',     top: '3%',  right: '35%',  size: 30,  opacity: 0.08, rotation: -15, duration: 26 },
  { chainId: 'cronos',    top: '58%', left: '35%',   size: 28,  opacity: 0.07, rotation: 55,  duration: 30 },
  { chainId: 'ink',       top: '45%', left: '92%',   size: 26,  opacity: 0.06, rotation: -32, duration: 29 },
];

/** Look up a chain by id */
export const getChainById = (id: string): ChainExperience | undefined =>
  CHAINS.find(c => c.id === id);
