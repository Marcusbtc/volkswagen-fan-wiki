import Link from 'next/link'
import './globals.css'
import { ToastProvider } from '@/components/Toast'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { Footer } from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-display min-h-screen flex flex-col">
        <ToastProvider>
          <FavoritesProvider>
            <ErrorBoundary>
              <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                  <Link href="/" className="group flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00B0F0] to-[#001E50] flex items-center justify-center shadow-lg shadow-[#00B0F0]/20 group-hover:shadow-[#00B0F0]/40 transition-all">
                      <span className="text-white font-bold text-lg">VW</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                      Fan <span className="text-[#00B0F0]">Wiki</span>
                    </span>
                  </Link>
                  <div className="flex items-center gap-6">
                    <Link 
                      href="/" 
                      className="relative text-white/80 hover:text-white transition-colors font-medium group"
                    >
                      All Cars
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00B0F0] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </div>
                </div>
                <div className="accent-line" />
              </nav>
              <main className="max-w-7xl mx-auto px-6 pt-24 pb-8 flex-1">
                {children}
              </main>
              <Footer />
            </ErrorBoundary>
          </FavoritesProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

