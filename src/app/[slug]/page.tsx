import { Button } from '@/components/ui/Button';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ShareButtons } from '@/components/news/ShareButtons';
import { constructMetadata } from '@/lib/seo';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

async function getArticleData(slug: string) {
  const response = await fetchAPI('/articles', {
    filters: { slug: { $eq: slug } },
    pLevel: 5
  });

  if (!response.data || response.data.length === 0) {
    return null;
  }

  const article = response.data[0];

  // Fetch related articles
  const relatedResponse = await fetchAPI('/articles', {
    filters: { slug: { $ne: slug } },
    pagination: { pageSize: 3 },
    sort: ['publishedDate:desc']
  });

  return {
    article,
    relatedArticles: relatedResponse.data || [],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticleData(slug);
  
  if (!data) return constructMetadata();
  
  const { article } = data;
  const seo = article.seo;

  return constructMetadata({
    metaTitle: seo?.metaTitle || article.title,
    metaDescription: seo?.metaDescription || article.excerpt,
    keywords: seo?.keywords,
    canonicalURL: seo?.canonicalURL || `https://thammyvungkin.vn/${slug}`,
    metaImage: seo?.metaImage?.url ? (getStrapiMedia(seo.metaImage.url) ?? undefined) : undefined,
  });
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getArticleData(slug);

  if (!data) {
    notFound();
  }

  const { article, relatedArticles } = data;

  return (
    <div>
      {/* Breadcrumb Section */}
      <section className="py-4 md:py-6 bg-[var(--gray-100)] border-b border-[var(--gray-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-[var(--gray-600)] overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-[var(--primary-purple)] shrink-0 transition-colors">Trang chủ</Link>
            <span className="shrink-0 text-[var(--gray-400)]">/</span>
            <Link href="/tin-tuc" className="hover:text-[var(--primary-purple)] shrink-0 transition-colors">Tin tức</Link>
            <span className="shrink-0 text-[var(--gray-400)]">/</span>
            <span className="text-[var(--foreground)] truncate font-medium">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 md:gap-16">
            {/* Left Column: Article Header & Body */}
            <div className="lg:col-span-2 space-y-10 md:space-y-14">
              {/* Back Button */}
              <Link href="/tin-tuc">
                <Button variant="outline" size="sm" className="mb-4 border-[var(--primary-purple)]/20 hover:bg-[var(--primary-purple)]/5">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại danh sách
                </Button>
              </Link>

              {/* Title & Metadata */}
              <div className="space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-[1.1] md:leading-[1.15]">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 md:gap-10 text-[var(--gray-600)] border-b border-[var(--gray-100)] pb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary-purple-light)]/30 flex items-center justify-center">
                      <User className="w-6 h-6 text-[var(--primary-purple)]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--gray-400)] font-black">Người viết</p>
                      <p className="font-bold text-[var(--foreground)] text-sm md:text-base">Admin</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary-purple-light)]/30 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[var(--primary-purple)]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--gray-400)] font-black">Ngày đăng</p>
                      <p className="font-bold text-[var(--foreground)] text-sm md:text-base">
                        {new Date(article.publishedDate || article.publishedAt || article.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[var(--primary-purple)]/30 to-[var(--primary-gold)]/30 group ring-1 ring-black/5">
                {article.featured_image?.url ? (
                  <img 
                    src={getStrapiMedia(article.featured_image.url) || ''} 
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-md">
                    <Calendar className="w-24 h-24 text-white/30" />
                  </div>
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]" />
              </div>


              {/* Article Content Body */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-[var(--foreground)] prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-14 prose-headings:mb-6
                  prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:border-l-8 prose-h2:border-[var(--primary-purple)] prose-h2:pl-8
                  prose-h3:text-2xl md:prose-h3:text-2xl prose-h3:italic
                  prose-p:text-[var(--gray-600)] prose-p:leading-[1.8] prose-p:mb-8 text-justify
                  prose-li:marker:text-[var(--primary-purple)] prose-li:text-[var(--gray-600)]
                  prose-strong:text-[var(--foreground)] prose-strong:font-black
                  prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-14 prose-img:ring-1 prose-img:ring-black/5"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Bottom Share Buttons */}
              <div className="mt-16 pt-12 border-t-2 border-[var(--gray-100)]">
                <ShareButtons title={article.title} />
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-12">
                {/* Related Articles Card */}
                {relatedArticles.length > 0 && (
                  <div className="bg-gradient-to-br from-white via-white to-[var(--primary-purple-light)]/20 p-8 rounded-[3rem] shadow-2xl border border-[var(--primary-purple)]/10 ring-1 ring-black/10">
                    <h3 className="text-2xl font-black text-[var(--foreground)] mb-10 flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="w-10 h-1.5 bg-[var(--primary-purple)] rounded-full mr-4" />
                        Bài viết mới
                      </span>
                    </h3>
                    <div className="space-y-12">
                      {relatedArticles.map((related: any) => (
                        <Link key={related.documentId} href={`/${related.slug}`}>
                          <div className="group cursor-pointer">
                            <div className="flex items-center space-x-3 text-[10px] font-black text-[var(--primary-purple)] mb-3 uppercase tracking-[0.25em]">
                              <span className="w-6 h-[1px] bg-[var(--primary-purple)]" />
                              <span>{new Date(related.publishedDate || related.publishedAt || related.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <h4 className="font-bold text-lg md:text-xl text-[var(--foreground)] group-hover:text-[var(--primary-purple)] transition-all duration-300 line-clamp-2 leading-relaxed group-hover:translate-x-1">
                              {related.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link href="/tin-tuc">
                      <Button variant="outline" size="lg" className="w-full mt-14 rounded-2xl border-2 border-[var(--primary-purple)]/20 text-[var(--primary-purple)] hover:bg-[var(--primary-purple)] hover:text-white transition-all transform hover:scale-[1.02] font-black py-8 uppercase tracking-widest text-xs">
                        Tất cả bài viết
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimized CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[var(--primary-purple)] to-[var(--primary-gold)] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 md:mb-10 tracking-tight leading-tight">
              Bạn cần tư vấn chuyên sâu?
            </h2>
            <p className="text-lg md:text-2xl text-white/90 mb-10 md:mb-16 leading-relaxed font-medium">
              Đội ngũ bác sĩ chuyên môn tại Trần Điền luôn sẵn sàng hỗ trợ bạn tìm lại sự tự tin và vẻ đẹp hoàn mỹ nhất.
            </p>
            <Link href="/lien-he">
              <Button variant="secondary" size="lg" className="bg-white text-[var(--primary-purple)] hover:bg-[var(--gray-50)] px-10 md:px-16 py-6 md:py-10 rounded-2xl md:rounded-[2.5rem] text-xl md:text-3xl font-black shadow-2xl transition-all transform hover:-translate-y-2 active:scale-95 group">
                <span className="flex items-center">
                  Đặt lịch tư vấn ngay
                  <ArrowRight className="w-8 h-8 md:w-12 md:h-12 ml-4 md:ml-8 group-hover:translate-x-3 transition-transform duration-500" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
