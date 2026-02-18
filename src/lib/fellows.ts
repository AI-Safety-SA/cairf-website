import fellowsData from '../assets/fellows/fellows.json';

export interface FellowRecord {
  id: string;
  name: string;
  bio?: string;
  researchInterests?: string;
  projectProposal?: string;
  mentors?: string;
  primaryImage?: string;
  source: {
    slideNumbers: number[];
    rawSlidePaths: string[];
  };
}

export function loadFellows(): FellowRecord[] {
  return fellowsData as FellowRecord[];
}
