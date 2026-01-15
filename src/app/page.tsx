
import { Button } from '@/components/ui/Button';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import LucideIcon from '@/components/LucideIcon';
import { Metadata } from 'next';

async function getHomePageData() {
  const homepage = await fetchAPI('/homepage', { pLevel: 5 });

  return {
    homepage: homepage.data,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { homepage } = await getHomePageData();
  const seo = homepage?.seo;

  return constructMetadata({
    metaTitle: seo?.metaTitle || 'Thẩm Mỹ Vùng Kín Trần Điền - Tự tin với Vẻ đẹp riêng tư',
    metaDescription: seo?.metaDescription || 'Trung tâm thẩm mỹ vùng kín uy tín hàng đầu. Chuyên làm hồng, thu hẹp, trẻ hóa vùng kín bằng công nghệ Laser CO2 Fractional hiện đại.',
    keywords: seo?.keywords,
    canonicalURL: seo?.canonicalURL || 'https://thammyvungkin.vn',
    metaImage: seo?.metaImage?.url ? (getStrapiMedia(seo.metaImage.url) ?? undefined) : undefined,
  });
}

export default async function Home() {
  const { homepage } = await getHomePageData();

  // Extract sections with fallbacks
  const hero = homepage?.hero_section || {
    badge: 'Công nghệ Laser hiện đại nhất',
    title: 'Tự tin với',
    highlight: 'Vẻ đẹp riêng tư',
    description: 'Chúng tôi mang đến giải pháp thẩm mỹ vùng kín an toàn, hiệu quả với đội ngũ bác sĩ chuyên môn cao và công nghệ tiên tiến nhất.',
    cta_text: 'Đặt lịch tư vấn miễn phí',
    phone: '0123 456 789',
    stats: [
      { label: 'Khách hàng tin tưởng', value: '10,000+' },
      { label: 'Năm kinh nghiệm', value: '15+' },
      { label: 'Hài lòng', value: '98%' },
    ],
  };

  const servicesSection = homepage?.services_section || {
    title: 'Dịch vụ của chúng tôi',
    description: 'Các giải pháp thẩm mỹ vùng kín toàn diện với công nghệ hiện đại và đội ngũ bác sĩ giàu kinh nghiệm',
    services: [
      { title: 'Làm hồng vùng kín', description: 'Công nghệ Laser CO2 Fractional giúp làm hồng tự nhiên, an toàn và lâu dài.', icon_name: 'Heart', color_gradient: 'from-pink-400 to-rose-400', slug: 'lam-hong-vung-kin' },
      { title: 'Thu hẹp âm đạo', description: 'Phương pháp Laser không đau, không cần nghỉ dưỡng, hiệu quả ngay sau 1 lần.', icon_name: 'Sparkles', color_gradient: 'from-purple-400 to-pink-400', slug: 'thu-hep-am-dao' },
      { title: 'Tạo hình môi lớn', description: 'Tạo hình thẩm mỹ, cải thiện độ đàn hồi và màu sắc tự nhiên.', icon_name: 'Award', color_gradient: 'from-rose-400 to-orange-400', slug: 'tao-hinh-moi-lon' },
      { title: 'Trẻ hóa vùng kín', description: 'Kích thích tái tạo collagen, phục hồi độ ẩm và độ đàn hồi.', icon_name: 'Shield', color_gradient: 'from-blue-400 to-purple-400', slug: 'tre-hoa-vung-kin' },
    ],
  };

  const benefitsSection = homepage?.benefits_section || {
    title: 'Tại sao chọn chúng tôi?',
    benefits_list: [
      { label: 'Đội ngũ bác sĩ chuyên môn cao, giàu kinh nghiệm' },
      { label: 'Công nghệ Laser CO2 Fractional hiện đại nhất' },
      { label: 'Quy trình khép kín, đảm bảo riêng tư tuyệt đối' },
      { label: 'Cam kết an toàn, không đau, không cần nghỉ dưỡng' },
      { label: 'Tư vấn miễn phí, hỗ trợ 24/7' },
      { label: 'Giá cả minh bạch, nhiều ưu đãi hấp dẫn' },
    ],
  };

  const processSection = homepage?.process_section || {
    title: 'Quy trình điều trị',
    description: '4 bước đơn giản để bạn có được kết quả như mong đợi',
    steps: [
      { step_number: '01', title: 'Tư vấn', description: 'Bác sĩ thăm khám và tư vấn phương pháp phù hợp' },
      { step_number: '02', title: 'Kiểm tra', description: 'Kiểm tra sức khỏe tổng quát và vùng điều trị' },
      { step_number: '03', title: 'Thực hiện', description: 'Tiến hành liệu trình với công nghệ hiện đại' },
      { step_number: '04', title: 'Chăm sóc', description: 'Theo dõi và chăm sóc sau điều trị' },
    ],
  };

  const testimonialsSection = homepage?.testimonials_section || {
    title: 'Khách hàng nói gì về chúng tôi',
    description: 'Hàng ngàn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi',
    testimonials: [
      { name: 'Chị Minh Anh', age: 32, rating: 5, content: 'Tôi rất hài lòng với dịch vụ tại đây. Bác sĩ tư vấn tận tình, quy trình chuyên nghiệp và kết quả vượt mong đợi.' },
      { name: 'Chị Thu Hà', age: 28, rating: 5, content: 'Không gian riêng tư, sạch sẽ. Sau liệu trình tôi cảm thấy tự tin hơn rất nhiều.' },
      { name: 'Chị Lan Phương', age: 35, rating: 5, content: 'Dịch vụ tuyệt vời, giá cả hợp lý. Tôi đã giới thiệu cho nhiều người bạn.' },
    ],
  };

  const ctaSection = homepage?.cta_section || {
    title: 'Sẵn sàng bắt đầu hành trình của bạn?',
    description: 'Đặt lịch tư vấn miễn phí ngay hôm nay để được bác sĩ thăm khám và tư vấn chi tiết',
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[var(--primary-purple-light)] via-[var(--accent-cream)] to-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <LucideIcon name="Sparkles" className="w-5 h-5 text-[var(--primary-gold)]" />
                <span className="text-sm font-medium text-[var(--foreground)]">{hero.badge}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] leading-tight">
                {hero.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-purple)] to-[var(--primary-gold)]">
                  {hero.highlight}
                </span>
              </h1>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                {hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  {hero.cta_text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Gọi ngay: {hero.phone}
                </Button>
              </div>
              <div className="flex items-center pt-4">
                {hero.stats?.map((stat: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div>
                      <p className="text-3xl font-bold text-[var(--primary-purple)]">{stat.value}</p>
                      <p className="text-sm text-[var(--gray-600)]">{stat.label}</p>
                    </div>
                    {index < hero.stats.length - 1 && <div className="mx-8 h-12 w-px bg-[var(--gray-300)] hidden sm:block"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {hero.image?.url ? (
                  <img 
                    src={getStrapiMedia(hero.image.url) || ''} 
                    alt="Hero" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-purple)]/20 to-[var(--primary-gold)]/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full flex items-center justify-center shadow-xl">
                          <LucideIcon name="Sparkles" className="w-16 h-16 text-white" />
                        </div>
                        <p className="text-2xl font-semibold text-[var(--foreground)]">Hình ảnh minh họa</p>
                        <p className="text-[var(--gray-600)]">Không gian phòng khám sang trọng</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--primary-gold)] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--primary-purple)] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{servicesSection.title}</h2>
            <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
              {servicesSection.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesSection.services?.map((service: any, index: number) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-[var(--accent-cream)] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color_gradient || 'from-pink-400 to-rose-400'} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <LucideIcon name={service.icon_name || 'Heart'} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">{service.title}</h3>
                <p className="text-[var(--gray-600)] mb-4">{service.description}</p>
                <Link href={`/dich-vu/${service.slug}`} className="inline-flex items-center text-[var(--primary-purple)] font-medium group-hover:gap-2 transition-all">
                  Tìm hiểu thêm
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[var(--accent-cream)] to-[var(--primary-purple-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">{benefitsSection.title}</h2>
              <div className="space-y-6">
                {benefitsSection.benefits_list?.map((item: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-[var(--primary-purple)] flex-shrink-0 mt-1" />
                    <p className="text-lg text-[var(--foreground)]">{item.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="primary" size="lg" className="mt-8">
                Đặt lịch ngay
              </Button>
            </div>
            <div className="relative">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                {benefitsSection.image?.url ? (
                  <img 
                    src={getStrapiMedia(benefitsSection.image.url) || ''} 
                    alt="Benefits" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-purple)]/30 to-[var(--primary-gold)]/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <LucideIcon name="Shield" className="w-24 h-24 mx-auto text-white drop-shadow-lg" />
                        <p className="text-2xl font-semibold text-white drop-shadow-lg">An toàn - Hiệu quả</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{processSection.title}</h2>
            <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
              {processSection.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSection.steps?.map((item: any, index: number) => (
              <div key={index} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">{item.step_number}</span>
                </div>
                {index < processSection.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-[var(--primary-purple)] to-transparent"></div>
                )}
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-[var(--gray-600)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary-purple-light)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{testimonialsSection.title}</h2>
            <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
              {testimonialsSection.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsSection.testimonials?.map((testimonial: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <LucideIcon key={i} name="Star" className="w-5 h-5 fill-[var(--primary-gold)] text-[var(--primary-gold)]" />
                  ))}
                </div>
                <p className="text-[var(--gray-600)] mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                  {testimonial.age && <p className="text-sm text-[var(--gray-600)]">{testimonial.age} tuổi</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary-purple)] to-[var(--primary-gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {ctaSection.title}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {ctaSection.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-[var(--primary-purple)] hover:bg-white/90">
              Đặt lịch tư vấn
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--primary-purple)]">
              <Phone className="w-5 h-5 mr-2" />
              {hero.phone}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
