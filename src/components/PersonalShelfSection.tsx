import React from 'react';
import { BookOpen, Minus, Plus, Trash2 } from 'lucide-react';
import { Book, ReadingNote, ReadingProgress } from '../types/library';
import { BookCover } from './BookCover';

interface PersonalShelfSectionProps {
  savedBooks: Book[];
  allBooks: Book[];
  readingProgress: Record<string, ReadingProgress>;
  notes: ReadingNote[];
  monthlyGoal: number;
  onChangeGoal: (goal: number) => void;
  onReadBook: (book: Book, chapterIndex?: number) => void;
  onRemoveSaved: (book: Book) => void;
  onBrowseCatalog: () => void;
}

export const PersonalShelfSection: React.FC<PersonalShelfSectionProps> = ({
  savedBooks,
  allBooks,
  readingProgress,
  notes,
  monthlyGoal,
  onChangeGoal,
  onReadBook,
  onRemoveSaved,
  onBrowseCatalog,
}) => {
  const startedBooks = allBooks.filter(
    (b) => (readingProgress[b.id]?.completedChapters.length ?? 0) > 0
  );
  const completedBooksCount = allBooks.filter(
    (b) => (readingProgress[b.id]?.completedChapters.length ?? 0) >= b.chapters.length
  ).length;
  const totalChaptersRead = Object.values(readingProgress).reduce(
    (sum, item) => sum + item.completedChapters.length,
    0
  );

  const goalPercent = Math.min(100, Math.round((completedBooksCount / monthlyGoal) * 100));

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 space-y-12">
      {/* Rak Saya */}
      <div id="rak-saya" className="rounded-2xl border border-[#E5DDD0] bg-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#EFE9DE]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
              Koleksi Pribadi
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#142621]">
              Rak Buku Saya
            </h2>
          </div>
          <span className="text-xs font-medium text-[#52665E] tabular-nums">
            {savedBooks.length} buku tersimpan
          </span>
        </div>

        {savedBooks.length === 0 ? (
          <div className="py-10 text-center">
            <p className="font-serif text-lg font-medium text-[#142621]">
              Rak pribadi Anda masih kosong
            </p>
            <p className="mt-1.5 text-sm text-[#52665E]">
              Klik ikon penanda pada buku mana saja di katalog untuk menyimpannya di sini.
            </p>
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="mt-4 inline-flex items-center rounded-lg bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0D5D57] transition-colors cursor-pointer"
            >
              Telusuri Katalog
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedBooks.map((book) => {
              const progress = readingProgress[book.id];
              const doneCount = progress?.completedChapters.length ?? 0;
              const pct = Math.round((doneCount / book.chapters.length) * 100);

              return (
                <div
                  key={book.id}
                  className="flex gap-4 rounded-xl border border-[#EFE9DE] bg-[#FAF7F2] p-3.5"
                >
                  <div className="w-20 shrink-0">
                    <BookCover book={book} />
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <p className="text-[11px] font-medium text-[#0F766E] truncate">
                        {book.category}
                      </p>
                      <h3 className="mt-0.5 font-serif text-base font-semibold text-[#142621] line-clamp-2 leading-snug">
                        {book.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#52665E] truncate">{book.author}</p>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#52665E] tabular-nums">
                        <span>{pct > 0 ? `${pct}% selesai` : 'Belum dibaca'}</span>
                        <span>{book.chapters.length} bab</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onReadBook(book, progress?.chapterIndex ?? 0)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0F766E] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0D5D57] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                          {pct > 0 ? 'Lanjutkan' : 'Baca'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveSaved(book)}
                          aria-label={`Keluarkan ${book.title} dari Rak Saya`}
                          className="rounded-lg border border-[#D8CFC0] bg-white p-1.5 text-[#52665E] hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Statistik & Target Membaca */}
      <div
        id="statistik"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl bg-[#1E3A5F] p-6 sm:p-8 text-white shadow-md"
      >
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FCD34D]">
              Jejak Literasi
            </p>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-white">
              Statistik &amp; Target Membaca
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#CBD5E1]">
              Progres membaca dan catatan pribadi Anda tersimpan otomatis di peramban ini agar Anda bisa melanjutkan kapan saja.
            </p>
          </div>

          {/* Goal Adjuster */}
          <div className="mt-6 rounded-xl bg-white/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#CBD5E1]">Target Buku Bulan Ini</p>
                <p className="mt-0.5 font-serif text-xl font-semibold tabular-nums">
                  {completedBooksCount} / {monthlyGoal} buku selesai
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onChangeGoal(Math.max(1, monthlyGoal - 1))}
                  aria-label="Kurangi target bulanan"
                  className="rounded-lg bg-white/15 p-2 hover:bg-white/25 transition-colors cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onChangeGoal(Math.min(20, monthlyGoal + 1))}
                  aria-label="Tambah target bulanan"
                  className="rounded-lg bg-white/15 p-2 hover:bg-white/25 transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#F59E0B] transition-all duration-300"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3 Numeric Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
          <div className="rounded-xl bg-white/10 p-5 flex flex-col justify-between">
            <span className="text-xs font-medium text-[#CBD5E1]">Buku Sedang Dibaca</span>
            <p className="mt-4 font-serif text-4xl font-semibold text-[#FCD34D] tabular-nums">
              {startedBooks.length}
            </p>
            <p className="mt-2 text-xs text-[#E2E8F0]">Judul aktif dibuka</p>
          </div>

          <div className="rounded-xl bg-white/10 p-5 flex flex-col justify-between">
            <span className="text-xs font-medium text-[#CBD5E1]">Total Bab Dibaca</span>
            <p className="mt-4 font-serif text-4xl font-semibold text-[#6EE7B7] tabular-nums">
              {totalChaptersRead}
            </p>
            <p className="mt-2 text-xs text-[#E2E8F0]">Bab selesai dijelajahi</p>
          </div>

          <div className="rounded-xl bg-white/10 p-5 flex flex-col justify-between">
            <span className="text-xs font-medium text-[#CBD5E1]">Catatan Tersimpan</span>
            <p className="mt-4 font-serif text-4xl font-semibold text-[#FDBA74] tabular-nums">
              {notes.length}
            </p>
            <p className="mt-2 text-xs text-[#E2E8F0]">Kutipan &amp; refleksi pribadi</p>
          </div>
        </div>
      </div>
    </section>
  );
};
