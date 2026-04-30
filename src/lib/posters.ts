import { loadFellows, type FellowRecord } from './fellows';
import { loadMentors } from './mentors';

export interface ProfileLink {
  name: string;
  url?: string;
}

export interface EnrichedPoster {
  pdfPath: string;
  thumbFile: string;
  aspectRatio: number;
  fellows: FellowRecord[];
  mentors: ProfileLink[];
  researchManager?: ProfileLink;
}

interface PosterRecord {
  pdfPath: string;
  aspectRatio: number;
  fellowIds: readonly string[];
  researchManager?: ProfileLink;
}

const POSTER_DATA = [
  { pdfPath: '/posters/akash.pdf',        aspectRatio: 2160 / 1804, fellowIds: ['akash-kundu'] },
  { pdfPath: '/posters/bhavyesh.pdf',     aspectRatio: 960  / 540,  fellowIds: ['bhavyesh-sajja'] },
  { pdfPath: '/posters/joseph-oscar.pdf', aspectRatio: 595  / 842,  fellowIds: ['joseph-low', 'oscar-duys'] },
  { pdfPath: '/posters/mariana.pdf',      aspectRatio: 864  / 1296, fellowIds: ['mariana-meireles'] },
  { pdfPath: '/posters/omer.pdf',         aspectRatio: 2384 / 3370, fellowIds: ['omer-kamal-ebead'] },
  { pdfPath: '/posters/pramod.pdf',       aspectRatio: 2384 / 3370, fellowIds: ['pramod-kaushik'] },
  { pdfPath: '/posters/qi.pdf',           aspectRatio: 2384 / 3370, fellowIds: ['qi-guo'] },
  { pdfPath: '/posters/van.pdf',          aspectRatio: 2592 / 1728, fellowIds: ['van-quynh-thi-truong'] },
  { pdfPath: '/posters/yves.pdf',         aspectRatio: 2380 / 3368, fellowIds: ['yves-bicker'] },
] as const satisfies readonly PosterRecord[];

const MENTOR_NAME_ALIASES = new Map<string, string>([
  ['Joel Leibo', 'Joel Z. Leibo'],
]);

const EXTRA_MENTOR_PROFILES = new Map<string, string>([
  ['David Guzman Piedrahita', 'https://ml.inf.ethz.ch/people/person-detail.MzEyMzc0.TGlzdC8xODA3LC0xNzg2MjE4NDI4.html'],
  ['Emanuel Tewolde', 'https://emanueltewolde.com/'],
]);

function splitMentorNames(mentors?: string): string[] {
  return (mentors ?? '')
    .split('&')
    .map((name) => name.trim())
    .filter(Boolean);
}

function buildMentorProfileMap(): Map<string, string> {
  const mentorProfileMap = new Map<string, string>();

  for (const mentor of loadMentors()) {
    const url = mentor.website ?? mentor.academic ?? mentor.linkedin ?? mentor.twitter;
    if (url) mentorProfileMap.set(mentor.name, url);
  }

  for (const [name, url] of EXTRA_MENTOR_PROFILES) {
    mentorProfileMap.set(name, url);
  }

  return mentorProfileMap;
}

function resolveMentorProfiles(fellows: FellowRecord[], mentorProfileMap: Map<string, string>): ProfileLink[] {
  const profiles = new Map<string, ProfileLink>();

  for (const fellow of fellows) {
    for (const rawName of splitMentorNames(fellow.mentors)) {
      const canonicalName = MENTOR_NAME_ALIASES.get(rawName) ?? rawName;
      const url = mentorProfileMap.get(canonicalName) ?? mentorProfileMap.get(rawName);

      if (!profiles.has(rawName)) {
        profiles.set(rawName, url ? { name: rawName, url } : { name: rawName });
      }
    }
  }

  return [...profiles.values()];
}

export function loadPosters(): EnrichedPoster[] {
  const fellows = loadFellows();
  const fellowMap = new Map(fellows.map(f => [f.id, f]));
  const mentorProfileMap = buildMentorProfileMap();

  return POSTER_DATA.map((poster) => {
    const posterFellows = poster.fellowIds.map((id) => fellowMap.get(id)!).filter(Boolean);

    return {
      pdfPath: poster.pdfPath,
      thumbFile: poster.pdfPath.split('/').pop()!.replace('.pdf', '.png'),
      aspectRatio: poster.aspectRatio,
      fellows: posterFellows,
      mentors: resolveMentorProfiles(posterFellows, mentorProfileMap),
      researchManager: poster.researchManager,
    };
  });
}
