import { useState, useEffect } from "react";

const STORAGE_KEY = "font-showroom-favorites";

/**
 * 즐겨찾기 관리 커스텀 훅 (localStorage 기반)
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage 사용 불가 시 무시
    }
  }, [favorites]);

  function toggleFavorite(fontFamily) {
    setFavorites((prev) =>
      prev.includes(fontFamily)
        ? prev.filter((f) => f !== fontFamily)
        : [...prev, fontFamily],
    );
  }

  function isFavorite(fontFamily) {
    return favorites.includes(fontFamily);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
}
