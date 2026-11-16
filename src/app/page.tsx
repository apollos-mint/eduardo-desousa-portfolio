import SwissB2BAdvisory, { SupportedLanguage } from '@/components/b2b/SwissB2BAdvisory';

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const resolved = await searchParams;
  const lang = resolved?.lang as SupportedLanguage | undefined;
  return <SwissB2BAdvisory initialLanguage={lang} />;
}


