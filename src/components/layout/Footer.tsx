import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { fetchAPI } from '@/lib/strapi';

async function getFooterData() {
  const footer = await fetchAPI('/footer', { pLevel: 5 });
  return {
    footer: footer.data,
  };
}

export const Footer = async () => {
  const { footer } = await getFooterData();

  // Extract sections with fallbacks
  const companyInfo = footer?.company_info || {
    description: 'Chuyên cung cấp các dịch vụ thẩm mỹ vùng kín an toàn, hiệu quả với đội ngũ bác sĩ chuyên môn cao.',
    facebook_url: '#',
    instagram_url: '#',
  };

  const quickLinks = footer?.quick_links || {
    title: 'Liên kết nhanh',
    links: [
      { label: 'Trang chủ', url: '/' },
      { label: 'Dịch vụ', url: '/dich-vu' },
      { label: 'Tin tức', url: '/tin-tuc' },
      { label: 'Về chúng tôi', url: '/ve-chung-toi' },
      { label: 'Liên hệ', url: '/lien-he' },
    ],
  };

  const services = footer?.services || {
    title: 'Dịch vụ',
    links: [
      { label: 'Làm hồng vùng kín', url: '/dich-vu#lam-hong' },
      { label: 'Thu hẹp âm đạo', url: '/dich-vu#thu-hep' },
      { label: 'Tạo hình môi lớn', url: '/dich-vu#tao-hinh' },
      { label: 'Trẻ hóa vùng kín', url: '/dich-vu#tre-hoa' },
    ],
  };

  const contactInfo = footer?.contact_info || {
    title: 'Liên hệ',
    address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
    phone: '0123 456 789',
    email: 'info@thammyvungkin.vn',
    working_hours: 'T2 - T7: 8:00 - 20:00\nCN: 8:00 - 17:00',
  };

  const copyrightText = footer?.copyright_text || `© ${new Date().getFullYear()} Thẩm Mỹ Vùng Kín. Bảo lưu mọi quyền.`;

  return (
    <footer className="bg-gradient-to-br from-[var(--primary-purple-light)] to-[var(--accent-cream)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <div className="relative w-40 h-16">
                <Image
                  src="/image/logo.png"
                  alt="Thẩm Mỹ Vùng Kín Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-[var(--gray-600)] text-sm mb-4">
              {companyInfo.description}
            </p>
            <div className="flex space-x-3">
              <a 
                href={companyInfo.facebook_url || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary-purple)] hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={companyInfo.instagram_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary-purple)] hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">{quickLinks.title}</h4>
            <ul className="space-y-2">
              {quickLinks.links?.map((link: any, index: number) => (
                <li key={index}>
                  <Link href={link.url || '#'} className="text-[var(--gray-600)] hover:text-[var(--primary-purple)] text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">{services.title}</h4>
            <ul className="space-y-2">
              {services.links?.map((link: any, index: number) => (
                <li key={index}>
                  <Link href={link.url || '#'} className="text-[var(--gray-600)] hover:text-[var(--primary-purple)] text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">{contactInfo.title}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-[var(--gray-600)]">
                <MapPin className="w-5 h-5 text-[var(--primary-purple)] flex-shrink-0 mt-0.5" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[var(--gray-600)]">
                <Phone className="w-5 h-5 text-[var(--primary-purple)] flex-shrink-0" />
                <a href={`tel:${contactInfo.phone?.replace(/\s/g, '')}`} className="hover:text-[var(--primary-purple)]">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[var(--gray-600)]">
                <Mail className="w-5 h-5 text-[var(--primary-purple)] flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-[var(--primary-purple)]">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-[var(--gray-600)]">
                <Clock className="w-5 h-5 text-[var(--primary-purple)] flex-shrink-0 mt-0.5" />
                <div className="whitespace-pre-line">
                  {contactInfo.working_hours}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--primary-purple)]/20 pt-8 text-center">
          <p className="text-sm text-[var(--gray-600)]">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};
