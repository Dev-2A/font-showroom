import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import FontCard from "./FontCard";

const PAGE_SIZE = 30;

export default function FontList({ fonts, selectedFont, onSelectFont }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredFonts = useMemo(() => {
    if (!searchQuery.trim()) return fonts;

    const query = searchQuery.toLowerCase();
    return fonts.filter((font) => font.family.toLowerCase().includes(query));
  }, [fonts, searchQuery]);

  const visibleFonts = filteredFonts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFonts.length;

  function handleSearch(query) {
    setSearchQuery(query);
    setVisibleCount(PAGE_SIZE);
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        onSearch={handleSearch}
        totalCount={fonts.length}
        filteredCount={filteredFonts.length}
      />

      <div className="flex flex-col gap-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
        {visibleFonts.map((font) => (
          <FontCard
            key={font.family}
            font={font}
            isSelected={selectedFont?.family === font.family}
            onSelect={onSelectFont}
          />
        ))}

        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="py-3 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            더 보기 ({filteredFonts.length - visibleCount}개 남음)
          </button>
        )}

        {filteredFonts.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
