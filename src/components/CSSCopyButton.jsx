import { useState } from "react";

export default function CSSCopyButton({ fontFamily, controls }) {
  const [copied, setCopied] = useState(false);

  function generateCSS() {
    return `font-family: "${fontFamily}", sans-serif;
font-size: ${controls.fontSize}px;
font-weight: ${controls.fontWeight};
letter-spacing: ${controls.letterSpacing}em;
line-height: ${controls.lineHeight};`;
  }

  function generateImportCSS() {
    const encodedFamily = encodeURIComponent(fontFamily);
    return `@import url('https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${controls.fontWeight}&display=swap');`;
  }

  async function handleCopyCSS() {
    const css = generateCSS();
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyImport() {
    const importCSS = generateImportCSS();
    await navigator.clipboard.writeText(importCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyAll() {
    const all = `${generateImportCSS()}\n\n/* 타이포그래피 설정 */\n${generateCSS()}`;
    await navigator.clipboard.writeText(all);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
        📋 CSS 복사
      </h3>

      {/* CSS 미리보기 */}
      <pre className="bg-gray-950 rounded-md p-3 text-xs text-gray-400 font-mono mb-3 overflow-x-auto">
        <code>
          {generateImportCSS()}
          {"\n\n"}
          {generateCSS()}
        </code>
      </pre>

      {/* 복사 버튼들 */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleCopyImport}
          className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
        >
          @import 복사
        </button>
        <button
          onClick={handleCopyCSS}
          className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
        >
          속성만 복사
        </button>
        <button
          onClick={handleCopyAll}
          className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors"
        >
          전체 복사
        </button>
        {copied && (
          <span className="text-xs text-green-400 flex items-center">
            ✅ 복사됨!
          </span>
        )}
      </div>
    </div>
  );
}
