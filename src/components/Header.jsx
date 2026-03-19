export default function Header({ selectedFont }) {
  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔤</span>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Font ShowRoom
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Google Fonts 미리보기 쇼룸
            </p>
          </div>
        </div>

        {selectedFont && (
          <div className="hidden md:flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="text-xs text-gray-500">선택됨:</span>
            <span className="text-sm text-indigo-400 font-medium">
              {selectedFont.family}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
