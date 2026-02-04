import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import { Metadata } from 'next';
import { NewsPageClient } from '@/components/pages/NewsPageClient';

async function getNewsPageData() {
  const newsPage = await fetchAPI('/news-page', { pLevel: 5 });
  const articles = await fetchAPI('/articles', { 
    sort: ['publishedDate:desc'],
    pagination: { pageSize: 100 },
    populate: ['featured_image']
  });

  return {
    newsPage: newsPage.data,
    articles: articles.data || [],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { newsPage } = await getNewsPageData();
  const seo = newsPage?.seo;

  return constructMetadata({
    metaTitle: seo?.metaTitle || 'Kiến thức Thẩm mỹ & Chăm sóc Sức khỏe Phụ nữ',
    metaDescription: seo?.metaDescription || 'Cập nhật những bài viết chuyên sâu về chăm sóc vùng kín.',
    keywords: seo?.keywords || 'tin tức thẩm mỹ, kiến thức làm đẹp vùng kín',
    canonicalURL: seo?.canonicalURL || 'https://thammyvungkin.vn/tin-tuc',
    metaImage: seo?.metaImage?.url ? (getStrapiMedia(seo.metaImage.url) ?? undefined) : undefined,
  });
}

export default async function NewsPage() {
  const { newsPage, articles } = await getNewsPageData();

  // Extract sections with fallbacks
  const heroSection = newsPage?.hero_section || {
    title: 'Tin tức & Kiến thức',
    description: 'Cập nhật những thông tin mới nhất về thẩm mỹ vùng kín, kiến thức chăm sóc sức khỏe và xu hướng làm đẹp',
  };

  const ctaSection = newsPage?.cta_section || {
    title: 'Bạn cần tư vấn thêm?',
    description: 'Liên hệ ngay với chúng tôi để được bác sĩ tư vấn miễn phí',
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--primary-purple-light)] via-[var(--accent-cream)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-[var(--foreground)] mb-6">
            {heroSection.title}
          </h1>
          <p className="text-xl text-[var(--gray-600)] max-w-3xl mx-auto mb-8">
            {heroSection.description}
          </p>
        </div>
      </section>

      {/* Articles Grid with Pagination */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsPageClient articles={articles} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary-purple)] to-[var(--primary-gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{ctaSection.title}</h2>
          <p className="text-xl text-white/90 mb-8">
            {ctaSection.description}
          </p>
          <Link href="/lien-he">
            <Button variant="secondary" size="lg" className="bg-white text-[var(--primary-purple)] hover:bg-white/90">
              Đặt lịch tư vấn
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
