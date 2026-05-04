import postersData from '../assets/Posters/posters.json';
import { loadFellows, type FellowRecord } from './fellows';

export interface ProfileLink {
  name: string;
  url?: string;
}

export interface PosterDataRecord {
  id: string;
  pdfPath: string;
  thumbFile: string;
  aspectRatio: number;
  fellowIds: string[];
  title: string;
  description?: string;
  mentors: ProfileLink[];
  researchManagers: ProfileLink[];
}

export interface EnrichedPoster {
  id: string;
  pdfPath: string;
  thumbFile: string;
  aspectRatio: number;
  title: string;
  description?: string;
  fellows: FellowRecord[];
  mentors: ProfileLink[];
  researchManagers: ProfileLink[];
}

const POSTER_DATA = postersData as PosterDataRecord[];

export function loadPosters(): EnrichedPoster[] {
  const fellows = loadFellows();
  const fellowMap = new Map(fellows.map(f => [f.id, f]));

  return POSTER_DATA.map((poster) => {
    const posterFellows = poster.fellowIds.map((id) => {
      const fellow = fellowMap.get(id);
      if (!fellow) throw new Error(`Poster "${poster.id}" references missing fellow id "${id}"`);
      return fellow;
    });

    return {
      id: poster.id,
      pdfPath: poster.pdfPath,
      thumbFile: poster.thumbFile,
      aspectRatio: poster.aspectRatio,
      title: poster.title,
      description: poster.description,
      fellows: posterFellows,
      mentors: poster.mentors,
      researchManagers: poster.researchManagers,
    };
  });
}
