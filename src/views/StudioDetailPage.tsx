import type { StudioWithTags, Studio } from '../types'
import { Layout } from '../components/Layout'

export function StudioDetailPage({ 
  studio,
  similarStudios 
}: { 
  studio: StudioWithTags
  similarStudios: Studio[]
}) {
  const links = studio.links ? JSON.parse(studio.links) : []
  
  return (
    <Layout>
      <div class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <a 
          href="/home" 
          class="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition"
        >
          <i class="fas fa-arrow-left"></i>
          返回首页
        </a>
        
        {/* Studio Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-3">{studio.name}</h1>
          {studio.tagline && (
            <p class="text-xl text-gray-600 mb-4">{studio.tagline}</p>
          )}
          
          {/* Meta info */}
          <div class="flex flex-wrap items-center gap-4 text-sm">
            {studio.category && (
              <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                {studio.category}
              </span>
            )}
            {studio.city && (
              <span class="flex items-center gap-1 text-gray-600">
                <i class="fas fa-map-marker-alt"></i>
                {studio.city}
              </span>
            )}
            {studio.stage && (
              <span class="flex items-center gap-1 text-gray-600">
                <i class="fas fa-info-circle"></i>
                {studio.stage}
              </span>
            )}
            <span class="flex items-center gap-1 text-gray-500">
              <i class="fas fa-eye"></i>
              {studio.view_count} 次浏览
            </span>
          </div>
        </div>
        
        {/* Tags */}
        {studio.tags && studio.tags.length > 0 && (
          <div class="mb-8">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">理念标签</h3>
            <div class="flex flex-wrap gap-2">
              {studio.tags.map(tag => (
                <a 
                  href={`/explore?tags=${tag.slug}`}
                  class="px-4 py-2 rounded-full text-sm font-medium transition hover:scale-105"
                  style={`background-color: ${tag.color}15; color: ${tag.color}; border: 2px solid ${tag.color}30;`}
                >
                  #{tag.name}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Images Gallery */}
        {studio.images && studio.images.length > 0 && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">作品展示</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studio.images.map((image, idx) => (
                <div 
                  class={`relative overflow-hidden rounded-xl bg-gray-200 ${
                    idx === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt_text || studio.name}
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                  {image.alt_text && (
                    <div class="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm">
                      {image.alt_text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Description */}
        {studio.description && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">关于这个工作室</h3>
            <div class="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(studio.description) }} />
            </div>
          </div>
        )}
        
        {/* External Links */}
        {links.length > 0 && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">外部链接</h3>
            <div class="flex flex-wrap gap-3">
              {links.map((link: any) => (
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition font-medium"
                >
                  <i class={getLinkIcon(link.type)}></i>
                  {link.type}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Similar Studios */}
        {similarStudios.length > 0 && (
          <div>
            <h3 class="text-2xl font-bold mb-6">相似理念的工作室</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarStudios.map(s => (
                <a 
                  href={`/studio/${s.slug}`}
                  class="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition"
                >
                  <div class="aspect-[16/9] bg-gray-200">
                    {s.cover_image_url && (
                      <img 
                        src={s.cover_image_url} 
                        alt={s.name}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div class="p-4">
                    <h4 class="font-bold mb-1 group-hover:text-indigo-600 transition">
                      {s.name}
                    </h4>
                    {s.tagline && (
                      <p class="text-sm text-gray-600 line-clamp-2">
                        {s.tagline}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

// Helper function to format markdown (simplified)
function formatMarkdown(text: string): string {
  return text
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[h|l])/gim, '<p class="mb-4">')
    .replace(/(?<![>])$/gim, '</p>')
}

// Helper function to get icon for link type
function getLinkIcon(type: string): string {
  const icons: Record<string, string> = {
    '小红书': 'fab fa-app-store-ios',
    '淘宝店': 'fas fa-shopping-cart',
    '公众号': 'fab fa-weixin',
    '微信': 'fab fa-weixin',
    'Instagram': 'fab fa-instagram',
    '独立网站': 'fas fa-globe',
  }
  return icons[type] || 'fas fa-link'
}
