import { useState } from "react";
import { SAMPLE_TEXTS } from "../constants/sampleTexts";

const TAB_KEYS = Object.keys(SAMPLE_TEXTS);

export default function SampleTextTabs({ style }) {
  const [activeTab, setActiveTab] = useState("korean");
  const [customText, setCustomText] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isCompareAll, setIsCompareAll] = useState(false);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      {/* 탭 버튼 */}
      <div className="flex items-center gap-1 mb-5 border-b border-gray-800 pb-3 flex-wrap">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
              setIsCustom(false);
              setIsCompareAll(false);
            }}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === key && !isCustom && !isCompareAll
                ? "bg-indigo-500/20 text-indigo-400 font-semibold"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
            }`}
          >
            {SAMPLE_TEXTS[key].label}
          </button>
        ))}
        <button
          onClick={() => {
            setIsCustom(false);
            setIsCompareAll(true);
          }}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            isCompareAll
              ? "bg-indigo-500/20 text-indigo-400 font-semibold"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
          }`}
        >
          📊 전체 비교
        </button>
        <button
          onClick={() => {
            setIsCustom(true);
            setIsCompareAll(false);
          }}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            isCustom
              ? "bg-indigo-500/20 text-indigo-400 font-semibold"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
          }`}
        >
          ✏️ 직접 입력
        </button>
      </div>

      {/* 미리보기 영역 */}
      <div className="min-h-[200px]">
        {isCompareAll ? (
          /* 전체 비교 모드 */
          <div className="flex flex-col gap-6">
            {TAB_KEYS.map((key) => (
              <div key={key}>
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-2 border-b border-gray-800 pb-1">
                  {SAMPLE_TEXTS[key].label}
                </p>
                <div className="flex flex-col gap-3">
                  {SAMPLE_TEXTS[key].texts.map((text, idx) => (
                    <div
                      key={idx}
                      style={style}
                      className="text-gray-100 break-words"
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : isCustom ? (
          /* 직접 입력 모드 */
          <div className="flex flex-col gap-4">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="미리볼 텍스트를 직접 입력해보세요..."
              rows={3}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none text-sm"
            />
            {customText && (
              <div style={style} className="text-gray-100 break-words">
                {customText}
              </div>
            )}
          </div>
        ) : (
          /* 단일 탭 모드 */
          <div className="flex flex-col gap-4">
            {SAMPLE_TEXTS[activeTab].texts.map((text, idx) => (
              <div
                key={idx}
                style={style}
                className="text-gray-100 break-words"
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
