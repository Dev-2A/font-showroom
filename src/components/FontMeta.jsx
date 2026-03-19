import { getAvailableWeights } from "../utils/fontLoader";

export default function FontMeta({ font }) {
  if (!font) return null;

  const weights = getAvailableWeights(font);
  const subsets = font.subsets || [];
  const category = font.category || "알 수 없음";

  const weightLabels = {
    100: "Thin",
    200: "ExtraLight",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Black",
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">{font.family}</h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* 지원 굵기 */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5">지원 굵기</p>
          <div className="flex flex-wrap gap-1.5">
            {weights.map((w) => (
              <span
                key={w}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {w} {weightLabels[w] && `· ${weightLabels[w]}`}
              </span>
            ))}
          </div>
        </div>

        {/* 지원 문자셋 */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5">지원 문자셋</p>
          <div className="flex flex-wrap gap-1.5">
            {subsets.map((s) => (
              <span
                key={s}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
