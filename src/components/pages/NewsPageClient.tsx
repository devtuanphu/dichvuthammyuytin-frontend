'use client';

import { useState } from 'react';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';
import { Pagination } from '@/components/ui/Pagination';

const ITEMS_PER_PAGE = 9;

interface Article {
  documentId: string;
  slug: string;
  title: string;
  excerpt?: string;
  author?: string;
  publishedDate: string;
  featured_image?: {
    url: string;
  };
}

interface NewsPageClientProps {
  articles: Article[];
}

export function NewsPageClient({ articles }: NewsPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of articles section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-[var(--gray-600)]">Chưa có bài viết nào</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedArticles.map((article) => (
          <Link
            key={article.documentId}
            href={`/${article.slug}`}
            className="group"
          >
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
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
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary-purple)] transition-colors line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-[var(--gray-600)] mb-4 line-clamp-3 flex-1">
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Page Info */}
      <div className="text-center mt-6 text-sm text-[var(--gray-600)]">
        Hiển thị {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, articles.length)} trong tổng số {articles.length} bài viết
      </div>
    </>
  );
}
