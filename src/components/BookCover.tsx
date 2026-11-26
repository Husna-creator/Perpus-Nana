import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Book } from '../types/library';

interface BookCoverProps {
  book: Book;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ book, className = '' }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(book.coverImage) && !imageFailed;

  if (showImage) {
    return (
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#EBE3D5] shadow-md ${className}`}
      >
        <img
          src={book.coverImage}
          alt={`Sampul buku ${book.title} oleh ${book.author}`}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {/* Subtle book spine crease highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent"
        />
        {/* Bottom scrim with subtle edition title for clear visual identification */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        />
        <div className="pointer-events-none absolute inset-x-3 bottom-3 text-white">
          <p className="font-serif text-sm font-semibold leading-snug line-clamp-2 drop-shadow-sm">
            {book.title}
          </p>
        </div>
      </div>
    );
  }

  const { bg, accent, text, motif } = book.coverTheme;

  return (
    <div
      style={{ backgroundColor: bg, color: text }}
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg p-4 flex flex-col justify-between shadow-md transition-transform duration-300 group-hover:scale-[1.02] ${className}`}
    >
      {/* Book spine binding shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 via-white/10 to-transparent"
      />

      {/* Geometric editorial motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 260"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        preserveAspectRatio="xMidYMid slice"
      >
        {motif === 'waves' && (
          <g fill="none" stroke={accent} strokeWidth="2.5">
            <path d="M-10 150 Q 45 120, 100 150 T 210 150" />
            <path d="M-10 175 Q 45 145, 100 175 T 210 175" />
            <path d="M-10 200 Q 45 170, 100 200 T 210 200" />
            <circle cx="150" cy="65" r="24" fill={accent} fillOpacity="0.25" />
          </g>
        )}
        {motif === 'grid' && (
          <g fill="none" stroke={accent} strokeWidth="1.5">
            <rect x="24" y="24" width="152" height="212" />
            <line x1="24" y1="95" x2="176" y2="95" />
            <line x1="100" y1="95" x2="100" y2="236" />
            <circle cx="100" cy="165" r="32" fill={accent} fillOpacity="0.2" />
          </g>
        )}
        {motif === 'orbit' && (
          <g fill="none" stroke={accent} strokeWidth="2">
            <circle cx="100" cy="135" r="68" />
            <circle cx="100" cy="135" r="44" strokeDasharray="5 5" />
            <circle cx="145" cy="95" r="10" fill={accent} />
          </g>
        )}
        {motif === 'arch' && (
          <g fill="none" stroke={accent} strokeWidth="2.5">
            <path d="M40 240 L40 120 A60 60 0 0 1 160 120 L160 240" />
            <path d="M62 240 L62 128 A38 38 0 0 1 138 128 L138 240" />
          </g>
        )}
        {motif === 'botanical' && (
          <g fill="none" stroke={accent} strokeWidth="2">
            <path d="M100 230 C 100 160, 100 100, 120 45" />
            <path d="M102 180 C 70 165, 60 135, 80 120 C 95 135, 100 160, 102 180 Z" fill={accent} fillOpacity="0.2" />
            <path d="M105 140 C 140 130, 152 100, 130 85 C 115 100, 108 120, 105 140 Z" fill={accent} fillOpacity="0.2" />
          </g>
        )}
      </svg>

      {/* Top editorial edition header */}
      <div className="relative z-10 pl-2 flex items-center justify-between text-[11px] font-mono tracking-wider opacity-80">
        <span>{book.accessionNumber}</span>
        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
      </div>

      {/* Center / Bottom typographic title block */}
      <div className="relative z-10 pl-2 space-y-2">
        <div
          style={{ backgroundColor: accent }}
          className="h-0.5 w-10 rounded-full"
          aria-hidden="true"
        />
        <h3 className="font-serif text-lg font-semibold leading-tight tracking-tight">
          {book.title}
        </h3>
        <p className="text-xs opacity-85 font-medium line-clamp-1">{book.author}</p>
      </div>
    </div>
  );
};
