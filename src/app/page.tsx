import { redirect } from 'next/navigation';
import { defaultLocale } from '@/data/cv-data';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
