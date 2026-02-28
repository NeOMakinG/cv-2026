/**
 * The Blockchain - 0xm4king's Career Chain
 */

import type { Block, Chain, Transaction } from '../types/blockchain';

// Simple hash generator for visual effect
const generateHash = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hex}${'abcdef0123456789'.split('').sort(() => Math.random() - 0.5).join('').slice(0, 56)}`;
};

const createTransactions = (skills: string[]): Transaction[] => {
  return skills.map((skill, i) => ({
    id: `tx-${i}`,
    type: 'tech' as const,
    value: skill,
    signature: `0x${Math.random().toString(16).slice(2, 10)}`,
  }));
};

export const GENESIS_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';

export const BLOCKS: Block[] = [
  {
    id: 'genesis',
    index: 0,
    timestamp: { start: '1995', end: null },
    title: 'Genesis Block',
    company: 'France',
    location: 'France',
    type: 'origin',
    description: 'Chain initialized. First lines of code written. The journey begins.',
    transactions: createTransactions(['Curiosity', 'HTML', 'CSS', 'First Website']),
    hash: generateHash('genesis-compiegne-1995'),
    previousHash: GENESIS_HASH,
    nonce: 0,
    confirmed: true,
  },
  {
    id: 'block-1',
    index: 1,
    timestamp: { start: 'Aug 2014', end: 'Jul 2016' },
    title: 'Full-stack Developer',
    company: 'WebexpR / Wholehelp',
    location: 'Compiègne',
    type: 'work',
    description: 'First professional block mined. CMS integrations, ERP interfaces, mobile apps. Where production code met reality.',
    transactions: createTransactions(['WordPress', 'PrestaShop', 'Ionic', 'Angular', 'PHP', 'ERP', 'AD/GPO']),
    hash: generateHash('webexpr-2014-2016'),
    previousHash: generateHash('genesis-compiegne-1995'),
    nonce: 42,
    confirmed: true,
  },
  {
    id: 'block-2',
    index: 2,
    timestamp: { start: 'Aug 2016', end: 'Oct 2019' },
    title: 'Frontend Developer',
    company: 'Cognix Systems',
    location: 'Rennes',
    type: 'work',
    description: '100+ websites integrated. Internal CMS R&D. Built CLI tools for team productivity. Three years of shipping fast.',
    transactions: createTransactions(['Vue.js', 'React', 'Ionic', 'Electron', 'AdonisJS', 'Node.js', 'SQLite', 'WebSockets']),
    hash: generateHash('cognix-2016-2019'),
    previousHash: generateHash('webexpr-2014-2016'),
    nonce: 1337,
    confirmed: true,
  },
  {
    id: 'block-3',
    index: 3,
    timestamp: { start: '2017', end: '2019' },
    title: 'M.Sc. Computer Programming',
    company: 'SUPINFO International University',
    location: 'Paris',
    type: 'education',
    description: 'Parallel chain merge. Theory meets practice. Algorithms, data structures, software engineering.',
    transactions: createTransactions(['Algorithms', 'Data Structures', 'Software Engineering', 'M.Sc.1', 'M.Sc.2']),
    hash: generateHash('supinfo-2017-2019'),
    previousHash: generateHash('cognix-2016-2019'),
    nonce: 2048,
    confirmed: true,
  },
  {
    id: 'block-4',
    index: 4,
    timestamp: { start: 'Jun 2017', end: 'Aug 2019' },
    title: 'Full Stack Volunteer',
    company: 'LastOne',
    location: 'Paris',
    type: 'project',
    description: 'Gaming community platforms. Sysadmin, WordPress modules for esports, SSR blogs, CI/CD pipelines.',
    transactions: createTransactions(['React', 'Apollo', 'GraphQL', 'Strapi', 'Prisma', 'WordPress', 'CI/CD', 'DevOps']),
    hash: generateHash('lastone-2017-2019'),
    previousHash: generateHash('supinfo-2017-2019'),
    nonce: 404,
    confirmed: true,
  },
  {
    id: 'block-5',
    index: 5,
    timestamp: { start: 'Nov 2019', end: 'Jan 2023' },
    title: 'Core Front-end Maintainer',
    company: 'PrestaShop',
    location: 'Paris',
    type: 'work',
    description: 'Open source maintainer. Led TypeScript migration. Vue.js, Nuxt. 300k+ merchants impacted. Events, demos, PRs.',
    transactions: createTransactions(['Vue.js', 'Nuxt', 'TypeScript', 'Open Source', 'Code Review', 'Public Speaking']),
    hash: generateHash('prestashop-2019-2023'),
    previousHash: generateHash('lastone-2017-2019'),
    nonce: 8080,
    confirmed: true,
  },
  {
    id: 'block-6',
    index: 6,
    timestamp: { start: 'Apr 2019', end: 'Jun 2021' },
    title: 'Co-founder',
    company: 'SPLIZI',
    location: 'Paris',
    type: 'project',
    description: 'Another startup fork. React Native, Expo, TypeScript, Apollo Client, Prisma 2. Building products from zero.',
    transactions: createTransactions(['React Native', 'Expo', 'TypeScript', 'Apollo Client', 'Prisma 2', 'Startup']),
    hash: generateHash('splizi-2019-2021'),
    previousHash: generateHash('prestashop-2019-2023'),
    nonce: 9999,
    confirmed: true,
  },
  {
    id: 'block-7',
    index: 7,
    timestamp: { start: 'May 2020', end: 'Nov 2021' },
    title: 'Co-founder',
    company: 'Nutripet',
    location: 'Remote',
    type: 'project',
    description: 'Startup block. Different domain, same passion for solving real problems.',
    transactions: createTransactions(['React', 'Node.js', 'Product', 'Entrepreneurship']),
    hash: generateHash('nutripet-2020-2021'),
    previousHash: generateHash('splizi-2019-2021'),
    nonce: 256,
    confirmed: true,
  },
  {
    id: 'block-8',
    index: 8,
    timestamp: { start: 'Feb 2023', end: 'Sep 2023' },
    title: 'Frontend Developer',
    company: 'Lydia',
    location: 'Remote',
    type: 'work',
    description: '300+ tests added. Architecture refactored. UIKit on Chakra. Monolith → Monorepo. Node 10 → 18+.',
    transactions: createTransactions(['React', 'TypeScript', 'Chakra UI', 'Storybook', 'Jest', 'Monorepo', 'Testing']),
    hash: generateHash('lydia-2023'),
    previousHash: generateHash('nutripet-2020-2021'),
    nonce: 512,
    confirmed: true,
  },
  {
    id: 'block-9',
    index: 9,
    timestamp: { start: 'Sep 2023', end: 'May 2024' },
    title: 'Lead Fullstack',
    company: 'Cede Labs',
    location: 'Remote',
    type: 'work',
    description: 'First lead block. Architecture ownership, team mentoring. Crypto/DeFi space entered.',
    transactions: createTransactions(['React', 'TypeScript', 'Node.js', 'Web3', 'DeFi', 'Leadership', 'Architecture']),
    hash: generateHash('cedelabs-2023-2024'),
    previousHash: generateHash('lydia-2023'),
    nonce: 1024,
    confirmed: true,
  },
  {
    id: 'block-10',
    index: 10,
    timestamp: { start: 'Jan 2024', end: 'Dec 2024' },
    title: 'Co-founder',
    company: 'Daily Meme Corp',
    location: 'Remote',
    type: 'project',
    description: 'Memecoin launchpad on Abstract. Tech, design, and marketing. Building at the intersection of crypto culture and product.',
    transactions: createTransactions(['React', 'TypeScript', 'Web3', 'Abstract', 'Design', 'Marketing', 'Memecoin']),
    hash: generateHash('dailymemecorp-2024'),
    previousHash: generateHash('cedelabs-2023-2024'),
    nonce: 4269,
    confirmed: true,
    link: 'https://x.com/dailymemecorp',
  },
  {
    id: 'block-current',
    index: 11,
    timestamp: { start: 'May 2024', end: null },
    title: 'Engineer',
    company: 'ShapeShift',
    location: 'Remote',
    type: 'current',
    description: '590+ PRs merged. 20+ chain integrations. Built the embeddable swap widget, perpetuals trading, limit orders, and notification system. Migrated CRA to Vite. Shipped Jupiter, Relay, deBridge, Stonfi swappers. Open source self-custody DeFi.',
    transactions: createTransactions(['React', 'TypeScript', 'Vite', 'XState', 'Web3', 'DeFi', 'Solana', 'Thorchain', 'Multi-Chain', 'Open Source']),
    hash: '0x????????????????????????????????????????????????????????????????',
    previousHash: generateHash('dailymemecorp-2024'),
    nonce: 0, // Still mining
    confirmed: false,
  },
];

export const CAREER_CHAIN: Chain = {
  blocks: BLOCKS,
  difficulty: 4,
  totalBlocks: BLOCKS.length,
};

export const getBlockByIndex = (index: number): Block | undefined => {
  return BLOCKS.find(b => b.index === index);
};

export const getConfirmedBlocks = (): Block[] => {
  return BLOCKS.filter(b => b.confirmed);
};

export const getCurrentBlock = (): Block | undefined => {
  return BLOCKS.find(b => !b.confirmed);
};
