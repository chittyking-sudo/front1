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
  
  // Sample product concepts (would come from database)
  const productConcepts = [
    {
      title: '极简茶具系列',
      description: '探索茶道文化与现代设计的结合，用最简单的线条表达最纯粹的美学理念。',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
      status: '概念设计'
    },
    {
      title: '手工拉坯花器',
      description: '每一件都是独一无二的艺术品，承载着匠人的温度和时间的印记。',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600',
      status: '原型制作'
    },
    {
      title: '侘寂美学餐具',
      description: '接受不完美，发现残缺之美。每一道裂痕都是时光的馈赠。',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
      status: '测试阶段'
    }
  ]
  
  // Sample timeline (would come from database)
  const timeline = [
    {
      date: '2024-01',
      title: '工作室成立',
      description: '在景德镇古镇创立工作室，开始极简陶艺创作之路。',
      image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=400',
      milestone: true
    },
    {
      date: '2024-03',
      title: '首个系列发布',
      description: '「纯粹」系列茶具正式发布，获得设计界关注。',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400',
      milestone: false
    },
    {
      date: '2024-06',
      title: '入驻高端买手店',
      description: '作品进入上海、北京多家高端买手店销售。',
      image: null,
      milestone: true
    },
    {
      date: '2024-09',
      title: '参展米兰设计周',
      description: '受邀参加米兰设计周，作品获得国际认可。',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
      milestone: true
    },
    {
      date: '2024-11',
      title: '开设线下体验空间',
      description: '在杭州西湖边开设首家线下体验空间和工作坊。',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      milestone: false
    }
  ]
  
  return (
    <Layout>
      <style dangerouslySetInnerHTML={{
        __html: `
          body, * {
            font-family: 'SimSun', '宋体', serif !important;
          }
        `
      }}/>
      
      <div class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <a 
          href="/" 
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
        
        {/* Voting Section */}
        <div class="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <i class="fas fa-vote-yea text-3xl text-indigo-600"></i>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">社区治理投票</h3>
                  <p class="text-sm text-gray-600">参与工作室重要决策，让你的声音被听见</p>
                </div>
              </div>
              <p class="text-gray-700 mb-4">
                我们相信去中心化的社区治理。通过 Snapshot 平台，所有支持者都可以参与工作室的重要决策，包括新产品开发方向、设计理念选择、展览计划等。
              </p>
              <div class="flex gap-3">
                <a 
                  href="https://snapshot.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-external-link-alt"></i>
                  前往投票平台
                </a>
                <button class="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition border-2 border-indigo-200">
                  <i class="fas fa-info-circle mr-2"></i>
                  了解投票规则
                </button>
              </div>
            </div>
            <div class="ml-6 text-center">
              <div class="bg-white rounded-xl p-4 shadow-md">
                <div class="text-3xl font-bold text-indigo-600 mb-1">3</div>
                <div class="text-sm text-gray-600">进行中的提案</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description */}
        {studio.description && (
          <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">关于这个工作室</h3>
            <div class="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(studio.description) }} />
            </div>
          </div>
        )}
        
        {/* Product Concepts */}
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold">产品原型概念</h3>
            <span class="text-sm text-gray-500">
              <i class="fas fa-lightbulb mr-1"></i>
              展示创作过程和设计理念
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productConcepts.map((concept, idx) => (
              <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-200">
                <div class="aspect-square bg-gray-200 overflow-hidden relative">
                  <img 
                    src={concept.image}
                    alt={concept.title}
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-indigo-600 border border-indigo-200">
                      {concept.status}
                    </span>
                  </div>
                </div>
                <div class="p-5">
                  <h4 class="font-bold text-lg mb-2 text-gray-800">{concept.title}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{concept.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Production Timeline */}
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold">制作时间轴</h3>
            <span class="text-sm text-gray-500">
              <i class="fas fa-history mr-1"></i>
              记录工作室成长历程
            </span>
          </div>
          <div class="relative">
            {/* Timeline line */}
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
            
            {/* Timeline items */}
            <div class="space-y-8">
              {timeline.map((item, idx) => (
                <div class="relative pl-20">
                  {/* Timeline dot */}
                  <div class={`absolute left-6 w-5 h-5 rounded-full border-4 ${
                    item.milestone 
                      ? 'bg-indigo-500 border-indigo-200 shadow-lg shadow-indigo-500/50' 
                      : 'bg-white border-gray-300'
                  }`}></div>
                  
                  {/* Timeline content */}
                  <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-200">
                    <div class="flex items-start gap-4">
                      {item.image && (
                        <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                          <img 
                            src={item.image}
                            alt={item.title}
                            class="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                            {item.date}
                          </span>
                          {item.milestone && (
                            <span class="px-2 py-1 bg-yellow-50 text-yellow-600 rounded text-xs font-medium">
                              <i class="fas fa-star mr-1"></i>
                              里程碑
                            </span>
                          )}
                        </div>
                        <h4 class="font-bold text-lg mb-2 text-gray-800">{item.title}</h4>
                        <p class="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
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
