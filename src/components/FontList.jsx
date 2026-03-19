import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import FontCard from "./FontCard";

const PAGE_SIZE = 30;

export default function FontList({
  fonts,
  selectedFont,
  onSelectFont,
  favorites,
  onToggleFavorite,
  isFavorite,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredFonts = useMemo(() => {
    let result = fonts;

    // 즐겨찾기 필터
    if (showFavoritesOnly) {
      result = result.filter((font) => favorites.includes(font.family));
    }

    // 검색 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((font) =>
        font.family.toLowerCase().includes(query),
      );
    }

    return result;
  }, [fonts, searchQuery, showFavoritesOnly, favorites]);

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

      {/* 즐겨찾기 필터 토글 */}
      <button
        onClick={() => {
          setShowFavoritesOnly((prev) => !prev);
          setVisibleCount(PAGE_SIZE);
        }}
        className={`w-full py-2 text-sm rounded-lg border transition-colors ${
          showFavoritesOnly
            ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
            : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600"
        }`}
      >
        {showFavoritesOnly
          ? `⭐ 즐겨찾기만 보기 (${favorites.length}개)`
          : `⭐ 즐겨찾기 필터 (${favorites.length}개)`}
      </button>

      <div className="flex flex-col gap-2 max-h-[calc(100vh-340px)] overflow-y-auto pr-1">
        {visibleFonts.map((font) => (
          <FontCard
            key={font.family}
            font={font}
            isSelected={selectedFont?.family === font.family}
            onSelect={onSelectFont}
            isFavorite={isFavorite(font.family)}
            onToggleFavorite={onToggleFavorite}
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
            {showFavoritesOnly
              ? "즐겨찾기한 폰트가 없습니다."
              : "검색 결과가 없습니다."}
          </p>
        )}
      </div>
    </div>
  );
}
