import { ContactForm } from '@/components/forms/ContactForm';
import { constructMetadata } from '@/lib/seo';
import { fetchAPI, getStrapiMedia } from '@/lib/strapi';
import LucideIcon from '@/components/LucideIcon';
import { Metadata } from 'next';

async function getContactPageData() {
  const contactPage = await fetchAPI('/contact-page', { pLevel: 5 });

  return {
    contactPage: contactPage.data,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { contactPage } = await getContactPageData();
  const seo = contactPage?.seo;

  return constructMetadata({
    metaTitle: seo?.metaTitle || 'Liên hệ Tư vấn & Đặt lịch Khám - Thẩm Mỹ Trần Điền',
    metaDescription: seo?.metaDescription || 'Kết nối trực tiếp với bác sĩ chuyên khoa để được tư vấn miễn phí.',
    keywords: seo?.keywords || 'liên hệ thẩm mỹ trần điền, hotline bác sĩ',
    canonicalURL: seo?.canonicalURL || 'https://thammyvungkin.vn/lien-he',
    metaImage: seo?.metaImage?.url ? (getStrapiMedia(seo.metaImage.url) ?? undefined) : undefined,
  });
}

export default async function ContactPage() {
  const { contactPage } = await getContactPageData();

  // Extract sections with fallbacks
  const heroSection = contactPage?.hero_section || {
    title: 'Liên hệ với chúng tôi',
    description: 'Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí trong thời gian sớm nhất',
  };

  const contactInfoSection = contactPage?.contact_info_section || {
    info_cards: [
      { icon_name: 'MapPin', title: 'Địa chỉ', content: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh', link: '' },
      { icon_name: 'Phone', title: 'Điện thoại', content: '0123 456 789', link: 'tel:0123456789' },
      { icon_name: 'Mail', title: 'Email', content: 'info@thammyvungkin.vn', link: 'mailto:info@thammyvungkin.vn' },
      { icon_name: 'Clock', title: 'Giờ làm việc', content: 'T2 - T7: 8:00 - 20:00\nCN: 8:00 - 17:00', link: '' },
    ],
  };

  const contactFormSection = contactPage?.contact_form_section || {
    form_title: 'Đặt lịch tư vấn',
    form_description: 'Thông tin của bạn sẽ được bảo mật tuyệt đối',
    map_address: '123 Đường ABC, Quận XYZ, TP. HCM',
    map_embed_url: '',
  };

  const faqSection = contactPage?.faq_section || {
    title: 'Câu hỏi thường gặp',
    description: 'Một số câu hỏi khách hàng thường quan tâm',
    faqs: [
      { question: 'Liệu trình có đau không?', answer: 'Các liệu trình của chúng tôi sử dụng công nghệ Laser hiện đại, gây tê tại chỗ nên hoàn toàn không đau.' },
      { question: 'Cần nghỉ dưỡng bao lâu?', answer: 'Hầu hết các liệu trình không cần nghỉ dưỡng, bạn có thể sinh hoạt bình thường ngay sau khi thực hiện.' },
      { question: 'Kết quả có lâu dài không?', answer: 'Kết quả rất lâu dài, có thể duy trì từ 3-5 năm tùy thuộc vào cơ địa và chế độ chăm sóc.' },
      { question: 'Thông tin có được bảo mật không?', answer: 'Chúng tôi cam kết bảo mật thông tin khách hàng 100%, quy trình khép kín và riêng tư tuyệt đối.' },
    ],
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

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfoSection.info_cards?.map((info: any, index: number) => (
              <div key={index} className="bg-gradient-to-br from-white to-[var(--accent-cream)] p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full mb-6">
                  <LucideIcon name={info.icon_name || 'Phone'} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-[var(--gray-600)] hover:text-[var(--primary-purple)] transition-colors">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-[var(--gray-600)] whitespace-pre-line">{info.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form (Client Component) */}
            <ContactForm 
              formTitle={contactFormSection.form_title} 
              formDescription={contactFormSection.form_description}
            />

            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-xl">
              {contactFormSection.map_embed_url ? (
                <iframe
                  src={contactFormSection.map_embed_url}
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="w-full h-full min-h-[600px] bg-gradient-to-br from-[var(--primary-purple)]/20 to-[var(--primary-gold)]/20 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <LucideIcon name="MapPin" className="w-24 h-24 mx-auto text-[var(--primary-purple)]" />
                    <p className="text-2xl font-semibold text-[var(--foreground)]">Bản đồ</p>
                    <p className="text-[var(--gray-600)]">{contactFormSection.map_address}</p>
                    <p className="text-sm text-[var(--gray-600)] max-w-md">
                      (Tích hợp Google Maps hoặc bản đồ khác tại đây)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--accent-cream)] to-[var(--primary-purple-light)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{faqSection.title}</h2>
            <p className="text-lg text-[var(--gray-600)]">
              {faqSection.description}
            </p>
          </div>
          <div className="space-y-6">
            {faqSection.faqs?.map((faq: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">{faq.question}</h3>
                <p className="text-[var(--gray-600)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
