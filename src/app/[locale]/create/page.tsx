// app/generator/page.tsx
import CvGenerator from "@/components/CvGenerator";
import ContentPageLayout from "@/components/ui/ContentPageLayout";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cvGenerator');
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function GeneratorPage() {
  const t = await getTranslations('cvGenerator');
  return (
    <ContentPageLayout title={ t('pageTitle')} 
    description={ t('pageTitle')} >
      <CvGenerator />
    </ContentPageLayout>
  );
}