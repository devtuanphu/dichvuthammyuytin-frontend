'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Send } from 'lucide-react';

interface ContactFormProps {
  formTitle?: string;
  formDescription?: string;
}

export function ContactForm({ formTitle = 'Đặt lịch tư vấn', formDescription = 'Thông tin của bạn sẽ được bảo mật tuyệt đối' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.NEXT_PUBLIC_STRAPI_TOKEN ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` } : {}),
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gradient-to-br from-[var(--primary-purple-light)] to-[var(--accent-cream)] p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] bg-white"
            placeholder="Nhập họ và tên"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] bg-white"
            placeholder="Nhập số điện thoại"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Nội dung
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] bg-white resize-none"
            placeholder="Nhập nội dung cần tư vấn..."
            disabled={isSubmitting}
          />
        </div>

        {submitStatus === 'success' && (
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            Có lỗi xảy ra. Vui lòng thử lại sau.
          </div>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full text-white font-bold tracking-wider"
          disabled={isSubmitting}
        >
          <Send className="w-5 h-5 mr-2" />
          {isSubmitting ? 'ĐANG GỬI...' : 'GỬI THÔNG TIN'}
        </Button>

        <p className="text-sm text-[var(--gray-600)] text-center">
          {formDescription}
        </p>
      </form>
    </div>
  );
}
