import type { Studio, Tag } from '../types'
import { Layout } from '../components/Layout'

export function SearchPage({ 
  studios,
  allTags,
  filters,
  browseType
}: { 
  studios: Studio[]
  allTags: Tag[]
  filters: {
    category?: string
    tags?: string[]
    city?: string
    stage?: string
    search?: string
  }
  browseType?: string
}) {
  const selectedTags = filters.tags || []
  
  // Determine color scheme based on browse type
  const isConcept = browseType === 'concept'
  const isMaterial = browseType === 'material'
  const gradientClass = isConcept ? 'concept-gradient' : isMaterial ? 'material-gradient' : 'home-gradient'
  const cardClass = isConcept ? 'concept-card' : isMaterial ? 'material-card' : 'home-card'
  
  return (
    <Layout>
      <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters Section */}
        <div class={`${cardClass} rounded-2xl shadow-lg p-6 mb-8`}>
          <h2 class="text-2xl font-bold mb-4" style={`color: ${isConcept ? 'var(--concept-secondary)' : isMaterial ? 'var(--material-secondary)' : 'var(--home-primary)'};`}>筛选条件</h2>
          
          {/* Active Filters */}
          {(selectedTags.length > 0 || filters.category || filters.city || filters.stage || filters.search) && (
            <div class="mb-4 flex flex-wrap items-center gap-2">
              <span class="text-sm text-gray-600">已选择：</span>
              {selectedTags.map(tagSlug => {
                const tag = allTags.find(t => t.slug === tagSlug)
                return tag && (
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                    style={`background-color: ${tag.color}15; color: ${tag.color};`}
                  >
                    {tag.name}
                    <a 
                      href={removeFilter('tags', tagSlug, filters)}
                      class="hover:opacity-70"
                    >
                      ×
                    </a>
                  </span>
                )
              })}
              {filters.category && (
                <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2">
                  {filters.category}
                  <a href={removeFilter('category', '', filters)}>×</a>
                </span>
              )}
              {filters.city && (
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
                  {filters.city}
                  <a href={removeFilter('city', '', filters)}>×</a>
                </span>
              )}
              {filters.search && (
                <span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center gap-2">
                  搜索: {filters.search}
                  <a href={removeFilter('search', '', filters)}>×</a>
                </span>
              )}
              <a 
                href="/explore"
                class="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                清除所有
              </a>
            </div>
          )}
          
          {/* Tag Filters */}
          <div class="mb-4">
            <h3 class="font-semibold mb-2 text-gray-700">理念标签</h3>
            <div class="flex flex-wrap gap-2">
              {allTags.filter(t => t.category === 'concept').map(tag => (
                <a 
                  href={addFilter('tags', tag.slug, filters)}
                  class={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    selectedTags.includes(tag.slug)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105'
                  }`}
                  style={`background-color: ${tag.color}15; color: ${tag.color}; border: 2px solid ${tag.color}30;`}
                >
                  {tag.name} ({tag.usage_count})
                </a>
              ))}
            </div>
          </div>
          
          {/* Search Form */}
          <form action="/explore" method="GET" class="mb-4">
            <div class="flex gap-2">
              <input 
                type="text" 
                name="search" 
                value={filters.search || ''}
                placeholder="搜索工作室名称、描述..." 
                class="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              />
              <button 
                type="submit" 
                class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                搜索
              </button>
            </div>
          </form>
        </div>
        
        {/* Results */}
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold">
            找到 {studios.length} 个工作室
          </h2>
        </div>
        
        {/* Studios Grid - Masonry Layout */}
        <div class="masonry-grid">
          {studios.map(studio => {
            const aspectRatios = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]']
            const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
            
            return (
              <div class="masonry-item">
                <a 
                  href={`/studio/${studio.slug}`}
                  class={`group block ${cardClass} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                >
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
                
                <div class="p-5">
                  <h3 class="font-bold text-xl mb-2 group-hover:opacity-80 transition line-clamp-1" style={`color: ${isConcept ? 'var(--concept-secondary)' : isMaterial ? 'var(--material-secondary)' : 'var(--home-primary)'};`}>
                    {studio.name}
                  </h3>
                  {studio.tagline && (
                    <p class="text-gray-700 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {studio.tagline}
                    </p>
                  )}
                  
                  <div class="flex items-center gap-2 text-xs mb-3 flex-wrap">
                    {studio.category && (
                      <span class="px-3 py-1 rounded-full font-medium border-2" style={`background-color: ${isConcept ? 'var(--concept-light-2)' : isMaterial ? 'var(--material-primary)' : 'var(--home-light)'}; border-color: ${isConcept ? 'var(--concept-light-2)' : isMaterial ? 'var(--material-primary)' : 'var(--home-light)'};`}>
                        {studio.category}
                      </span>
                    )}
                    {studio.city && (
                      <span class="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full border-2 border-gray-200 text-gray-600">
                        <i class="fas fa-map-marker-alt"></i>
                        {studio.city}
                      </span>
                    )}
                  </div>
                  
                  <div class="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-200">
                    <span class="flex items-center gap-1">
                      <i class="fas fa-eye"></i>
                      {studio.view_count}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          )
        })}
        </div>
        
        {studios.length === 0 && (
          <div class="text-center py-16 bg-white rounded-xl">
            <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <p class="text-xl text-gray-600 mb-2">没有找到符合条件的工作室</p>
            <p class="text-gray-500 mb-6">试试调整筛选条件或搜索关键词</p>
            <a 
              href="/explore"
              class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              查看所有工作室
            </a>
          </div>
        )}
      </div>
    </Layout>
  )
}

// Helper functions for filter URLs
function addFilter(key: string, value: string, filters: any): string {
  const params = new URLSearchParams()
  
  if (key === 'tags') {
    const tags = filters.tags || []
    if (!tags.includes(value)) {
      tags.push(value)
    }
    params.set('tags', tags.join(','))
  } else {
    params.set(key, value)
  }
  
  // Preserve other filters
  Object.entries(filters).forEach(([k, v]) => {
    if (k !== key && v) {
      params.set(k, Array.isArray(v) ? v.join(',') : String(v))
    }
  })
  
  return `/explore?${params.toString()}`
}

function removeFilter(key: string, value: string, filters: any): string {
  const params = new URLSearchParams()
  
  Object.entries(filters).forEach(([k, v]) => {
    if (k === key) {
      if (k === 'tags' && Array.isArray(v)) {
        const tags = v.filter((t: string) => t !== value)
        if (tags.length > 0) {
          params.set('tags', tags.join(','))
        }
      }
      // Skip this filter
    } else if (v) {
      params.set(k, Array.isArray(v) ? v.join(',') : String(v))
    }
  })
  
  const query = params.toString()
  return query ? `/explore?${query}` : '/explore'
}
