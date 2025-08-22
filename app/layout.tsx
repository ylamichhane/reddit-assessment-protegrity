import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const dinPro = localFont({
  src: [
    {
      path: '../public/assets/fonts/din-pro/dinpro_light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_lightitalic.ttf',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_italic.otf',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_mediumitalic.otf',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_bolditalic.otf',
      weight: '700',
      style: 'italic'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_black.otf',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../public/assets/fonts/din-pro/dinpro_blackitalic.otf',
      weight: '900',
      style: 'italic'
    }
  ],
  variable: '--font-din-pro'
});

export const metadata: Metadata = {
  title: "Protegrity Reddit Feed",
  description: "A curated Reddit feed showcasing the latest posts and discussions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dinPro.variable} font-sans`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
