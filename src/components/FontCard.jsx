import { useEffect } from "react";
import { loadFont, getAvailableWeights } from "../utils/fontLoader";

export default function FontCard({ font, isSelected, onSelect }) {
  const weights = getAvailableWeights(font);

  useEffect(() => {
    loadFont(font.family, weights.map(String));
  }, [font.family]);

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
        <h3 className="text-sm font-medium text-gray-300">{font.family}</h3>
        <span className="text-xs text-gray-500">{weights.length} weights</span>
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
