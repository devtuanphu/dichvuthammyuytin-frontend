import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import { Metadata } from 'next';

async function getNewsPageData() {
  const newsPage = await fetchAPI('/news-page', { pLevel: 5 });
  const articles = await fetchAPI('/articles', { 
    sort: ['publishedDate:desc'],
    pagination: { pageSize: 100 }
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

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <Link 
                  key={article.documentId} 
                  href={`/${article.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Featured Image */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-[var(--primary-purple)]/20 to-[var(--primary-gold)]/20">
                      {article.featured_image?.url ? (
                        <img 
                          src={getStrapiMedia(article.featured_image.url) || ''} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="w-16 h-16 text-[var(--primary-purple)]/40" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary-purple)] transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      
                      <p className="text-[var(--gray-600)] mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-[var(--gray-600)]">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{article.author || 'Admin'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.publishedDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 pt-4 border-t border-[var(--gray-200)]">
                        <span className="text-[var(--primary-purple)] font-semibold group-hover:underline">
                          Đọc thêm →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[var(--gray-600)]">Chưa có bài viết nào</p>
            </div>
          )}
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
