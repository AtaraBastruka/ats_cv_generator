import "@/styles/globals.css";
import Link from "next/link";
import { type Metadata, type Viewport } from "next";
import { Geist, Cinzel } from "next/font/google";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";


// Creando la metadata traducida

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({locale, namespace: 'Layout'});
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    icons: [{ rel: "icon", url: "/appicon.webp" }],
  }
}

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  themeColor: "black",
}

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode;}>) {
  const locale = await getLocale();
  // cargar los mensajes
  const messages = await getMessages();
  // cargar las traducciones
  const t = await getTranslations('Layout');
  return (
    <html 
      lang={locale} 
      className={`${geist.variable} ${cinzel.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Header */}
          <header className="top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
            <nav className="container mx-auto px-6 py-1">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link 
                  title={t('homelink')}
                  className="flex items-center gap-3 group transition-transform hover:scale-105" 
                  href="/"
                >
                  <div className="relative">
                    <Image 
                      src="/appicon-nbg.webp" 
                      width={40} 
                      height={40} 
                      alt="CV Forge Logo" 
                      className="size-10 rounded-lg shadow-lg group-hover:shadow-purple-500/25 transition-shadow"
                    />
                  </div>
                  <h1 style={{WebkitBackgroundClip: "text"}} className={`${cinzel.variable} font-cinzel text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent`}>
                    CVForge
                  </h1>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <a
                    title={t('githubTitle')}
                    href="https://github.com/AtaraBastruka/ats_cv_generator"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg 
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className="text-white size-9 group-hover:text-purple-300 transition-colors"
                    >
                      <use xlinkHref="/icon-assets.svg#github" />
                    </svg>
                  </a>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="relative z-10 flex flex-1 flex-col">
            {children}
          </main>

          {/* Footer */}
          <footer className="z-10 mt-auto border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/appicon-nbg.webp" 
                    width={24} 
                    height={24} 
                    alt={t('logoTitle')} 
                    className="size-6 rounded"
                  />
                  <span className="text-white/60 text-sm">
                    © {new Date().getFullYear()} CVForge
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-white/60">
                    {t('copyright')}{' '}
                    <a
                      href="https://github.com/AtaraBastruka" 
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AtaraBastruka
                    </a>
                  </span>
                  <div className="flex items-center gap-4">
                    <Link 
                      aria-label={t('privacylabel')}
                      href="/privacy" 
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {t('privacy')}
                    </Link>
                    <Link 
                      aria-label={t('termslabel')}
                      href="/terms" 
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {t('terms')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;