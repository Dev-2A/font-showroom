import { useState } from "react";

export default function SearchBar({ onSearch, totalCount, filteredCount }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }

  function handleClear() {
    setQuery("");
    onSearch("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="폰트 이름 검색..."
          className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500">
        {query ? (
          <>
            <span className="text-indigo-400 font-semibold">
              {filteredCount}
            </span>
            개 검색됨 (전체 {totalCount}개)
          </>
        ) : (
          <>
            전체{" "}
            <span className="text-indigo-400 font-semibold">{totalCount}</span>
            개 폰트
          </>
        )}
      </p>
    </div>
  );
}
