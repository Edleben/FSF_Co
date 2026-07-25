
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'Frédéric Saba Foundation',
  description: 'Frédéric Saba Foundation - Supporting educational and humanitarian initiatives for children, the sick, families in need, and people with disabilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen" suppressHydrationWarning={true}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow pt-16 sm:pt-20">
            {children}
          </main>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
