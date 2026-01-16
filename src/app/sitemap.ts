import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dichvuthammyuytin.com'
  
  // 1. Khai báo các trang tĩnh
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ve-chung-toi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // 2. Lấy danh sách bài viết từ Strapi để tạo dynamic sitemap
  try {
    const articlesResponse = await fetchAPI('/articles', {
      fields: ['slug', 'updatedAt', 'publishedDate'],
      pagination: { pageSize: 1000 } // Lấy tối đa 1000 bài
    })

    const articlePages: MetadataRoute.Sitemap = (articlesResponse.data || []).map((article: any) => ({
      url: `${baseUrl}/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedDate || new Date()),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    return [...staticPages, ...articlePages]
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
    return staticPages
  }
}
