import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BookCategory } from '../types/library';

interface FeaturedCollectionsProps {
  onSelectCategory: (category: BookCategory) => void;
  onOpenBook: (bookId: string) => void;
}

const CURATED_SPOTLIGHTS = [
  {
    id: 'pilihan-pekan-ini',
    kicker: 'Kurasi Sastra & Rasa',
    title: 'Kisah Pesisir & Kehangatan Hidup',
    description:
      'Novel kepulangan di Kepulauan Banda hingga refleksi sederhana tentang ketenangan di pagi hari.',
    accentBg: 'bg-[#FFF3E0]',
    accentBorder: 'border-[#F59E0B]/35',
    accentText: 'text-[#9A3412]',
    buttonBg: 'bg-[#B45309] hover:bg-[#92400E]',
    targetBookId: 'senja-di-pelabuhan-banda',
    categoryFallback: 'Sastra & Fiksi' as BookCategory,
    actionLabel: 'Baca Senja di Banda',
  },
  {
    id: 'arsip-nusantara',
    kicker: 'Arsip Sejarah Maritim',
    title: 'Jalur Rempah & Aksara Kuno',
    description:
      'Menyelami pelayaran niaga abad ke-15, peta laut kuno, dan warisan aksara di atas daun lontar.',
    accentBg: 'bg-[#E8F0F8]',
    accentBorder: 'border-[#1E3A5F]/25',
    accentText: 'text-[#1E3A5F]',
    buttonBg: 'bg-[#1E3A5F] hover:bg-[#152944]',
    targetBookId: 'jejak-rempah-nusantara',
    categoryFallback: 'Sejarah & Budaya' as BookCategory,
    actionLabel: 'Buka Arsip Nusantara',
  },
  {
    id: 'wawasan-baru',
    kicker: 'Sains & Ruang Tropis',
    title: 'Alam, Matematika & Arsitektur',
    description:
      'Memahami spiral Fibonacci di hutan hujan serta rancangan bangunan sejuk tanpa pendingin berlebih.',
    accentBg: 'bg-[#E6F4F1]',
    accentBorder: 'border-[#0F766E]/30',
    accentText: 'text-[#0F5149]',
    buttonBg: 'bg-[#0F766E] hover:bg-[#0D5D57]',
    targetBookId: 'algoritma-alam-semesta',
    categoryFallback: 'Sains & Alam' as BookCategory,
    actionLabel: 'Pelajari Sains Alam',
  },
];

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCategory,
  onOpenBook,
}) => {
  return (
    <section id="koleksi-pilihan" className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
            Kurasi Pustakawan
          </p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#142621]">
            Koleksi Pilihan Pekan Ini
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onSelectCategory('Semua')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F766E] hover:text-[#0D5D57] transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
        >
          Jelajahi semua kategori
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CURATED_SPOTLIGHTS.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col justify-between rounded-2xl border ${item.accentBorder} ${item.accentBg} p-6 transition-transform duration-200 hover:-translate-y-0.5`}
          >
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${item.accentText}`}>
                {item.kicker}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-[#142621] leading-snug">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#3E524B]">
                {item.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onOpenBook(item.targetBookId)}
                className={`inline-flex items-center gap-2 rounded-lg ${item.buttonBg} px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer whitespace-nowrap shrink-0`}
              >
                {item.actionLabel}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory(item.categoryFallback)}
                className={`text-xs font-semibold ${item.accentText} hover:underline cursor-pointer whitespace-nowrap`}
              >
                Filter rak
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
