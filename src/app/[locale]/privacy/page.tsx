// app/privacy/page.tsx
import ContentPageLayout from "@/components/ui/ContentPageLayout";
import { type Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

export default async function PrivacyPage() {
  const t = await getTranslations('PrivacyPage');
  return (
    <ContentPageLayout
      title={t('pageTitle')}
      description={t('pageDescription')}
    >
      <div className="max-w-4xl mx-auto">
          <article className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-8">
                <section>
                <p className="text-white/80 leading-relaxed">
                    {t('privacyFirst')}
                </p>
                <ul className="pl-5 space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{t('privacyList1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{t('privacyList2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{t('privacyList3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{t('privacyList4')}</span>
                    </li>
                </ul>
                </section>

                <section>
                <p className="text-white/80 leading-relaxed">
                    {t('privacyContact')}
                </p>
                </section>

                <div className="text-center pt-8 border-t border-white/10">
                  <p className="text-white/60 text-sm">
                      {t('privacyLastUpdated')}
                  </p>
                </div>
            </div>
            </div>
          </article>
        </div>
    </ContentPageLayout>
  );
}