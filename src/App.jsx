import Layout from "./components/Layout";
import { useFonts } from "./hooks/useFonts";

export default function App() {
  const { fonts, loading, error } = useFonts();

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
        <div>
          <p className="text-gray-400 mb-4">
            총 <span className="text-indigo-400 font-bold">{fonts.length}</span>
            개 폰트를 불러왔습니다.
          </p>
          <ul className="space-y-2">
            {fonts.slice(0, 20).map((font) => (
              <li
                key={font.family}
                className="text-gray-300 bg-gray-900 rounded-lg px-4 py-3"
              >
                {font.family}
                <span className="text-gray-500 text-sm ml-2">
                  ({font.variants?.length || 0} variants)
                </span>
              </li>
            ))}
          </ul>
          {fonts.length > 20 && (
            <p className="text-gray-500 text-sm mt-4 text-center">
              ...외 {fonts.length - 20}개
            </p>
          )}
        </div>
      )}
    </Layout>
  );
}
