import fellowsData from '../assets/fellows/fellows.json';

export interface FellowRecord {
  id: string;
  name: string;
  bio?: string;
  researchInterests?: string;
  projectProposal?: string;
  mentors?: string;
  researchManager?: string;
  primaryImage?: string;
}

export function loadFellows(): FellowRecord[] {
  return fellowsData as FellowRecord[];
}
