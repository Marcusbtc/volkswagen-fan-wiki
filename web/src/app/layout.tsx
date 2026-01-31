import Link from 'next/link';
import './globals.css';
import { ToastProvider } from '@/components/Toast'
import { FavoritesProvider } from '@/components/SearchableCarList';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#001E50] via-[#003080] to-[#001E50] font-sans">
        <ToastProvider>
          <FavoritesProvider>
          <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:text-[#00B0F0] transition-colors">
                VW Fan Wiki
              </Link>
              <Link href="/" className="text-white/80 hover:text-white transition-colors font-medium">
                All Cars
              </Link>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
          </FavoritesProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

