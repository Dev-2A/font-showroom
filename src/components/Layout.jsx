import Header from "./Header";

export default function Layout({ children, selectedFont }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header selectedFont={selectedFont} />
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        {children}
      </main>
      <footer className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        <span>© 2026 </span>
        <a
          href="https://github.com/Dev-2A"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-400"
        >
          Dev-2A
        </a>
        <span> · Font ShowRoom</span>
        <span className="mx-2">|</span>
        <a
          href="https://github.com/Dev-2A/font-showroom"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-400"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
