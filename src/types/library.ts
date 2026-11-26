export type BookCategory =
  | 'Semua'
  | 'Sastra & Fiksi'
  | 'Sains & Alam'
  | 'Sejarah & Budaya'
  | 'Desain & Arsitektur'
  | 'Filosofi & Hidup';

export type ReaderTheme = 'warm' | 'light' | 'dark';

export type ReaderFontSize = 'sm' | 'md' | 'lg';

export interface Chapter {
  id: string;
  number: string;
  title: string;
  readMinutes: number;
  paragraphs: string[];
  pullQuote?: string;
}

export interface CoverTheme {
  bg: string;
  accent: string;
  text: string;
  motif: 'arch' | 'waves' | 'grid' | 'botanical' | 'orbit';
}

export interface Book {
  id: string;
  accessionNumber: string;
  title: string;
  subtitle: string;
  author: string;
  category: Exclude<BookCategory, 'Semua'>;
  year: number;
  pages: number;
  rating: number;
  reviewCount: number;
  language: string;
  publisher: string;
  isbn: string;
  synopsis: string;
  coverImage?: string;
  coverTheme: CoverTheme;
  featuredCollection?: 'pilihan-pekan-ini' | 'arsip-nusantara' | 'wawasan-baru';
  chapters: Chapter[];
}

export interface ReadingNote {
  id: string;
  bookId: string;
  chapterTitle: string;
  content: string;
  createdAt: string;
}

export interface ReadingProgress {
  chapterIndex: number;
  completedChapters: string[];
  lastReadAt: string;
}
