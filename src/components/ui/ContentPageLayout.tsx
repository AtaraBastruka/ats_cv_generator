// components/ContentPageLayout.tsx
import { type ReactNode } from "react";
import Image from "next/image";

interface ContentPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ContentPageLayout({ 
  title, 
  description, 
  children 
}: ContentPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 style={{WebkitBackgroundClip: "text"}} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-white/70 text-md leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        <Image loading="eager" 
            fetchPriority="high" 
            src={"/bg.webp"} 
            width={40} height={40} 
            alt="speed" 
            className="blur-xl absolute -z-50 
            -translate-x-1/2 inset-x-1/2
            -inset-y-full w-[100vw] h-[150px] 
            object-cover max-w-[unset]
            "
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}