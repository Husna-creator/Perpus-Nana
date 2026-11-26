import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 border-t border-[#E5DDD0] bg-[#F3EDE3]">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-8 sm:px-8 text-sm text-[#3E524B]">
        <div>
          <p className="font-serif text-base font-semibold text-[#0F3D34]">Lentera Pustaka</p>
          <p className="mt-1 text-xs text-[#52665E]">
            Ruang baca digital terbuka untuk sastra, sains, sejarah, dan gagasan Nusantara.
          </p>
        </div>

        <nav aria-label="Tautan kaki halaman" className="flex flex-wrap items-center gap-6 text-xs font-medium">
          <a href="#beranda" className="hover:text-[#0F766E] transition-colors">
            Beranda
          </a>
          <a href="#koleksi-pilihan" className="hover:text-[#0F766E] transition-colors">
            Koleksi Pilihan
          </a>
          <a href="#katalog" className="hover:text-[#0F766E] transition-colors">
            Katalog
          </a>
          <a href="#rak-saya" className="hover:text-[#0F766E] transition-colors">
            Rak Saya
          </a>
        </nav>
      </div>
    </footer>
  );
};
