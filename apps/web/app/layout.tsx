import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BetterUptime - Website Monitoring & Uptime Monitoring',
  description: 'Monitor your websites 24/7 with instant alerts. Get 99.99% uptime monitoring from 50+ global locations.',
  keywords: 'uptime monitoring, website monitoring, status page, downtime alerts, performance monitoring',
  authors: [{ name: 'Raju Kumar' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'BetterUptime - Website Monitoring & Uptime Monitoring',
    description: 'Monitor your websites 24/7 with instant alerts. Get 99.99% uptime monitoring from 50+ global locations.',
    type: 'website',
    url: 'http://localhost:3000',
    siteName: 'BetterUptime',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
