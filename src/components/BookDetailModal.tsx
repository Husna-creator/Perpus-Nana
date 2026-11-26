import React, { useEffect } from 'react';
import { Bookmark, BookmarkCheck, BookOpen, Star, X } from 'lucide-react';
import { Book, ReadingNote, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  isSaved: boolean;
  progress?: ReadingProgress;
  notes: ReadingNote[];
  onClose: () => void;
  onReadChapter: (book: Book, chapterIndex: number) => void;
  onToggleSave: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isSaved,
  progress,
  notes,
  onClose,
  onReadChapter,
  onToggleSave,
}) => {
  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const bookNotes = notes.filter((n) => n.bookId === book.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-book-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2420]/65 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-[#FAF7F2] shadow-2xl border border-[#E5DDD0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5DDD0] bg-[#FAF7F2]/95 px-6 py-4 backdrop-blur-md">
          <span className="font-mono text-xs text-[#52665E] tabular-nums">
            {book.accessionNumber} · {book.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail buku"
            className="rounded-lg p-2 text-[#3E524B] hover:bg-[#EFE9DE] hover:text-[#142621] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Header Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
            <div className="md:col-span-4 max-w-[240px] mx-auto md:max-w-none w-full">
              <BookCover book={book} />
            </div>

            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#B45309] tabular-nums">
                  <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
                  <span>
                    {book.rating.toFixed(1)} ({book.reviewCount} ulasan pembaca)
                  </span>
                </div>

                <h2
                  id="detail-book-title"
                  className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#142621]"
                >
                  {book.title}
                </h2>
                <p className="mt-1.5 text-base font-medium text-[#0F766E]">{book.subtitle}</p>
                <p className="mt-1 text-sm text-[#3E524B]">Ditulis oleh {book.author}</p>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#2C3E38]">
                  {book.synopsis}
                </p>

                {/* Accession Metadata Definition List */}
                <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-[#E5DDD0] py-4 text-xs">
                  <div>
                    <dt className="text-[#6B7D75]">Penerbit</dt>
                    <dd className="mt-0.5 font-semibold text-[#142621]">{book.publisher}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7D75]">Tahun Terbit</dt>
                    <dd className="mt-0.5 font-semibold text-[#142621] tabular-nums">{book.year}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7D75]">Ketebalan</dt>
                    <dd className="mt-0.5 font-semibold text-[#142621] tabular-nums">
                      {book.pages} halaman
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7D75]">ISBN</dt>
                    <dd className="mt-0.5 font-mono font-medium text-[#142621] tabular-nums">
                      {book.isbn}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onReadChapter(book, progress?.chapterIndex ?? 0)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0D5D57] transition-colors cursor-pointer"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {progress && progress.completedChapters.length > 0
                    ? 'Lanjutkan Membaca'
                    : 'Baca Sekarang'}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleSave(book)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                    isSaved
                      ? 'border-[#D97706] bg-[#FFFBEB] text-[#B45309]'
                      : 'border-[#D8CFC0] bg-white text-[#142621] hover:border-[#0F766E]'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                      Tersimpan di Rak Saya
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" aria-hidden="true" />
                      Simpan ke Rak
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Clickable Table of Contents */}
          <div className="mt-8">
            <h3 className="font-serif text-lg font-semibold text-[#142621]">
              Daftar Isi ({book.chapters.length} Bab)
            </h3>
            <div className="mt-3 divide-y divide-[#E5DDD0] rounded-xl border border-[#E5DDD0] bg-white">
              {book.chapters.map((chapter, idx) => {
                const isDone = progress?.completedChapters.includes(chapter.id);
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => onReadChapter(book, idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="font-mono text-xs font-semibold text-[#0F766E] tabular-nums shrink-0">
                        {chapter.number}
                      </span>
                      <span className="text-sm font-medium text-[#142621] truncate">
                        {chapter.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-xs tabular-nums">
                      {isDone && (
                        <span className="font-medium text-[#0F766E]">Selesai dibaca</span>
                      )}
                      <span className="text-[#6B7D75]">{chapter.readMinutes} mnt</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Saved Notes for this Book */}
          {bookNotes.length > 0 && (
            <div className="mt-7">
              <h3 className="font-serif text-lg font-semibold text-[#142621]">
                Catatan Membaca Anda ({bookNotes.length})
              </h3>
              <div className="mt-3 space-y-2.5">
                {bookNotes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-xl border border-[#E5DDD0] bg-white px-4 py-3 text-sm"
                  >
                    <p className="text-xs font-medium text-[#0F766E]">
                      {note.chapterTitle} · {note.createdAt}
                    </p>
                    <p className="mt-1 text-[#2C3E38] leading-relaxed">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
