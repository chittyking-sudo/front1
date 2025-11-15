import type { Tag, Studio } from '../types'
import { Layout } from '../components/Layout'

export function HomePage({ 
  tags, 
  studios 
}: { 
  tags: Record<string, Tag[]>
  studios: Studio[]
}) {
  const conceptTags = tags.concept || []
  const materialTags = tags.material || []
  
  // Get unique categories and cities for filters
  const categories = [...new Set(studios.map(s => s.category).filter(Boolean))]
  const cities = [...new Set(studios.map(s => s.city).filter(Boolean))]
  
  return (
    <Layout>
      {/* Hero Section */}
      <div class="home-gradient text-white border-b-4 border-white/20">
        <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl sm:text-5xl font-bold mb-4 tracking-wide">
              独立工作室展示网络
            </h1>
            <p class="text-xl sm:text-2xl mb-8 text-white/90 font-light">
              跨行业按理念发现相似的创作者
            </p>
            
            {/* Search bar */}
            <form action="/explore" method="GET" class="max-w-2xl mx-auto">
              <div class="flex gap-2">
                <input 
                  type="text" 
                  name="search" 
                  placeholder="搜索工作室、理念标签..." 
                  class="flex-1 px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 border-2 border-white/50 shadow-lg"
                />
                <button 
                  type="submit" 
                  class="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-white/90 transition shadow-lg border-2 border-white/50"
                  style="background-color: var(--home-light); color: var(--home-primary);"
                >
                  <i class="fas fa-search mr-2"></i>
                  搜索
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Tags Section */}
      <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Concept Tags */}
        <div class="mb-12 p-6 rounded-2xl concept-gradient border-decorative">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
            <i class="fas fa-lightbulb"></i>
            按理念浏览
          </h2>
          <div class="flex flex-wrap gap-3">
            {conceptTags.map(tag => (
              <a 
                href={`/explore?tags=${tag.slug}&type=concept`}
                class="concept-tag px-6 py-3 rounded-full font-bold transition hover:scale-105 shadow-md hover:shadow-xl"
              >
                {tag.name}
                <span class="ml-2 text-sm opacity-80">({tag.usage_count})</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Material Tags */}
        {materialTags.length > 0 && (
          <div class="mb-12 p-6 rounded-2xl material-gradient border-decorative">
            <h2 class="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <i class="fas fa-cube"></i>
              按材料浏览
            </h2>
            <div class="flex flex-wrap gap-3">
              {materialTags.map(tag => (
                <a 
                  href={`/explore?tags=${tag.slug}&type=material`}
                  class="material-tag px-6 py-3 rounded-full font-bold transition hover:scale-105 shadow-md hover:shadow-xl"
                >
                  {tag.name}
                  <span class="ml-2 text-sm opacity-80">({tag.usage_count})</span>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Quick Filters */}
        <div class="mb-12">
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <i class="fas fa-filter text-blue-500"></i>
            快速筛选
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="font-semibold mb-3 text-gray-700">按品类</h3>
              <div class="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <a 
                    href={`/explore?category=${cat}`}
                    class="px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition font-medium"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 class="font-semibold mb-3 text-gray-700">按地区</h3>
              <div class="flex flex-wrap gap-2">
                {cities.map(city => (
                  <a 
                    href={`/explore?city=${city}`}
                    class="px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition font-medium"
                  >
                    {city}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Studios Grid */}
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold flex items-center gap-2">
              <i class="fas fa-th-large text-pink-500"></i>
              探索工作室
            </h2>
            <a 
              href="/explore" 
              class="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              查看全部 <i class="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
          
          <div class="masonry-grid">
            {studios.map(studio => (
              <StudioCard studio={studio} />
            ))}
          </div>
          
          {studios.length === 0 && (
            <div class="text-center py-16 text-gray-500">
              <i class="fas fa-inbox text-6xl mb-4 opacity-20"></i>
              <p class="text-xl">暂无工作室，敬请期待</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

function StudioCard({ studio }: { studio: Studio }) {
  // Random aspect ratio for masonry effect
  const aspectRatios = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]']
  const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
  
  return (
    <div class="masonry-item">
      <a 
        href={`/studio/${studio.slug}`}
        class="group block home-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        {/* Cover Image */}
        <div class={`${randomAspect} bg-gray-200 overflow-hidden`}>
          {studio.cover_image_url ? (
            <img 
              src={studio.cover_image_url} 
              alt={studio.name}
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div class="w-full h-full flex items-center justify-center text-gray-400">
              <i class="fas fa-image text-6xl"></i>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div class="p-5 border-t-4" style="border-color: var(--home-accent);">
          <h3 class="font-bold text-xl mb-2 group-hover:text-blue-600 transition line-clamp-1" style="color: var(--home-primary);">
            {studio.name}
          </h3>
          {studio.tagline && (
            <p class="text-gray-700 text-sm mb-3 line-clamp-2 leading-relaxed">
              {studio.tagline}
            </p>
          )}
          
          {/* Meta info */}
          <div class="flex items-center gap-2 text-xs mb-3 flex-wrap">
            {studio.category && (
              <span class="px-3 py-1 rounded-full font-medium border-2" style="background-color: var(--home-light); color: var(--home-primary); border-color: var(--home-accent);">
                {studio.category}
              </span>
            )}
            {studio.city && (
              <span class="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full border-2 border-gray-200" style="color: var(--home-secondary);">
                <i class="fas fa-map-marker-alt"></i>
                {studio.city}
              </span>
            )}
          </div>
          
          {/* Stats */}
          <div class="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-200">
            <span class="flex items-center gap-1">
              <i class="fas fa-eye"></i>
              {studio.view_count}
            </span>
            <span class="flex items-center gap-1">
              <i class="fas fa-heart"></i>
              {studio.favorite_count}
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}
