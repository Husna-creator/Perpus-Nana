import { useCallback, useEffect, useMemo, useState } from 'react';
import { BOOKS_CATALOG } from './data/books';
import { Book, BookCategory, ReadingNote, ReadingProgress } from './types/library';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { CatalogSection, SortOption } from './components/CatalogSection';
import { PersonalShelfSection } from './components/PersonalShelfSection';
import { BookDetailModal } from './components/BookDetailModal';
import { EbookReaderModal } from './components/EbookReaderModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const STORAGE_KEYS = {
  saved: 'lentera_saved_books',
  progress: 'lentera_reading_progress',
  notes: 'lentera_reading_notes',
  goal: 'lentera_monthly_goal',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('Semua');
  const [sortBy, setSortBy] = useState<SortOption>('unggulan');

  const [savedBookIds, setSavedBookIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.saved, [
      'jejak-rempah-nusantara',
      'filosofi-seduhan-pertama',
    ])
  );

  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>(() =>
    readStorage<Record<string, ReadingProgress>>(STORAGE_KEYS.progress, {})
  );

  const [notes, setNotes] = useState<ReadingNote[]>(() =>
    readStorage<ReadingNote[]>(STORAGE_KEYS.notes, [])
  );

  const [monthlyGoal, setMonthlyGoal] = useState<number>(() =>
    readStorage<number>(STORAGE_KEYS.goal, 4)
  );

  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [readerState, setReaderState] = useState<{ book: Book; chapterIndex: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(savedBookIds));
  }, [savedBookIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(readingProgress));
  }, [readingProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.goal, JSON.stringify(monthlyGoal));
  }, [monthlyGoal]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = BOOKS_CATALOG.filter((book) => {
      const matchesCategory = selectedCategory === 'Semua' || book.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        book.title.toLowerCase().includes(query) ||
        book.subtitle.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      );
    });

    const sorted = [...list];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'terbaru') {
      sorted.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'judul') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'id'));
    }
    return sorted;
  }, [searchQuery, selectedCategory, sortBy]);

  const savedBooks = useMemo(
    () => BOOKS_CATALOG.filter((book) => savedBookIds.includes(book.id)),
    [savedBookIds]
  );

  const scrollToCatalog = useCallback(() => {
    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleToggleSave = useCallback((book: Book) => {
    setSavedBookIds((prev) => {
      const exists = prev.includes(book.id);
      if (exists) {
        setToastMessage(`“${book.title}” dikeluarkan dari Rak Saya`);
        return prev.filter((id) => id !== book.id);
      }
      setToastMessage(`“${book.title}” disimpan ke Rak Saya`);
      return [...prev, book.id];
    });
  }, []);

  const handleOpenReader = useCallback((book: Book, chapterIndex = 0) => {
    setDetailBook(null);
    setReaderState({ book, chapterIndex });
  }, []);

  const handleChapterVisit = useCallback(
    (bookId: string, chapterIndex: number, chapterId: string) => {
      setReadingProgress((prev) => {
        const existing = prev[bookId];
        const completed = existing?.completedChapters ?? [];
        const nextCompleted = completed.includes(chapterId)
          ? completed
          : [...completed, chapterId];

        if (
          existing &&
          existing.chapterIndex === chapterIndex &&
          nextCompleted.length === completed.length
        ) {
          return prev;
        }

        return {
          ...prev,
          [bookId]: {
            chapterIndex,
            completedChapters: nextCompleted,
            lastReadAt: new Date().toLocaleDateString('id-ID'),
          },
        };
      });
    },
    []
  );

  const handleAddNote = useCallback((bookId: string, chapterTitle: string, content: string) => {
    const newNote: ReadingNote = {
      id: `note-${Date.now()}`,
      bookId,
      chapterTitle,
      content,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setNotes((prev) => [newNote, ...prev]);
    setToastMessage('Catatan membaca berhasil disimpan');
  }, []);

  const handleDeleteNote = useCallback((noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    setToastMessage('Catatan dihapus');
  }, []);

  const handleSelectCategory = useCallback(
    (category: BookCategory) => {
      setSelectedCategory(category);
      scrollToCatalog();
    },
    [scrollToCatalog]
  );

  const handleOpenBookById = useCallback(
    (bookId: string) => {
      const found = BOOKS_CATALOG.find((b) => b.id === bookId);
      if (found) {
        const progress = readingProgress[found.id];
        handleOpenReader(found, progress?.chapterIndex ?? 0);
      }
    },
    [handleOpenReader, readingProgress]
  );

  const handleStartReadingFromNav = useCallback(() => {
    const recentBook =
      BOOKS_CATALOG.find((b) => (readingProgress[b.id]?.completedChapters.length ?? 0) > 0) ??
      BOOKS_CATALOG[2]; // Default to Senja di Pelabuhan Banda
    handleOpenReader(recentBook, readingProgress[recentBook.id]?.chapterIndex ?? 0);
  }, [handleOpenReader, readingProgress]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#142621]">
      <Navbar onStartReading={handleStartReadingFromNav} savedCount={savedBookIds.length} />

      <main>
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalBooks={BOOKS_CATALOG.length}
          onExploreCatalog={scrollToCatalog}
          onOpenFeaturedBook={() => handleOpenBookById('senja-di-pelabuhan-banda')}
        />

        <FeaturedCollections
          onSelectCategory={handleSelectCategory}
          onOpenBook={handleOpenBookById}
        />

        <CatalogSection
          books={filteredBooks}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onResetFilters={() => {
            setSearchQuery('');
            setSelectedCategory('Semua');
            setSortBy('unggulan');
          }}
          savedBookIds={savedBookIds}
          readingProgress={readingProgress}
          onReadBook={handleOpenReader}
          onToggleSaveBook={handleToggleSave}
          onOpenBookDetail={setDetailBook}
        />

        <PersonalShelfSection
          savedBooks={savedBooks}
          allBooks={BOOKS_CATALOG}
          readingProgress={readingProgress}
          notes={notes}
          monthlyGoal={monthlyGoal}
          onChangeGoal={setMonthlyGoal}
          onReadBook={handleOpenReader}
          onRemoveSaved={handleToggleSave}
          onBrowseCatalog={scrollToCatalog}
        />
      </main>

      <Footer />

      <BookDetailModal
        book={detailBook}
        isSaved={detailBook ? savedBookIds.includes(detailBook.id) : false}
        progress={detailBook ? readingProgress[detailBook.id] : undefined}
        notes={notes}
        onClose={() => setDetailBook(null)}
        onReadChapter={handleOpenReader}
        onToggleSave={handleToggleSave}
      />

      <EbookReaderModal
        book={readerState?.book ?? null}
        initialChapterIndex={readerState?.chapterIndex ?? 0}
        isSaved={readerState ? savedBookIds.includes(readerState.book.id) : false}
        progress={readerState ? readingProgress[readerState.book.id] : undefined}
        notes={notes}
        onClose={() => setReaderState(null)}
        onToggleSave={handleToggleSave}
        onChapterVisit={handleChapterVisit}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />

      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}
