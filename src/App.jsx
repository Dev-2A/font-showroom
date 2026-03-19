import { useState } from "react";
import Layout from "./components/Layout";
import FontList from "./components/FontList";
import FontControls from "./components/FontControls";
import { useFonts } from "./hooks/useFonts";
import { getAvailableWeights } from "./utils/fontLoader";
import { DEFAULT_CONTROLS } from "./constants/sampleTexts";

export default function App() {
  const { fonts, loading, error } = useFonts();
  const [selectedFont, setSelectedFont] = useState(null);
  const [controls, setControls] = useState({ ...DEFAULT_CONTROLS });

  const availableWeights = selectedFont
    ? getAvailableWeights(selectedFont)
    : [];

  function handleSelectFont(font) {
    setSelectedFont(font);

    // 선택한 폰트가 현재 weight를 지원하지 않으면 가장 가까운 weight로 조정
    const weights = getAvailableWeights(font);
    if (weights.length > 0 && !weights.includes(controls.fontWeight)) {
      const closest = weights.reduce((prev, curr) =>
        Math.abs(curr - controls.fontWeight) <
        Math.abs(prev - controls.fontWeight)
          ? curr
          : prev,
      );
      setControls((prev) => ({ ...prev, fontWeight: closest }));
    }
  }

  const previewStyle = selectedFont
    ? {
        fontFamily: `"${selectedFont.family}", sans-serif`,
        fontSize: `${controls.fontSize}px`,
        fontWeight: controls.fontWeight,
        letterSpacing: `${controls.letterSpacing}em`,
        lineHeight: controls.lineHeight,
      }
    : {};

  return (
    <Layout>
      {loading && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg animate-pulse">
            ⏳ Google Fonts 목록을 불러오는 중...
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 text-lg">❌ {error}</p>
          <p className="text-gray-500 text-sm mt-2">
            .env.local에 VITE_GOOGLE_FONTS_API_KEY가 설정되어 있는지
            확인해주세요.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 좌측: 폰트 목록 */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <FontList
              fonts={fonts}
              selectedFont={selectedFont}
              onSelectFont={handleSelectFont}
            />
          </div>

          {/* 우측: 컨트롤 + 미리보기 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <FontControls
              controls={controls}
              onChange={setControls}
              availableWeights={availableWeights}
            />

            {selectedFont ? (
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <h2 className="text-lg font-bold text-white mb-4">
                  {selectedFont.family}
                  <span className="text-sm text-gray-500 font-normal ml-2">
                    미리보기
                  </span>
                </h2>
                <div style={previewStyle} className="text-gray-100">
                  <p>다람쥐 헌 쳇바퀴에 타고파</p>
                  <p>The quick brown fox jumps over the lazy dog</p>
                  <p>0123456789</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-900 rounded-lg border border-gray-800">
                <p className="text-gray-500">← 좌측에서 폰트를 선택해주세요</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
