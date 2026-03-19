import { DEFAULT_CONTROLS } from "../constants/sampleTexts";

const SLIDER_CONFIG = [
  {
    key: "fontSize",
    label: "글꼴 크기",
    unit: "px",
    min: 12,
    max: 72,
    step: 1,
  },
  {
    key: "fontWeight",
    label: "굵기",
    unit: "",
    min: 100,
    max: 900,
    step: 100,
  },
  {
    key: "letterSpacing",
    label: "자간",
    unit: "em",
    min: -0.1,
    max: 0.5,
    step: 0.01,
  },
  {
    key: "lineHeight",
    label: "행간",
    unit: "",
    min: 1.0,
    max: 3.0,
    step: 0.1,
  },
];

export default function FontControls({ controls, onChange, availableWeights }) {
  function handleChange(key, value) {
    onChange({ ...controls, [key]: Number(value) });
  }

  function handleReset() {
    onChange({ ...DEFAULT_CONTROLS });
  }

  function formatValue(key, value) {
    if (key === "letterSpacing") return value.toFixed(2);
    if (key === "lineHeight") return value.toFixed(1);
    return value;
  }

  function getWeightLabel(weight) {
    const labels = {
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
    return labels[weight] || weight;
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          🎛️ 타이포그래피 설정
        </h3>
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-indigo-400 transition-colors"
        >
          초기화
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {SLIDER_CONFIG.map(({ key, label, unit, min, max, step }) => {
          // 굵기 슬라이더: 선택된 폰트의 가용 weight만 표시
          const isWeight = key === "fontWeight";
          const effectiveMin =
            isWeight && availableWeights?.length
              ? Math.min(...availableWeights)
              : min;
          const effectiveMax =
            isWeight && availableWeights?.length
              ? Math.max(...availableWeights)
              : max;

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-gray-400">{label}</label>
                <span className="text-sm text-indigo-400 font-mono">
                  {formatValue(key, controls[key])}
                  {unit && <span className="text-gray-600 ml-0.5">{unit}</span>}
                  {isWeight && (
                    <span className="text-gray-600 ml-1 font-sans text-xs">
                      {getWeightLabel(controls[key])}
                    </span>
                  )}
                </span>
              </div>
              <input
                type="range"
                min={effectiveMin}
                max={effectiveMax}
                step={step}
                value={controls[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-600">{effectiveMin}</span>
                <span className="text-xs text-gray-600">{effectiveMax}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
