import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SiteHeader } from 'components/navigation/SiteHeader';
import { VILLA_BACKGROUND_IMAGE } from 'lib/backgroundImage';
import { SiteFooter } from 'components/navigation/SiteFooter';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: {
    default: 'Ulusli Villas | Boutique Booking & ROI Planner',
    template: '%s | Ulusli Villas'
  },
  description:
    'A refined digital booking experience for Ulusli Villas with live availability, curated stays, and ROI planning for investors.',
  keywords: ['villa', 'booking', 'luxury travel', 'ROI planner', 'investment'],
  openGraph: {
    title: 'Ulusli Villas – Retreat Collection',
    description:
      'Discover a high-conversion booking experience and ROI planner tailored for the Ulusli villa development.',
    url: 'https://ulusli.example.com',
    siteName: 'Ulusli Villas',
    locale: 'en_US',
    type: 'website'
  },
  metadataBase: new URL('https://ulusli.example.com'),
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bodyStyle = {
    '--villa-background-image': VILLA_BACKGROUND_IMAGE
  } as CSSProperties;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body style={bodyStyle}>
        <div className="app-shell">
          <SiteHeader />
          <main className="app-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
