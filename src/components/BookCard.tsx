import React from 'react';
import { Bookmark, BookmarkCheck, BookOpen, Star } from 'lucide-react';
import { Book, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: Book;
  isSaved: boolean;
  progress?: ReadingProgress;
  onRead: (book: Book, chapterIndex?: number) => void;
  onToggleSave: (book: Book) => void;
  onOpenDetail: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isSaved,
  progress,
  onRead,
  onToggleSave,
  onOpenDetail,
}) => {
  const completedCount = progress?.completedChapters.length ?? 0;
  const totalChapters = book.chapters.length;
  const percent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#E5DDD0] bg-white p-4 transition-shadow duration-200 hover:shadow-md">
      <div>
        {/* Clickable Cover */}
        <button
          type="button"
          onClick={() => onOpenDetail(book)}
          className="block w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] cursor-pointer"
          aria-label={`Lihat detail ${book.title}`}
        >
          <BookCover book={book} />
        </button>

        {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
        <div className="mt-3.5 flex items-center justify-between gap-2 text-xs text-[#52665E]">
          <span className="truncate font-medium text-[#0F766E]">{book.category}</span>
          <span className="inline-flex items-center gap-1 shrink-0 font-mono tabular-nums text-[#B45309]">
            <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
            {book.rating.toFixed(1)}
          </span>
        </div>

        {/* Title & Author */}
        <button
          type="button"
          onClick={() => onOpenDetail(book)}
          className="mt-1.5 block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:underline"
        >
          <h3 className="font-serif text-lg font-semibold leading-snug text-[#142621] group-hover:text-[#0F766E] transition-colors line-clamp-2">
            {book.title}
          </h3>
        </button>
        <p className="mt-1 text-sm text-[#3E524B] line-clamp-1">{book.author}</p>

        {/* Subtle Secondary Info */}
        <p className="mt-1.5 text-xs text-[#6B7D75] tabular-nums">
          {book.year} · {book.pages} hlm · {book.chapters.length} bab
        </p>

        {/* Optional Reading Progress Bar */}
        {percent > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#0F766E] tabular-nums">
              <span>Progres baca</span>
              <span>{percent}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#E6F4F1]">
              <div
                className="h-full rounded-full bg-[#0F766E] transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="mt-4 pt-3 border-t border-[#F0EAE0] flex items-center gap-2">
        <button
          type="button"
          onClick={() => onRead(book, progress?.chapterIndex ?? 0)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0F766E] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0D5D57] transition-colors cursor-pointer whitespace-nowrap"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          {percent > 0 ? 'Lanjut Baca' : 'Baca'}
        </button>

        <button
          type="button"
          onClick={() => onToggleSave(book)}
          aria-label={isSaved ? `Hapus ${book.title} dari Rak Saya` : `Simpan ${book.title} ke Rak Saya`}
          title={isSaved ? 'Tersimpan di Rak Saya' : 'Simpan ke Rak Saya'}
          className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer shrink-0 ${
            isSaved
              ? 'border-[#D97706] bg-[#FFFBEB] text-[#B45309]'
              : 'border-[#D8CFC0] bg-white text-[#3E524B] hover:border-[#0F766E] hover:text-[#0F766E]'
          }`}
        >
          {isSaved ? (
            <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Bookmark className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </article>
  );
};
