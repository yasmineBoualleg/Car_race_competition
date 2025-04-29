import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IEEE Car Race Competition',
  description: 'Build and race your own Arduino-powered car in this exciting competition!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050B16]">{children}</body>
    </html>
  );
} 