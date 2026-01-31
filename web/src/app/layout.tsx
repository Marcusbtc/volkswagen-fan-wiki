import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">
        <nav className="bg-[#001E50] text-white p-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-between">
          <Link href="/" className="text-xl font-bold">VW Fan Wiki</Link>
          <Link href="/" className="hover:underline">All Cars</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

