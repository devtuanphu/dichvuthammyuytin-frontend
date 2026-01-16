import { Metadata } from 'next';

/**
 * Interface chuẩn cho SEO Data từ API (Strapi hoặc Custom Backend)
 * Giúp map linh hoạt mọi trường dữ liệu SEO chuyên sâu.
 */
export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  } | string;
  metaRobots?: string;
  canonicalURL?: string;
  structuredData?: any; // JSON-LD
  metaViewport?: string;
  metaSocial?: Array<{
    socialNetwork: 'Facebook' | 'Twitter';
    title: string;
    description: string;
    image?: string;
  }>;
}

const siteConfig = {
  name: 'Thẩm Mỹ Vùng Kín Trần Điền',
  defaultDescription: 'Trung tâm thẩm mỹ vùng kín hàng đầu với đội ngũ bác sĩ chuyên môn cao, công nghệ hiện đại, cam kết an toàn và hiệu quả.',
  defaultTitle: 'Chuyên Nghiệp, Uy Tín, Bảo Mật',
  url: 'https://dichvuthammyuytin.com',
  ogImage: '/image/og-image.jpg',
};

/**
 * Hàm hỗ trợ tạo Metadata nâng cao, map trực tiếp từ SEO Object của API
 */
export function constructMetadata(seo?: SeoData): Metadata {
  if (!seo) {
    // Trả về metadata mặc định nếu không có dữ liệu
    return {
      title: {
        default: `${siteConfig.name} - ${siteConfig.defaultTitle}`,
        template: `%s | ${siteConfig.name}`,
      },
      description: siteConfig.defaultDescription,
      metadataBase: new URL(siteConfig.url),
    };
  }

  const {
    metaTitle,
    metaDescription,
    keywords,
    metaImage,
    metaRobots,
    canonicalURL,
    metaSocial,
  } = seo;

  // Xử lý ảnh OG
  const ogImageUrl = typeof metaImage === 'string' 
    ? metaImage 
    : metaImage?.url || siteConfig.ogImage;

  // Tìm thông tin social cụ thể
  const facebook = metaSocial?.find(s => s.socialNetwork === 'Facebook');
  const twitter = metaSocial?.find(s => s.socialNetwork === 'Twitter');

  return {
    title: metaTitle || siteConfig.defaultTitle,
    description: metaDescription || siteConfig.defaultDescription,
    keywords: keywords,
    alternates: {
      canonical: canonicalURL,
    },
    robots: metaRobots,
    openGraph: {
      title: facebook?.title || metaTitle || siteConfig.name,
      description: facebook?.description || metaDescription || siteConfig.defaultDescription,
      images: [{ url: facebook?.image || ogImageUrl }],
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitter?.title || metaTitle || siteConfig.name,
      description: twitter?.description || metaDescription || siteConfig.defaultDescription,
      images: [twitter?.image || ogImageUrl],
    },
    metadataBase: new URL(siteConfig.url),
  };
}
