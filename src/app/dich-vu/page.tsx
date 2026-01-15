import { Button } from '@/components/ui/Button';
import { CheckCircle, ArrowRight, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import LucideIcon from '@/components/LucideIcon';
import { Metadata } from 'next';

async function getServicesPageData() {
  const servicesPage = await fetchAPI('/services-page', { pLevel: 5 });

  return {
    servicesPage: servicesPage.data,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { servicesPage } = await getServicesPageData();
  const seo = servicesPage?.seo;

  return constructMetadata({
    metaTitle: seo?.metaTitle || 'Dịch vụ Thẩm mỹ Vùng kín Công nghệ Cao - Laser CO2 Fractional',
    metaDescription: seo?.metaDescription || 'Tổng hợp các dịch vụ làm đẹp vùng kín: Làm hồng môi lớn/bé, thu hẹp âm đạo, tạo hình thẩm mỹ. Công nghệ Laser hiện đại, thực hiện trực tiếp bởi bác sĩ chuyên khoa.',
    keywords: seo?.keywords || 'dịch vụ thẩm mỹ vùng kín, làm hồng hiệu quả, thu hẹp không phẫu thuật, trẻ hóa laser co2',
    canonicalURL: seo?.canonicalURL || 'https://thammyvungkin.vn/dich-vu',
    metaImage: seo?.metaImage?.url ? (getStrapiMedia(seo.metaImage.url) ?? undefined) : undefined,
  });
}

export default async function ServicesPage() {
  const { servicesPage } = await getServicesPageData();

  // Extract sections with fallbacks
  const heroSection = servicesPage?.hero_section || {
    title: 'Dịch vụ của chúng tôi',
    description: 'Chúng tôi cung cấp các giải pháp thẩm mỹ vùng kín toàn diện với công nghệ hiện đại nhất, đảm bảo an toàn, hiệu quả và riêng tư tuyệt đối.',
  };

  const servicesDetailSection = servicesPage?.services_detail_section || {
    services: [
      {
        title: 'Làm hồng vùng kín',
        icon_name: 'Heart',
        color_gradient: 'from-pink-400 to-rose-400',
        description: 'Công nghệ Laser CO2 Fractional giúp làm hồng tự nhiên, an toàn và lâu dài.',
        details: [
          { label: 'Làm hồng môi lớn, môi bé tự nhiên' },
          { label: 'Công nghệ Laser CO2 Fractional hiện đại' },
          { label: 'Không đau, không cần nghỉ dưỡng' },
          { label: 'Hiệu quả lâu dài, an toàn tuyệt đối' },
          { label: 'Kết quả rõ rệt sau 1-2 lần điều trị' },
        ],
        duration: '30-45 phút',
        price: 'Từ 5.000.000đ',
        slug: 'lam-hong-vung-kin',
      },
      {
        title: 'Thu hẹp âm đạo',
        icon_name: 'Sparkles',
        color_gradient: 'from-purple-400 to-pink-400',
        description: 'Phương pháp Laser không đau, không cần nghỉ dưỡng, hiệu quả ngay sau 1 lần.',
        details: [
          { label: 'Thu hẹp âm đạo sau sinh hiệu quả' },
          { label: 'Cải thiện độ co bóp, tăng cảm giác' },
          { label: 'Không phẫu thuật, không đau' },
          { label: 'Thời gian hồi phục nhanh' },
          { label: 'Kết quả tức thì, bền vững lâu dài' },
        ],
        duration: '45-60 phút',
        price: 'Từ 8.000.000đ',
        slug: 'thu-hep-am-dao',
      },
      {
        title: 'Tạo hình môi lớn',
        icon_name: 'Award',
        color_gradient: 'from-rose-400 to-orange-400',
        description: 'Tạo hình thẩm mỹ, cải thiện độ đàn hồi và màu sắc tự nhiên.',
        details: [
          { label: 'Cải thiện hình dáng môi lớn' },
          { label: 'Tăng độ đàn hồi, săn chắc' },
          { label: 'Làm đều màu da vùng kín' },
          { label: 'Phương pháp an toàn, không xâm lấn' },
          { label: 'Kết quả tự nhiên, hài hòa' },
        ],
        duration: '60-90 phút',
        price: 'Từ 10.000.000đ',
        slug: 'tao-hinh-moi-lon',
      },
      {
        title: 'Trẻ hóa vùng kín',
        icon_name: 'Shield',
        color_gradient: 'from-blue-400 to-purple-400',
        description: 'Kích thích tái tạo collagen, phục hồi độ ẩm và độ đàn hồi.',
        details: [
          { label: 'Kích thích tái tạo collagen tự nhiên' },
          { label: 'Cải thiện độ ẩm, độ đàn hồi' },
          { label: 'Giảm khô rát, ngứa ngáy' },
          { label: 'Phục hồi sức khỏe vùng kín' },
          { label: 'Tăng cường sự tự tin, hạnh phúc' },
        ],
        duration: '45-60 phút',
        price: 'Từ 7.000.000đ',
        slug: 'tre-hoa-vung-kin',
      },
    ],
  };

  const ctaSection = servicesPage?.cta_section || {
    title: 'Bạn cần tư vấn thêm?',
    description: 'Liên hệ ngay với chúng tôi để được bác sĩ tư vấn miễn phí và nhận ưu đãi đặc biệt',
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--primary-purple-light)] via-[var(--accent-cream)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-[var(--foreground)] mb-6">
            {heroSection.title}
          </h1>
          <p className="text-xl text-[var(--gray-600)] max-w-3xl mx-auto">
            {heroSection.description}
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {servicesDetailSection.services?.map((service: any, index: number) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.slug || index}
                  id={service.slug}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color_gradient || 'from-pink-400 to-rose-400'} rounded-2xl mb-6`}>
                      <LucideIcon name={service.icon_name || 'Heart'} className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{service.title}</h2>
                    <p className="text-lg text-[var(--gray-600)] mb-6">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {service.details?.map((detail: any, idx: number) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-6 h-6 text-[var(--primary-purple)] flex-shrink-0 mt-0.5" />
                          <p className="text-[var(--foreground)]">{detail.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-6 mb-8">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-6 h-6 text-[var(--primary-purple)]" />
                        <div>
                          <p className="text-sm text-[var(--gray-600)]">Thời gian</p>
                          <p className="font-semibold text-[var(--foreground)]">{service.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-6 h-6 text-[var(--primary-purple)]" />
                        <div>
                          <p className="text-sm text-[var(--gray-600)]">Giá dịch vụ</p>
                          <p className="font-semibold text-[var(--foreground)]">{service.price}</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="primary" size="lg">
                      Đặt lịch tư vấn
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                      {service.image?.url ? (
                        <img 
                          src={getStrapiMedia(service.image.url) || ''} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-br ${service.color_gradient || 'from-pink-400 to-rose-400'} opacity-20`}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4 p-8">
                              <LucideIcon name={service.icon_name || 'Heart'} className="w-24 h-24 mx-auto text-white drop-shadow-lg" />
                              <p className="text-2xl font-semibold text-white drop-shadow-lg">{service.title}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary-purple)] to-[var(--primary-gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{ctaSection.title}</h2>
          <p className="text-xl text-white/90 mb-8">
            {ctaSection.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-[var(--primary-purple)] hover:bg-white/90">
              Đặt lịch ngay
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link href="/lien-he">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--primary-purple)]">
                Liên hệ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
