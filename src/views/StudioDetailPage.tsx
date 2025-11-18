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
  const productConcepts = studio.productConcepts || []
  const timelineEvents = studio.timelineEvents || []
  
  return (
    <Layout>
      <style dangerouslySetInnerHTML={{
        __html: `
          body, * {
            font-family: 'SimSun', '宋体', serif !important;
          }
          
          .masonry-grid-detail {
            column-count: 3;
            column-gap: 1rem;
          }
          
          @media (max-width: 1024px) {
            .masonry-grid-detail {
              column-count: 2;
            }
          }
          
          @media (max-width: 640px) {
            .masonry-grid-detail {
              column-count: 1;
            }
          }
          
          .masonry-item-detail {
            break-inside: avoid;
            margin-bottom: 1rem;
          }
          
          .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, #e5e7eb, #d1d5db);
          }
          
          .timeline-dot {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          
          .timeline-milestone {
            width: 24px;
            height: 24px;
          }
        `
      }}/>
      
      <div class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <a 
          href="/explore" 
          class="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition"
        >
          <i class="fas fa-arrow-left"></i>
          返回探索
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
        
        {/* Cover Image */}
        {studio.cover_image_url && (
          <div class="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={studio.cover_image_url} 
              alt={studio.name}
              class="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}
        
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
        
        {/* Description */}
        {studio.description && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">关于这个工作室</h3>
            <div class="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(studio.description) }} />
            </div>
          </div>
        )}
        
        {/* Product Concepts Section */}
        {productConcepts.length > 0 && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
              <i class="fas fa-lightbulb text-yellow-500"></i>
              产品原型概念
            </h3>
            <div class="masonry-grid-detail">
              {productConcepts.map((concept: any) => {
                const aspectRatios = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]']
                const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
                
                return (
                  <div class="masonry-item-detail">
                    <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                      <div class={`${randomAspect} bg-gray-200 overflow-hidden relative`}>
                        <img 
                          src={concept.image_url} 
                          alt={concept.title}
                          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div class="absolute top-3 right-3">
                          <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-sm">
                            {concept.status}
                          </span>
                        </div>
                      </div>
                      <div class="p-4">
                        <h4 class="font-bold text-lg mb-2">{concept.title}</h4>
                        {concept.description && (
                          <p class="text-sm text-gray-600">{concept.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {/* Timeline Section */}
        {timelineEvents.length > 0 && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
              <i class="fas fa-history text-blue-500"></i>
              发展时间轴
            </h3>
            <div class="relative">
              {/* Timeline line */}
              <div class="timeline-line hidden md:block"></div>
              
              {timelineEvents.map((event: any, index: number) => {
                const isLeft = index % 2 === 0
                const aspectRatios = ['aspect-square', 'aspect-[4/5]', 'aspect-video']
                const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
                
                return (
                  <div class={`relative mb-12 md:mb-16 ${isLeft ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'}`}>
                    {/* Timeline dot */}
                    <div 
                      class={`timeline-dot hidden md:block ${event.milestone ? 'timeline-milestone bg-indigo-600' : 'bg-gray-400'}`}
                      style="top: 2rem;"
                    ></div>
                    
                    <div class={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${isLeft ? 'md:text-right' : ''}`}>
                      {/* Date badge */}
                      <div class={`px-4 py-2 bg-gradient-to-r ${event.milestone ? 'from-indigo-500 to-purple-500' : 'from-gray-400 to-gray-500'}`}>
                        <span class="text-white font-bold text-sm">
                          {formatDate(event.date)}
                        </span>
                        {event.milestone && (
                          <i class="fas fa-star ml-2 text-yellow-300"></i>
                        )}
                      </div>
                      
                      {event.image_url && (
                        <div class={`${randomAspect} bg-gray-200 overflow-hidden`}>
                          <img 
                            src={event.image_url} 
                            alt={event.title}
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      
                      <div class="p-6">
                        <h4 class="font-bold text-xl mb-2">{event.title}</h4>
                        {event.description && (
                          <p class="text-gray-600">{event.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {/* Vote Section */}
        <div class="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 class="text-2xl font-bold mb-2 flex items-center gap-2">
                <i class="fas fa-vote-yea text-purple-600"></i>
                社区投票
              </h3>
              <p class="text-gray-600">
                喜欢这个工作室？为它投票支持！参与决策工作室的未来发展方向。
              </p>
            </div>
            <a 
              href="https://snapshot.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="px-8 py-4 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <i class="fas fa-external-link-alt"></i>
              前往投票
            </a>
          </div>
        </div>
        
        {/* Images Gallery */}
        {studio.images && studio.images.length > 0 && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
              <i class="fas fa-images text-green-500"></i>
              作品展示
            </h3>
            <div class="masonry-grid-detail">
              {studio.images.map((image: any) => {
                const aspectRatios = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]']
                const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
                
                return (
                  <div class="masonry-item-detail">
                    <div class={`${randomAspect} bg-gray-200 overflow-hidden rounded-xl shadow-lg relative group cursor-pointer`}>
                      <img 
                        src={image.url} 
                        alt={image.alt_text || studio.name}
                        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {image.alt_text && (
                        <div class="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          {image.alt_text}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
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

// Helper function to format date
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return `${year}年${months[parseInt(month) - 1]}`
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
