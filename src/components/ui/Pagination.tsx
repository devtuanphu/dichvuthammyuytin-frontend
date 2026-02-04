'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--gray-300)] bg-white text-[var(--gray-600)] hover:bg-[var(--primary-purple-light)] hover:text-[var(--primary-purple)] hover:border-[var(--primary-purple)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[var(--gray-600)] disabled:hover:border-[var(--gray-300)]"
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getVisiblePages().map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="flex items-center justify-center w-10 h-10 text-[var(--gray-600)]"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-[var(--primary-purple)] text-white'
                : 'border border-[var(--gray-300)] bg-white text-[var(--gray-600)] hover:bg-[var(--primary-purple-light)] hover:text-[var(--primary-purple)] hover:border-[var(--primary-purple)]'
            }`}
            aria-label={`Trang ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--gray-300)] bg-white text-[var(--gray-600)] hover:bg-[var(--primary-purple-light)] hover:text-[var(--primary-purple)] hover:border-[var(--primary-purple)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[var(--gray-600)] disabled:hover:border-[var(--gray-300)]"
        aria-label="Trang sau"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
