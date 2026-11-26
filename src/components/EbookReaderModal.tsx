import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  List,
  NotebookPen,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import {
  Book,
  ReaderFontSize,
  ReaderTheme,
  ReadingNote,
  ReadingProgress,
} from '../types/library';

interface EbookReaderModalProps {
  book: Book | null;
  initialChapterIndex: number;
  isSaved: boolean;
  progress?: ReadingProgress;
  notes: ReadingNote[];
  onClose: () => void;
  onToggleSave: (book: Book) => void;
  onChapterVisit: (bookId: string, chapterIndex: number, chapterId: string) => void;
  onAddNote: (bookId: string, chapterTitle: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const THEME_STYLES: Record<
  ReaderTheme,
  { wrapper: string; header: string; text: string; muted: string; border: string; quote: string }
> = {
  warm: {
    wrapper: 'bg-[#FAF5EB] text-[#1D2B26]',
    header: 'bg-[#F3ECE0] border-[#E2D8C7]',
    text: 'text-[#21302B]',
    muted: 'text-[#5A6C64]',
    border: 'border-[#E2D8C7]',
    quote: 'text-[#0F5149] border-[#D9CFC0]',
  },
  light: {
    wrapper: 'bg-[#FFFFFF] text-[#111827]',
    header: 'bg-[#F8FAFC] border-[#E2E8F0]',
    text: 'text-[#1E293B]',
    muted: 'text-[#64748B]',
    border: 'border-[#E2E8F0]',
    quote: 'text-[#0F766E] border-[#E2E8F0]',
  },
  dark: {
    wrapper: 'bg-[#121A18] text-[#EAE6DC]',
    header: 'bg-[#182320] border-[#263631]',
    text: 'text-[#E3DFD5]',
    muted: 'text-[#9BB0A8]',
    border: 'border-[#263631]',
    quote: 'text-[#FCD34D] border-[#263631]',
  },
};

const FONT_SIZE_CLASSES: Record<ReaderFontSize, string> = {
  sm: 'text-[15px] leading-[1.75]',
  md: 'text-[17px] leading-[1.82]',
  lg: 'text-[19px] leading-[1.88]',
};

export const EbookReaderModal: React.FC<EbookReaderModalProps> = ({
  book,
  initialChapterIndex,
  isSaved,
  progress,
  notes,
  onClose,
  onToggleSave,
  onChapterVisit,
  onAddNote,
  onDeleteNote,
}) => {
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [theme, setTheme] = useState<ReaderTheme>('warm');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('md');
  const [showChapters, setShowChapters] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    setChapterIndex(initialChapterIndex);
  }, [initialChapterIndex, book?.id]);

  useEffect(() => {
    if (!book) return;
    const chapter = book.chapters[chapterIndex];
    if (chapter) {
      onChapterVisit(book.id, chapterIndex, chapter.id);
    }
  }, [book, chapterIndex, onChapterVisit]);

  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const currentChapter = book.chapters[chapterIndex] ?? book.chapters[0];
  const themeStyle = THEME_STYLES[theme];
  const bookNotes = notes.filter((n) => n.bookId === book.id);
  const completedCount = progress?.completedChapters.length ?? 1;
  const percentComplete = Math.round((completedCount / book.chapters.length) * 100);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    onAddNote(book.id, `${currentChapter.number}. ${currentChapter.title}`, noteInput.trim());
    setNoteInput('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Ruang baca ${book.title}`}
      className={`fixed inset-0 z-50 flex flex-col ${themeStyle.wrapper} transition-colors duration-200`}
    >
      {/* Top Reader Toolbar */}
      <header
        className={`flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-8 ${themeStyle.header}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Tutup
          </button>
          <div className="hidden sm:block min-w-0">
            <p className="font-serif text-sm font-semibold truncate">{book.title}</p>
            <p className={`text-xs truncate ${themeStyle.muted}`}>
              Bab {currentChapter.number}: {currentChapter.title}
            </p>
          </div>
        </div>

        {/* Reading Comfort Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Paper Theme Switcher */}
          <div
            role="group"
            aria-label="Tema kertas baca"
            className={`flex items-center rounded-lg border p-0.5 ${themeStyle.border}`}
          >
            <button
              type="button"
              onClick={() => setTheme('warm')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                theme === 'warm' ? 'bg-[#0F766E] text-white' : 'hover:bg-black/5'
              }`}
            >
              Hangat
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                theme === 'light' ? 'bg-[#0F766E] text-white' : 'hover:bg-black/5'
              }`}
            >
              Terang
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                theme === 'dark' ? 'bg-[#0F766E] text-white' : 'hover:bg-black/5'
              }`}
            >
              Malam
            </button>
          </div>

          {/* Font Size Switcher */}
          <div
            role="group"
            aria-label="Ukuran huruf"
            className={`hidden md:flex items-center rounded-lg border p-0.5 ${themeStyle.border}`}
          >
            {(['sm', 'md', 'lg'] as ReaderFontSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFontSize(size)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase cursor-pointer transition-colors ${
                  fontSize === size ? 'bg-[#0F766E] text-white' : 'hover:bg-black/5'
                }`}
              >
                {size === 'sm' ? 'A-' : size === 'md' ? 'A' : 'A+'}
              </button>
            ))}
          </div>

          {/* Chapters Toggle */}
          <button
            type="button"
            onClick={() => {
              setShowChapters((prev) => !prev);
              setShowNotes(false);
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
              showChapters ? 'bg-[#0F766E] text-white border-[#0F766E]' : themeStyle.border
            }`}
          >
            <List className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Daftar Bab</span>
          </button>

          {/* Notes Toggle */}
          <button
            type="button"
            onClick={() => {
              setShowNotes((prev) => !prev);
              setShowChapters(false);
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors tabular-nums ${
              showNotes ? 'bg-[#D97706] text-white border-[#D97706]' : themeStyle.border
            }`}
          >
            <NotebookPen className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Catatan ({bookNotes.length})</span>
          </button>

          {/* Save Bookmark */}
          <button
            type="button"
            onClick={() => onToggleSave(book)}
            aria-label={isSaved ? 'Tersimpan di Rak Saya' : 'Simpan buku'}
            className={`rounded-lg border p-1.5 cursor-pointer transition-colors ${
              isSaved
                ? 'border-[#D97706] bg-[#D97706]/15 text-[#D97706]'
                : themeStyle.border
            }`}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Thin Progress Indicator */}
      <div className="h-1 w-full bg-black/10">
        <div
          className="h-full bg-[#0F766E] transition-all duration-300"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Main Content Area + Optional Side Drawer */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Scrollable Reading Column */}
        <main className="flex-1 overflow-y-auto px-5 py-10 sm:px-10 sm:py-14">
          <article className="mx-auto max-w-[68ch]">
            <p className={`font-mono text-xs uppercase tracking-[0.16em] ${themeStyle.muted}`}>
              Bab {currentChapter.number} · Estimasi {currentChapter.readMinutes} menit baca
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold leading-tight">
              {currentChapter.title}
            </h1>
            <p className={`mt-2 text-sm ${themeStyle.muted}`}>
              {book.title} — {book.author}
            </p>

            <hr className={`my-7 border-t ${themeStyle.border}`} />

            {currentChapter.pullQuote && (
              <blockquote
                className={`my-8 border-y py-5 font-serif text-xl sm:text-2xl italic leading-relaxed ${themeStyle.quote}`}
              >
                “{currentChapter.pullQuote}”
              </blockquote>
            )}

            <div className={`space-y-6 ${FONT_SIZE_CLASSES[fontSize]} ${themeStyle.text}`}>
              {currentChapter.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx} className={pIdx === 0 ? 'reader-dropcap' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Chapter Completion & Prev/Next Controls */}
            <div
              className={`mt-14 pt-8 border-t ${themeStyle.border} flex flex-col sm:flex-row items-center justify-between gap-4`}
            >
              <button
                type="button"
                disabled={chapterIndex === 0}
                onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${themeStyle.border}`}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Bab Sebelumnya
              </button>

              <span className={`text-xs font-mono tabular-nums ${themeStyle.muted}`}>
                Bab {chapterIndex + 1} dari {book.chapters.length} ({percentComplete}% selesai)
              </span>

              {chapterIndex < book.chapters.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setChapterIndex((i) => Math.min(book.chapters.length - 1, i + 1))}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0D5D57] transition-colors cursor-pointer"
                >
                  Bab Berikutnya
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#B45309] transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Selesai Membaca
                </button>
              )}
            </div>
          </article>
        </main>

        {/* Chapter Sidebar Drawer */}
        {showChapters && (
          <aside
            aria-label="Daftar Bab"
            className={`w-80 shrink-0 overflow-y-auto border-l p-5 ${themeStyle.header}`}
          >
            <h2 className="font-serif text-lg font-semibold">Daftar Bab</h2>
            <div className="mt-4 space-y-2">
              {book.chapters.map((chap, idx) => {
                const isCurrent = idx === chapterIndex;
                const isDone = progress?.completedChapters.includes(chap.id);
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => {
                      setChapterIndex(idx);
                      setShowChapters(false);
                    }}
                    className={`w-full rounded-xl border p-3.5 text-left transition-colors cursor-pointer ${
                      isCurrent
                        ? 'border-[#0F766E] bg-[#0F766E]/10'
                        : `${themeStyle.border} hover:bg-black/5`
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                      <span className="text-[#0F766E] font-semibold">BAB {chap.number}</span>
                      {isDone && <span className="text-[#0F766E]">Selesai</span>}
                    </div>
                    <p className="mt-1 text-sm font-medium">{chap.title}</p>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Personal Notes Drawer */}
        {showNotes && (
          <aside
            aria-label="Catatan Membaca"
            className={`w-80 sm:w-96 shrink-0 overflow-y-auto border-l p-5 ${themeStyle.header}`}
          >
            <h2 className="font-serif text-lg font-semibold">Catatan Pribadi</h2>
            <p className={`mt-1 text-xs ${themeStyle.muted}`}>
              Simpan kutipan atau pemikiran Anda untuk buku ini.
            </p>

            <form onSubmit={handleSaveNote} className="mt-4 space-y-2.5">
              <textarea
                rows={3}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Tulis catatan untuk bab ini..."
                className={`w-full rounded-xl border p-3 text-sm bg-transparent focus:border-[#0F766E] focus:outline-none ${themeStyle.border}`}
              />
              <button
                type="submit"
                disabled={!noteInput.trim()}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0F766E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0D5D57] disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Simpan Catatan
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {bookNotes.length === 0 ? (
                <p className={`text-xs italic ${themeStyle.muted}`}>
                  Belum ada catatan untuk buku ini.
                </p>
              ) : (
                bookNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`rounded-xl border p-3.5 text-sm ${themeStyle.border}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-semibold text-[#0F766E]">
                        {note.chapterTitle}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteNote(note.id)}
                        aria-label="Hapus catatan"
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-1.5 leading-relaxed">{note.content}</p>
                    <p className={`mt-1.5 text-[11px] ${themeStyle.muted}`}>{note.createdAt}</p>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
