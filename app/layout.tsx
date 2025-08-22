import type { Metadata } from "next";
import localFont from 'next/font/local';
import Image from 'next/image';
import "./globals.css";

const dinPro = localFont({
  src: [
    { path: '../public/assets/fonts/din-pro/dinpro_light.otf', weight: '300', style: 'normal' },
    { path: '../public/assets/fonts/din-pro/dinpro_lightitalic.ttf', weight: '300', style: 'italic' },
    { path: '../public/assets/fonts/din-pro/dinpro.otf', weight: '400', style: 'normal' },
    { path: '../public/assets/fonts/din-pro/dinpro_italic.otf', weight: '400', style: 'italic' },
    { path: '../public/assets/fonts/din-pro/dinpro_medium.otf', weight: '500', style: 'normal' },
    { path: '../public/assets/fonts/din-pro/dinpro_mediumitalic.otf', weight: '500', style: 'italic' },
    { path: '../public/assets/fonts/din-pro/dinpro_bold.otf', weight: '700', style: 'normal' },
    { path: '../public/assets/fonts/din-pro/dinpro_bolditalic.otf', weight: '700', style: 'italic' },
    { path: '../public/assets/fonts/din-pro/dinpro_black.otf', weight: '900', style: 'normal' },
    { path: '../public/assets/fonts/din-pro/dinpro_blackitalic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-din-pro',
});

export const metadata: Metadata = {
  title: "Protegrity Reddit Feed",
  description: "A clean Next.js application",
  icons: {
    icon: '/assets/favicon.webp',
  },
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
        <footer role="contentinfo" className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Left: Protegrity logo */}
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/logo.png"
                  alt="Protegrity"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </div>

              {/* Right: Social links */}
              <div className="flex items-center space-x-4" role="navigation" aria-label="Social links">
                <a
                  href="https://twitter.com/protegrity"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Protegrity on X (Twitter)"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-secondary hover:text-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98] transition"
                >
                  {/* X icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.77-6.22L4.8 22H2l6.98-8.02L2 2h6.9l4.5 5.94L18.244 2Zm-2.38 18.2h1.9L8.22 3.7H6.2l9.664 16.5Z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/protegrity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Protegrity on LinkedIn"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-secondary hover:text-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98] transition"
                >
                  {/* LinkedIn icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.84v2.04h.06c.54-1.02 1.86-2.1 3.84-2.1 4.1 0 4.86 2.7 4.86 6.2V23h-4v-6.4c0-1.52-.02-3.48-2.12-3.48-2.12 0-2.44 1.66-2.44 3.38V23h-4V8Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
