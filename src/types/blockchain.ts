/**
 * Blockchain CV Types
 */

export interface Block {
  id: string;
  index: number;
  timestamp: {
    start: string;
    end: string | null; // null = present/ongoing
  };
  title: string;
  company: string;
  location: string;
  type: 'origin' | 'education' | 'work' | 'project' | 'current';
  description: string;
  transactions: Transaction[]; // skills/technologies
  hash: string;
  previousHash: string;
  nonce: number;
  confirmed: boolean;
}

export interface Transaction {
  id: string;
  type: 'skill' | 'achievement' | 'tech';
  value: string;
  signature?: string;
}

export interface Chain {
  blocks: Block[];
  difficulty: number;
  totalBlocks: number;
}
