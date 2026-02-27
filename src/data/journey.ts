/**
 * @fileoverview Journey data - 0xm4king's career path
 */

import type { JourneyMilestone, StorySection } from '../types';
import { COLORS } from '../constants/config';

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'work-webexpr',
    title: 'Full-stack Developer',
    location: 'Paris, France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    startDate: '2014',
    endDate: '2016',
    description: 'First professional role at WebexpR/Wholehelp. Integrated 100+ CMS templates, built ERP interfaces (EBP ↔ PrestaShop), set up Active Directory, and developed mobile apps with Ionic/Angular. Where I learned that real-world code is messy — and that\'s okay.',
    type: 'work',
    technologies: ['WordPress', 'PrestaShop', 'Ionic', 'Angular', 'PHP', 'SEO'],
    color: COLORS.MARKERS.work,
  },
  {
    id: 'work-cognix',
    title: 'Frontend Developer',
    location: 'Rennes, France',
    coordinates: { lat: 48.1173, lng: -1.6778 },
    startDate: '2016',
    endDate: '2019',
    description: 'Integrated 100+ websites. Built and maintained an internal CMS. Experimented with Vue, Ionic, React, and Electron. Created an internal CLI tool in Node.js to boost team productivity. Three years of shipping fast and learning faster.',
    type: 'work',
    technologies: ['Vue.js', 'React', 'Ionic', 'Electron', 'AdonisJS', 'Node.js', 'SQLite', 'WebSockets'],
    color: COLORS.MARKERS.work,
  },
  {
    id: 'education-supinfo',
    title: 'M.Sc. Computer Programming',
    location: 'SUPINFO International University',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    startDate: '2017',
    endDate: '2019',
    description: 'Completed M.Sc.1 and M.Sc.2 in Computer Programming while working. Balanced theory with hands-on experience — the best way to learn.',
    type: 'education',
    technologies: ['Algorithms', 'Data Structures', 'Software Engineering'],
    color: COLORS.MARKERS.education,
  },
  {
    id: 'project-lastone',
    title: 'Full Stack Volunteer',
    location: 'Paris, France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    startDate: '2017',
    endDate: '2019',
    description: 'Built gaming community platforms at LastOne. Sysadmin (Debian, ISPConfig, Node, Apache), WordPress modules for esports (Acer Predator, Avermedia, Shadow), SSR blogs with React + Apollo, CI/CD with GitLab. Where I learned to ship fast for passionate communities.',
    type: 'project',
    technologies: ['React', 'Apollo', 'GraphQL', 'Strapi', 'Prisma', 'WordPress', 'CI/CD', 'SEO'],
    url: 'https://github.com/neomaking',
    color: COLORS.MARKERS.project,
  },
  {
    id: 'work-prestashop',
    title: 'Core Front-end Maintainer',
    location: 'Paris, France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    startDate: '2019',
    endDate: '2023',
    description: 'Open source maintainer for PrestaShop\'s back-office. Led the TypeScript migration, built with Vue.js and Nuxt. Spoke at events, gave demos in English, reviewed hundreds of PRs. Three years of shaping an e-commerce platform used by 300k+ merchants.',
    type: 'work',
    technologies: ['Vue.js', 'Nuxt', 'TypeScript', 'CSS/HTML', 'Open Source'],
    url: 'https://github.com/PrestaShop/PrestaShop',
    color: COLORS.MARKERS.work,
  },
  {
    id: 'project-splizi',
    title: 'Co-founder',
    location: 'Paris, France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    startDate: '2019',
    endDate: '2021',
    description: 'Built SPLIZI from scratch. React Native (Expo), TypeScript, Apollo Client, Prisma 2. Learned that building a product is 10% code, 90% everything else.',
    type: 'project',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Apollo Client', 'Prisma 2', 'ESLint', 'Prettier'],
    color: COLORS.MARKERS.project,
  },
  {
    id: 'project-nutripet',
    title: 'Co-founder',
    location: 'Remote',
    coordinates: { lat: 49.4178, lng: 2.8261 },
    startDate: '2020',
    endDate: '2021',
    description: 'Co-founded Nutripet. Another startup adventure — different domain, same passion for building products that solve real problems.',
    type: 'project',
    technologies: ['React', 'Node.js'],
    color: COLORS.MARKERS.project,
  },
  {
    id: 'work-lydia',
    title: 'Frontend Developer',
    location: 'Remote',
    coordinates: { lat: 49.4178, lng: 2.8261 },
    startDate: '2023',
    endDate: '2023',
    description: 'Added 300+ automated tests. Refactored apps from chaos to documented architecture. Built a UIKit on Chakra with Storybook. Migrated a monolith to monorepo. Upgraded everything from Node 10-12 to Node 18+. Eight months of making things better.',
    type: 'work',
    technologies: ['React', 'TypeScript', 'Chakra UI', 'Storybook', 'Jest', 'Monorepo', 'Node.js'],
    url: 'https://lydia-app.com',
    color: COLORS.MARKERS.work,
  },
  {
    id: 'work-cedelabs',
    title: 'Lead Fullstack',
    location: 'Remote',
    coordinates: { lat: 49.4178, lng: 2.8261 },
    startDate: '2023',
    endDate: '2024',
    description: 'Led fullstack development at Cede Labs. First lead role — owning architecture decisions, mentoring developers, shipping features. Crypto/DeFi space.',
    type: 'work',
    technologies: ['React', 'TypeScript', 'Node.js', 'Web3'],
    url: 'https://cede.store',
    color: COLORS.MARKERS.work,
  },
  {
    id: 'current',
    title: 'Frontend Engineer',
    location: 'Remote — ShapeShift',
    coordinates: { lat: 49.4178, lng: 2.8261 },
    startDate: '2024',
    endDate: null,
    description: 'Building the future of self-custody DeFi at ShapeShift. Open source, decentralized, user-owned. The journey continues...',
    type: 'current',
    technologies: ['React', 'TypeScript', 'Web3', 'DeFi', 'Open Source'],
    url: 'https://shapeshift.com',
    color: COLORS.MARKERS.current,
  },
];

export const STORY_SECTIONS: StorySection[] = [
  {
    id: 'intro',
    title: 'The Journey',
    subtitle: '10+ years of building for the web',
    milestoneIds: [],
  },
  {
    id: 'beginnings',
    title: 'First Steps',
    subtitle: 'Learning the craft',
    milestoneIds: ['work-webexpr', 'work-cognix'],
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: 'Theory meets practice',
    milestoneIds: ['education-supinfo'],
  },
  {
    id: 'opensource',
    title: 'Open Source',
    subtitle: 'Giving back',
    milestoneIds: ['project-lastone', 'work-prestashop'],
  },
  {
    id: 'startups',
    title: 'Startups',
    subtitle: 'Building from scratch',
    milestoneIds: ['project-splizi', 'project-nutripet'],
  },
  {
    id: 'growth',
    title: 'Growth',
    subtitle: 'Scaling up',
    milestoneIds: ['work-lydia', 'work-cedelabs'],
  },
  {
    id: 'present',
    title: 'Present',
    subtitle: 'DeFi & Web3',
    milestoneIds: ['current'],
  },
];

export const getMilestoneById = (id: string): JourneyMilestone | undefined => {
  return JOURNEY_MILESTONES.find((m) => m.id === id);
};

export const getMilestonesForSection = (sectionId: string): JourneyMilestone[] => {
  const section = STORY_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return [];
  
  return section.milestoneIds
    .map(getMilestoneById)
    .filter((m): m is JourneyMilestone => m !== undefined);
};
