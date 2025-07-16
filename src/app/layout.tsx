import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Cinzel } from "next/font/google";
import Image from "next/image";

export const metadata: Metadata = {
  title: "CV Forge",
  description: "Generate your CV in seconds / Genera to CV en segundos",
  icons: [{ rel: "icon", url: "/appicon.webp" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html 
      lang="en" 
      className={`${geist.variable} `}
    >
      <body className="flex min-h-screen max-w-screen flex-col overflow-x-hidden">
        <header className="inset-x-0 top-0 z-20 max-h-screen bg-black/25">
          <nav className="container px-8 mx-auto flex items-center justify-between">
            <a title="Home" className="flex items-center justify-center gap-3" href="/">
              <Image src={"/appicon-nbg.webp"} width={40} 
                      height={40} alt="CV Forge Logo" 
                      className="size-13 ">
              </Image>
              <h1 style={{WebkitBackgroundClip: "text"}} className={`${cinzel.variable} m-0 bg-clip-text text-transparent 
              bg-gradient-to-br from-p via-[#ded5ef] to-[#4e449d]
              font-semibold`}
              >
                CV Forge
              </h1>
            </a>
            <a title="Link to GitHub" href="https://github.com/AtaraBastruka/ats_cv_generator">
              <svg width="40" height="40" 
                className="size-10 rounded-full text-white dark:text-white"
              >
                <use xlinkHref="./icon-assets.svg#github" />
              </svg>
            </a>
          </nav>
        </header>
        <main className="relative z-10 flex flex-1 flex-col">
          {children}
        </main>
        <footer>
          <p>© {new Date().getFullYear()} Creado por AtaraBastruka</p>
        </footer>
      </body>
    </html>
  );
}
