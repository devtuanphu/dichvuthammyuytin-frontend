'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ', href: '/dich-vu' },
    { name: 'Tin tức', href: '/tin-tuc' },
    { name: 'Về chúng tôi', href: '/ve-chung-toi' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300",
          isMenuOpen ? "z-[99]" : "z-[1000]" 
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-[1001]">
              <div className="relative w-40 h-14">
                <Image
                  src="/image/logo.png"
                  alt="Thẩm Mỹ Vùng Kín Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-bold text-gray-700 hover:text-[var(--primary-purple)] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:0123456789" className="text-[var(--primary-purple)] font-black flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0123 456 789
              </a>
              <Button variant="primary" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                ĐẶT LỊCH
              </Button>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative z-[1001]"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR SYSTEM - Escape Stacking Context */}
      <div 
        className={cn(
          "fixed inset-0 w-full h-screen md:hidden transition-all duration-500",
          isMenuOpen ? "z-[99999] visible" : "z-[-1] invisible shadow-none"
        )}
      >
        {/* Lớp nền tối phía sau (Overlay) - Phủ 100% viewport */}
        <div 
          className={cn(
            "fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm transition-opacity duration-500",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Khối Sidebar trượt */}
        <div 
          className={cn(
            "fixed top-0 right-0 w-[85%] max-w-[320px] h-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header Sidebar */}
          <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-white sticky top-0 z-10">
            <div className="relative w-32 h-10">
              <Image src="/image/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-gray-50 text-gray-400 active:bg-gray-100 shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between py-5 text-lg font-black text-gray-800 border-b border-gray-50 active:text-[var(--primary-purple)] group transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  <ArrowRight className="w-5 h-5 text-gray-300 group-active:text-[var(--primary-purple)] translate-x-0 group-active:translate-x-1 transition-transform" />
                </Link>
              ))}
            </nav>

            {/* Hotline Mobile Section */}
            <div className="mt-10 p-6 rounded-[2rem] bg-gradient-to-br from-purple-50 to-white border border-purple-100 flex flex-col items-center text-center shadow-inner">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-[0.2em] mb-4">Hỗ trợ trực tiếp 24/7</span>
              <a href="tel:0123456789" className="text-2xl font-black italic text-[var(--primary-purple)] mb-6 drop-shadow-sm">
                0123 456 789
              </a>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full h-16 text-sm font-black shadow-lg shadow-purple-200 uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                Đặt lịch tư vấn
              </Button>
            </div>
          </div>

          {/* Footer Sidebar */}
          <div className="p-8 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] leading-relaxed">
              UY TÍN - TẬN TÂM - BẢO MẬT
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
