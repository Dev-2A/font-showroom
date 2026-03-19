import { useState } from "react";
import Layout from "./components/Layout";
import FontList from "./components/FontList";
import { useFonts } from "./hooks/useFonts";

export default function App() {
  const { fonts, loading, error } = useFonts();
  const [selectedFont, setSelectedFont] = useState(null);

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
              onSelectFont={setSelectedFont}
            />
          </div>

          {/* 우측: 미리보기 영역 (다음 단계에서 구현) */}
          <div className="lg:col-span-2">
            {selectedFont ? (
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  {selectedFont.family}
                </h2>
                <p
                  style={{ fontFamily: `"${selectedFont.family}", sans-serif` }}
                  className="text-2xl text-gray-100"
                >
                  🚧 미리보기 영역은 다음 단계에서 구현됩니다.
                </p>
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
