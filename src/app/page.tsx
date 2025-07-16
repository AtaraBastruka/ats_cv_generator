// app/page.tsx (Server Component)

import Link from "next/link";
import Image from "next/image"; // For optimized images

export default function LandingPage() {
  return (
    <>
      <section className="relative">
        <p>Generate results in seconds, not minutes. Our optimized algorithms ensure maximum speed and efficiency.</p>
        <Image loading="eager" 
            fetchPriority="high" 
            src={"/heroback.webp"} 
            width={40} height={40} 
            alt="speed" 
            className="blur-lg absolute -z-50 
            -translate-x-1/2 inset-x-1/2 
            -inset-y-full w-[2353px] h-[1969px] 
            object-cover max-w-[unset]
            "
        />
      </section>
    </>
  );
}