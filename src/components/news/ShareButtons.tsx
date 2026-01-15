'use client';

import { Facebook, Twitter, Mail } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return;
    
    const url = window.location.href;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center">
        <span className="w-12 h-[2px] bg-[var(--primary-purple)] mr-4" />
        Chia sẻ bài viết
      </h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Facebook className="w-5 h-5" />
          <span>Facebook</span>
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center space-x-2 px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
        >
          <Twitter className="w-5 h-5" />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => handleShare('email')}
          className="flex items-center space-x-2 px-6 py-3 bg-[var(--gray-600)] text-white rounded-full hover:bg-[var(--gray-800)] transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>Email</span>
        </button>
      </div>
    </div>
  );
}
