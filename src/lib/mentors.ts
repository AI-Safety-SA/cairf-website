import mentorsData from '../assets/mentors/mentors.json';

export interface MentorRecord {
  name: string;
  title: string;
  website?: string;
  linkedin?: string;
  academic?: string;
  twitter?: string;
  image?: string;
  order: number;
}

export function loadMentors(): MentorRecord[] {
  return mentorsData as MentorRecord[];
}
