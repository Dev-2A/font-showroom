import { useState } from "react";
import Layout from "./components/Layout";
import FontList from "./components/FontList";
import FontControls from "./components/FontControls";
import FontMeta from "./components/FontMeta";
import SampleTextTabs from "./components/SampleTextTabs";
import CSSCopyButton from "./components/CSSCopyButton";
import { useFonts } from "./hooks/useFonts";
import { useFavorites } from "./hooks/useFavorites";
import { getAvailableWeights } from "./utils/fontLoader";
import { DEFAULT_CONTROLS } from "./constants/sampleTexts";

export default function App() {
  const { fonts, loading, error } = useFonts();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedFont, setSelectedFont] = useState(null);
  const [controls, setControls] = useState({ ...DEFAULT_CONTROLS });

  const availableWeights = selectedFont
    ? getAvailableWeights(selectedFont)
    : [];

  function handleSelectFont(font) {
    setSelectedFont(font);

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
          <div className="lg:col-span-1">
            <FontList
              fonts={fonts}
              selectedFont={selectedFont}
              onSelectFont={handleSelectFont}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </div>

          {/* 우측: 메타 + 컨트롤 + 미리보기 + CSS */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {selectedFont ? (
              <>
                <FontMeta font={selectedFont} />
                <FontControls
                  controls={controls}
                  onChange={setControls}
                  availableWeights={availableWeights}
                />
                <SampleTextTabs style={previewStyle} />
                <CSSCopyButton
                  fontFamily={selectedFont.family}
                  controls={controls}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-center">
                  <p className="text-4xl mb-4">🔤</p>
                  <p className="text-gray-500 text-lg">
                    좌측에서 폰트를 선택해주세요
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    폰트를 선택하면 미리보기와 설정이 표시됩니다
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
