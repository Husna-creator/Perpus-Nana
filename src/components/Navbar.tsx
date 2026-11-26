import React from 'react';

interface NavbarProps {
  onStartReading: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartReading, savedCount }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E5DDD0] bg-[#FAF7F2]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 py-3.5 sm:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#beranda"
          className="font-serif text-xl font-semibold tracking-tight text-[#0F3D34] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded"
        >
          Lentera Pustaka
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3E524B]"
        >
          <a
            href="#koleksi-pilihan"
            className="hover:text-[#0F766E] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Koleksi Pilihan
          </a>
          <a
            href="#katalog"
            className="hover:text-[#0F766E] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Katalog Buku
          </a>
          <a
            href="#rak-saya"
            className="hover:text-[#0F766E] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 tabular-nums"
          >
            Rak Saya ({savedCount})
          </a>
          <a
            href="#statistik"
            className="hover:text-[#0F766E] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Statistik Baca
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onStartReading}
            className="inline-flex items-center justify-center rounded-lg bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0D5D57] active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]"
          >
            Mulai Membaca
          </button>
        </div>
      </div>
    </header>
  );
};
