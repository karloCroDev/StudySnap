// Models
import { type Note } from '@/models/note';

// ranking = sqrt(L) × 2.5 + U×5 + T/10 +R
export const rankNotes = (notes: Note[]) => {
  return notes
    .map((note) => {
      const daysSinceCreated =
        (Date.now() - new Date(note.date_created).getTime()) /
        (1000 * 60 * 60 * 24);
      const timeScore = 1 / (daysSinceCreated + 1);
      const randomFactor = Math.random() * 2.5;

      const score =
        Math.sqrt(note.likes) * 2.5 +
        (note.liked ? 5 : 0) +
        timeScore / 10 +
        randomFactor;

      return { ...note, score };
    })
    .sort((a, b) => b.score - a.score);
};
