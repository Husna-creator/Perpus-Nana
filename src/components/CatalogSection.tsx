import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Book, BookCategory, ReadingProgress } from '../types/library';
import { CATEGORIES } from '../data/books';
import { BookCard } from './BookCard';

export type SortOption = 'unggulan' | 'terbaru' | 'rating' | 'judul';

interface CatalogSectionProps {
  books: Book[];
  selectedCategory: BookCategory;
  onSelectCategory: (category: BookCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onResetFilters: () => void;
  savedBookIds: string[];
  readingProgress: Record<string, ReadingProgress>;
  onReadBook: (book: Book, chapterIndex?: number) => void;
  onToggleSaveBook: (book: Book) => void;
  onOpenBookDetail: (book: Book) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  books,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  searchQuery,
  onResetFilters,
  savedBookIds,
  readingProgress,
  onReadBook,
  onToggleSaveBook,
  onOpenBookDetail,
}) => {
  return (
    <section id="katalog" className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      {/* Header & Sort */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#E5DDD0]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B45309]">
            Indeks Pustaka
          </p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#142621]">
            Katalog Buku Digital
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#52665E] tabular-nums whitespace-nowrap">
            Menampilkan {books.length} buku
          </span>
          <label htmlFor="sort-books" className="sr-only">
            Urutkan katalog
          </label>
          <select
            id="sort-books"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-lg border border-[#D8CFC0] bg-white px-3 py-2 text-xs sm:text-sm font-medium text-[#142621] focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 cursor-pointer"
          >
            <option value="unggulan">Urutan Kurasi</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="terbaru">Terbitan Terbaru</option>
            <option value="judul">Judul (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Category Segmented Tabs */}
      <div
        role="tablist"
        aria-label="Filter kategori buku"
        className="mt-5 flex items-center gap-2 overflow-x-auto pb-2"
      >
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#0E3B34] text-white shadow-sm'
                  : 'bg-[#EFE9DE] text-[#3E524B] hover:bg-[#E4DBCC] hover:text-[#142621]'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Search indicator bar if filtering */}
      {searchQuery.trim() !== '' && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#E6F4F1] px-4 py-2.5 text-sm text-[#0F5149]">
          <span>
            Hasil pencarian untuk <strong className="font-semibold">“{searchQuery}”</strong>
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:underline cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Atur ulang
          </button>
        </div>
      )}

      {/* Book Grid or Empty State */}
      {books.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#E5DDD0] bg-white px-6 py-14 text-center">
          <h3 className="font-serif text-xl font-semibold text-[#142621]">
            Belum ada buku yang cocok
          </h3>
          <p className="mt-2 text-sm text-[#52665E] max-w-md mx-auto">
            Coba gunakan kata kunci yang lebih umum atau tampilkan kembali seluruh kategori koleksi.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0D5D57] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Tampilkan Semua Buku
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isSaved={savedBookIds.includes(book.id)}
              progress={readingProgress[book.id]}
              onRead={onReadBook}
              onToggleSave={onToggleSaveBook}
              onOpenDetail={onOpenBookDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
};
