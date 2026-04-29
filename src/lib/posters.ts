import { loadFellows, type FellowRecord } from './fellows';

export interface EnrichedPoster {
  pdfPath: string;
  thumbFile: string;
  aspectRatio: number;
  fellows: FellowRecord[];
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
] as const;

export function loadPosters(): EnrichedPoster[] {
  const fellows = loadFellows();
  const fellowMap = new Map(fellows.map(f => [f.id, f]));
  return POSTER_DATA.map(p => ({
    pdfPath: p.pdfPath,
    thumbFile: p.pdfPath.split('/').pop()!.replace('.pdf', '.png'),
    aspectRatio: p.aspectRatio,
    fellows: (p.fellowIds as readonly string[]).map(id => fellowMap.get(id)!).filter(Boolean),
  }));
}
