'use client';

import { useState } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  featured: boolean;
}

interface NewsListProps {
  articles: Article[];
  categories: string[];
}

export function NewsList({ articles, categories }: NewsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'Tất cả' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <>
      {/* Search Bar Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-14 rounded-full border-2 border-[var(--primary-purple)]/30 focus:outline-none focus:border-[var(--primary-purple)] bg-white shadow-lg"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--gray-600)]" />
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && searchTerm === '' && selectedCategory === 'Tất cả' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-12">Bài viết nổi bật</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link key={article.slug} href={`/${article.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="relative h-80 rounded-3xl overflow-hidden mb-6 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-purple)]/40 to-[var(--primary-gold)]/40 group-hover:opacity-70 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4 p-8">
                          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Calendar className="w-12 h-12 text-white" />
                          </div>
                          <p className="text-white font-semibold">Hình ảnh bài viết</p>
                        </div>
                      </div>
                      <span className="absolute top-4 left-4 bg-[var(--primary-purple)] text-white px-4 py-2 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary-purple)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[var(--gray-600)] mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-[var(--gray-600)]">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[var(--primary-purple)] group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-gradient-to-br from-[var(--accent-cream)] to-[var(--primary-purple-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--primary-purple)] text-white shadow-lg'
                    : 'bg-white text-[var(--foreground)] hover:bg-[var(--primary-purple-light)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-12">
            {searchTerm || selectedCategory !== 'Tất cả' ? 'Kết quả tìm kiếm' : 'Tất cả bài viết'}
          </h2>
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link key={article.slug} href={`/${article.slug}`}>
                  <div className="group cursor-pointer bg-gradient-to-br from-white to-[var(--accent-cream)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-purple)]/30 to-[var(--primary-gold)]/30 group-hover:opacity-70 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-white" />
                      </div>
                      <span className="absolute top-4 left-4 bg-[var(--primary-purple)] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary-purple)] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-[var(--gray-600)] mb-4 line-clamp-3 text-sm">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[var(--gray-600)]">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--primary-purple)] group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[var(--gray-600)]">Không tìm thấy bài viết nào phù hợp</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
