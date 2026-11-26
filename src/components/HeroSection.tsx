import React from 'react';
import { ArrowDown, Search, X } from 'lucide-react';
import { HERO_LIBRARY_IMAGE } from '../data/books';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalBooks: number;
  onExploreCatalog: () => void;
  onOpenFeaturedBook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  totalBooks,
  onExploreCatalog,
  onOpenFeaturedBook,
}) => {
  return (
    <section id="beranda" className="mx-auto max-w-7xl px-5 pt-6 pb-8 sm:px-8 sm:pt-8">
      {/* Main Split Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-2xl bg-[#0E3B34] text-white shadow-lg">
        {/* Left Editorial Content */}
        <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-10 lg:p-12">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#FCD34D]">
              Perpustakaan Digital Nusantara
            </p>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold leading-[1.15] tracking-tight text-white max-w-xl">
              Temukan bacaan bermutu dalam ruang baca digital yang teduh
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#D1E7E2] max-w-xl">
              Jelajahi koleksi kurasi sastra, sejarah maritim, sains alam, arsitektur tropis, dan filosofi hidup. Baca langsung di peramban dengan pengatur tema kertas dan catatan pribadi.
            </p>

            {/* Interactive Search Bar */}
            <div className="mt-7 max-w-xl">
              <label htmlFor="hero-search" className="sr-only">
                Cari judul buku, penulis, atau topik
              </label>
              <div className="relative flex items-center">
                <Search
                  className="pointer-events-none absolute left-4 h-5 w-5 text-[#0F766E]"
                  aria-hidden="true"
                />
                <input
                  id="hero-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onExploreCatalog();
                    }
                  }}
                  placeholder="Cari judul buku, penulis, atau topik bacaan..."
                  className="w-full rounded-xl bg-white py-3.5 pl-12 pr-28 text-sm sm:text-base text-[#142621] placeholder:text-[#64748B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    aria-label="Hapus pencarian"
                    className="absolute right-24 rounded-md p-1.5 text-[#64748B] hover:text-[#142621] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onExploreCatalog}
                  className="absolute right-2 rounded-lg bg-[#D97706] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#B45309] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cari
                </button>
              </div>
            </div>
          </div>

          {/* Primary & Secondary Action */}
          <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-white/15">
            <button
              type="button"
              onClick={onOpenFeaturedBook}
              className="inline-flex items-center gap-2 rounded-lg bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-[#142621] hover:bg-[#FBBF24] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Baca Edisi Unggulan
            </button>
            <button
              type="button"
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Lihat Semua Katalog
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Architectural Library Visual */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#092B25]">
          <img
            src={HERO_LIBRARY_IMAGE}
            alt="Ruang baca perpustakaan modern bermandikan cahaya pagi dan rak buku kayu jati"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover lg:absolute lg:inset-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E3B34]/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0E3B34]/45 lg:via-transparent lg:to-transparent"
          />
        </div>
      </div>

      {/* Full-Width 4-Column Summary Strip Below Hero Split */}
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#E5DDD0] bg-white px-5 py-4">
          <p className="text-xs font-medium text-[#52665E]">Koleksi Tersedia</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-[#0F3D34] tabular-nums">
            {totalBooks} Edisi Kurasi
          </p>
        </div>
        <div className="rounded-xl border border-[#E5DDD0] bg-white px-5 py-4">
          <p className="text-xs font-medium text-[#52665E]">Ragam Disiplin</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-[#1E3A5F] tabular-nums">
            5 Bidang Ilmu
          </p>
        </div>
        <div className="rounded-xl border border-[#E5DDD0] bg-white px-5 py-4">
          <p className="text-xs font-medium text-[#52665E]">Kenyamanan Layar</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-[#B45309]">
            3 Tema Kertas
          </p>
        </div>
        <div className="rounded-xl border border-[#E5DDD0] bg-white px-5 py-4">
          <p className="text-xs font-medium text-[#52665E]">Akses Pembaca</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-[#0F766E]">
            Gratis &amp; Instan
          </p>
        </div>
      </div>
    </section>
  );
};
