// app/page.tsx
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ButtonLink from "@/components/ui/ButtonLink";

export default async function HomePage() {
  const t  = await getTranslations('HomePage');
  // Intentar cargar la página de creación cuando antes para evitar lag

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="relative py-28 px-6 h-[100vh]">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 id="hero-heading" style={{WebkitBackgroundClip: "text"}} className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              {t('heroMessage')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed">
              {t('heroDescription1')} {" "}
              <span className="text-purple-400 font-semibold">
                {(t('heroDescription2'))}
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <ButtonLink 
                href="/create" 
                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                {t('startButton')} →
              </ButtonLink>
              <a
                href="#features" 
                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all backdrop-blur-sm hover:bg-white/5"
              >
                {t('learnButton')}
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('trustNoReg')}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {(t('trustPrivate'))}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
               {t('trustOpenSource')}
              </div>
            </div>
          </div>
        </div>
      <Image loading="eager" 
            fetchPriority="high" 
            src={"/bg.webp"} 
            width={40} height={40} 
            alt="speed" 
            className="blur-xl absolute -z-50 
            -translate-x-1/2 inset-x-1/2
            
            -inset-y-full w-[2353px] h-[2620px] 
            max-lg:h-[2880px]
            max-lg:w-[100vw]
            object-cover max-w-[unset]
            "
        />
      </section>
      
      {/* Features Section */}
      <section aria-labelledby="features-heading" id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 id="features-heading" className="text-4xl font-bold text-center mb-16 text-white">
            {t('whatMakesus')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Privacy First */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{t('featurePrivacy')}</h3>
              <p className="text-white/70 leading-relaxed">
                {t('featurePrivacyDescription')}
              </p>
            </div>

            {/* Lightning Fast */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{t('featureLightning')}</h3>
              <p className="text-white/70 leading-relaxed">
                {t('featureLightningDescription')}
              </p>
            </div>

            {/* ATS Optimized */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{t('featureATS')}</h3>
              <p className="text-white/70 leading-relaxed">
                {t('featureATSDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section aria-labelledby="how-it-works-heading" className="py-20 px-6">
        
        <div className="container mx-auto">
          <h2 id="how-it-works-heading" className="text-4xl font-bold text-center mb-16 text-white">
            {t('howItWorks')}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{t('enterInfo')}</h3>
                <p className="text-white/70">{t('enterInfoDescription')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{t('previewResume')}</h3>
                <p className="text-white/70">{t('previewResumeDescription')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{t('downloadResume')}</h3>
                <p className="text-white/70">{t('downloadResumeDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 id="cta-heading" className="text-4xl font-bold mb-6 text-white">
              {t('ctaMessage')}
            </h2>
            <p className="text-xl text-white/90 mb-8"> 
              {t('ctaDescription')}
            </p>
            <ButtonLink
              href="/create"
              className="focus:outline-none focus:ring-2 
                    focus:ring-indigo-500  inline-block 
                    bg-gradient-to-r from-purple-600 
                    to-pink-600 hover:from-purple-700 
                    hover:to-pink-700 text-white px-12 py-4 
                    rounded-full font-semibold text-xl transition-all 
                    transform hover:scale-105 shadow-lg 
                    hover:shadow-purple-500/25"
            >
              {t('ctaButton')} →
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}