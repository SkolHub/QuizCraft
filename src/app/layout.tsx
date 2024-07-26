import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import '@/lib/fontawesome/css/fa.css';
import { cn } from '@nextui-org/theme';

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'QuizCraft',
  description: 'Your quiz generating platform'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'dark')}>{children}</body>
    </html>
  );
}
