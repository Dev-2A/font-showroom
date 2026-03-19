import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © 2026 Dev-2A · Font ShowRoom
      </footer>
    </div>
  );
}
