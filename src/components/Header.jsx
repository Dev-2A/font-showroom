export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔤</span>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Font ShowRoom
          </h1>
        </div>
        <p className="text-sm text-gray-400 hidden sm:block">
          Google Fonts 미리보기 쇼룸
        </p>
      </div>
    </header>
  );
}
