import { useEffect } from "react";
import { loadFont, getAvailableWeights } from "../utils/fontLoader";

export default function FontCard({
  font,
  isSelected,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) {
  const weights = getAvailableWeights(font);

  useEffect(() => {
    loadFont(font.family, weights.map(String));
  }, [font.family]);

  function handleFavoriteClick(e) {
    e.stopPropagation();
    onToggleFavorite(font.family);
  }

  return (
    <button
      onClick={() => onSelect(font)}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isSelected
          ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500"
          : "border-gray-800 bg-gray-900 hover:border-gray-600"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-300 truncate mr-2">
          {font.family}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500">{weights.length}w</span>
          <span
            onClick={handleFavoriteClick}
            className={`text-sm cursor-pointer transition-transform hover:scale-125 ${
              isFavorite
                ? "grayscale-0"
                : "grayscale opacity-30 hover:opacity-60"
            }`}
            title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            ⭐
          </span>
        </div>
      </div>
      <p
        style={{ fontFamily: `"${font.family}", sans-serif` }}
        className="text-lg text-gray-100 truncate"
      >
        가나다 ABC 123
      </p>
    </button>
  );
}
