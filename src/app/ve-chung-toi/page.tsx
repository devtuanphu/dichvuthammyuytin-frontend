import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import LucideIcon from '@/components/LucideIcon';
import { Metadata } from 'next';

async function getAboutPageData() {
  const aboutPage = await fetchAPI('/about-page', { pLevel: 5 });

  return {
    aboutPage: aboutPage.data,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { aboutPage } = await getAboutPageData();
  const seo = aboutPage?.seo;

  return constructMetadata({
    metaTitle: seo?.metaTitle || 'Về chúng tôi - Đội ngũ Bác sĩ Thẩm mỹ Vùng kín Hàng đầu',
    metaDescription: seo?.metaDescription || 'Khám phá hành trình 15 năm và sứ mệnh cải thiện chất lượng cuộc sống cho phụ nữ Việt của Thẩm Mỹ Trần Điền.',
    keywords: seo?.keywords || 'về thẩm mỹ trần điền, đội ngũ bác sĩ thẩm mỹ',
    canonicalURL: seo?.canonicalURL || 'https://thammyvungkin.vn/ve-chung-toi',
    metaImage: seo?.metaImage?.url ? (getStrapiMedia(seo.metaImage.url) ?? undefined) : undefined,
  });
}

export default async function AboutPage() {
  const { aboutPage } = await getAboutPageData();

  // Extract sections with fallbacks
  const heroSection = aboutPage?.hero_section || {
    title: 'Về chúng tôi',
    description: 'Trung tâm thẩm mỹ vùng kín hàng đầu với sứ mệnh mang lại sự tự tin và hạnh phúc cho phụ nữ Việt',
    stats: [
      { label: 'Năm kinh nghiệm', value: '15+', icon_name: 'Award' },
      { label: 'Khách hàng', value: '10,000+', icon_name: 'Users' },
      { label: 'Hài lòng', value: '98%', icon_name: 'Heart' },
      { label: 'An toàn', value: '100%', icon_name: 'Shield' },
    ],
  };

  const storySection = aboutPage?.story_section || {
    title: 'Câu chuyện của chúng tôi',
    paragraphs: [
      { content: 'Ra đời từ năm 2010, chúng tôi đã không ngừng nỗ lực để trở thành địa chỉ tin cậy hàng đầu trong lĩnh vực thẩm mỹ vùng kín tại Việt Nam.' },
      { content: 'Với đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo bài bản trong và ngoài nước, cùng với trang thiết bị hiện đại nhất, chúng tôi cam kết mang đến dịch vụ chất lượng cao nhất.' },
      { content: 'Chúng tôi hiểu rằng mỗi khách hàng đều có nhu cầu riêng biệt. Vì vậy, chúng tôi luôn lắng nghe, tư vấn tận tâm và đưa ra giải pháp phù hợp nhất cho từng cá nhân.' },
    ],
  };

  const valuesSection = aboutPage?.values_section || {
    title: 'Giá trị cốt lõi',
    description: 'Những giá trị mà chúng tôi luôn hướng tới trong mọi hoạt động',
    values: [
      { title: 'Chuyên nghiệp', description: 'Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo bài bản', icon_name: 'Award' },
      { title: 'An toàn', description: 'Công nghệ hiện đại, quy trình chuẩn y khoa', icon_name: 'Shield' },
      { title: 'Riêng tư', description: 'Đảm bảo bảo mật thông tin tuyệt đối', icon_name: 'Target' },
      { title: 'Hiệu quả', description: 'Cam kết kết quả rõ rệt, bền vững', icon_name: 'TrendingUp' },
    ],
  };

  const doctorsSection = aboutPage?.doctors_section || {
    title: 'Đội ngũ bác sĩ',
    description: 'Các bác sĩ chuyên môn cao, giàu kinh nghiệm và tận tâm',
    doctors: [
      { name: 'BS. CK1 Nguyễn Thị A', title: 'Bác sĩ Chuyên khoa I', specialty: 'Chuyên gia Thẩm mỹ Vùng kín', experience: '15 năm kinh nghiệm' },
      { name: 'BS. CK2 Trần Văn B', title: 'Bác sĩ Chuyên khoa II', specialty: 'Chuyên gia Laser Y khoa', experience: '12 năm kinh nghiệm' },
      { name: 'BS. Lê Thị C', title: 'Bác sĩ Đa khoa', specialty: 'Chuyên gia Tư vấn Sức khỏe', experience: '10 năm kinh nghiệm' },
    ],
  };

  const certificationsSection = aboutPage?.certifications_section || {
    title: 'Chứng nhận & Giấy phép',
    description: 'Chúng tôi tự hào với các chứng nhận và giấy phép hoạt động hợp pháp, đảm bảo chất lượng dịch vụ.',
    certifications: [
      { label: 'Giấy phép hoạt động của Sở Y tế' },
      { label: 'Chứng nhận ISO 9001:2015' },
      { label: 'Chứng nhận thiết bị y tế hợp chuẩn' },
      { label: 'Chứng chỉ đào tạo quốc tế' },
    ],
  };

  const ctaSection = aboutPage?.cta_section || {
    title: 'Hãy để chúng tôi đồng hành cùng bạn',
    description: 'Đặt lịch tư vấn miễn phí ngay hôm nay để trải nghiệm dịch vụ chuyên nghiệp',
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--primary-purple-light)] via-[var(--accent-cream)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[var(--foreground)] mb-6">
              {heroSection.title}
            </h1>
            <p className="text-xl text-[var(--gray-600)] max-w-3xl mx-auto">
              {heroSection.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {heroSection.stats?.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full mb-4">
                  <LucideIcon name={stat.icon_name || 'Award'} className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-[var(--primary-purple)] mb-2">{stat.value}</p>
                <p className="text-[var(--gray-600)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">{storySection.title}</h2>
              <div className="space-y-4 text-lg text-[var(--gray-600)]">
                {storySection.paragraphs?.map((para: any, index: number) => (
                  <p key={index}>{para.content}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                {storySection.image?.url ? (
                  <img 
                    src={getStrapiMedia(storySection.image.url) || ''} 
                    alt="Story" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-purple)]/30 to-[var(--primary-gold)]/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <LucideIcon name="Heart" className="w-24 h-24 mx-auto text-white drop-shadow-lg" />
                        <p className="text-2xl font-semibold text-white drop-shadow-lg">15 năm đồng hành</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--accent-cream)] to-[var(--primary-purple-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{valuesSection.title}</h2>
            <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
              {valuesSection.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesSection.values?.map((value: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full mb-6">
                  <LucideIcon name={value.icon_name || 'Award'} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">{value.title}</h3>
                <p className="text-[var(--gray-600)]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{doctorsSection.title}</h2>
            <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
              {doctorsSection.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {doctorsSection.doctors?.map((doctor: any, index: number) => (
              <div key={index} className="bg-gradient-to-br from-white to-[var(--accent-cream)] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full mx-auto mb-6 flex items-center justify-center">
                  {doctor.image?.url ? (
                    <img 
                      src={getStrapiMedia(doctor.image.url) || ''} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <LucideIcon name="Users" className="w-12 h-12 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] text-center mb-2">{doctor.name}</h3>
                <p className="text-[var(--primary-purple)] font-semibold text-center mb-1">{doctor.title}</p>
                <p className="text-[var(--gray-600)] text-center mb-2">{doctor.specialty}</p>
                <p className="text-sm text-[var(--gray-600)] text-center">{doctor.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary-purple-light)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                {certificationsSection.image?.url ? (
                  <img 
                    src={getStrapiMedia(certificationsSection.image.url) || ''} 
                    alt="Certifications" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-purple)]/30 to-[var(--primary-gold)]/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <LucideIcon name="Award" className="w-24 h-24 mx-auto text-white drop-shadow-lg" />
                        <p className="text-2xl font-semibold text-white drop-shadow-lg">Chứng nhận uy tín</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">{certificationsSection.title}</h2>
              <p className="text-lg text-[var(--gray-600)] mb-8">
                {certificationsSection.description}
              </p>
              <div className="space-y-4">
                {certificationsSection.certifications?.map((cert: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[var(--primary-purple)] flex-shrink-0 mt-1" />
                    <p className="text-lg text-[var(--foreground)]">{cert.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="primary" size="lg" className="mt-8">
                Xem chi tiết
              </Button>
            </div>
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
          <Button variant="secondary" size="lg" className="bg-white text-[var(--primary-purple)] hover:bg-white/90">
            Đặt lịch ngay
          </Button>
        </div>
      </section>
    </div>
  );
}
