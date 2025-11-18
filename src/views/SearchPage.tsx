import type { Studio, Tag } from '../types'
import { Layout } from '../components/Layout'
import { TagNavigation } from '../components/TagNavigation'

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
  
  // Helper function to build filter URLs
  function removeFilter(key: string, value: string, currentFilters: typeof filters): string {
    const params = new URLSearchParams()
    
    if (key === 'tags') {
      const remaining = currentFilters.tags?.filter(t => t !== value) || []
      if (remaining.length > 0) params.set('tags', remaining.join(','))
    } else {
      if (currentFilters.tags) params.set('tags', currentFilters.tags.join(','))
    }
    
    if (key !== 'category' && currentFilters.category) params.set('category', currentFilters.category)
    if (key !== 'city' && currentFilters.city) params.set('city', currentFilters.city)
    if (key !== 'stage' && currentFilters.stage) params.set('stage', currentFilters.stage)
    if (key !== 'search' && currentFilters.search) params.set('search', currentFilters.search)
    
    if (browseType) params.set('type', browseType)
    
    return '/explore?' + params.toString()
  }
  
  return (
    <Layout>
      <style dangerouslySetInnerHTML={{
        __html: `
          body, * {
            font-family: 'SimSun', '宋体', serif !important;
          }
        `
      }}/>
      
      {/* Tag Navigation */}
      <TagNavigation tags={allTags.filter(t => t.category === 'concept')} />
      
      <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Studios Grid - Masonry Layout (Images Only) - FIXED LINKS */}
        <div class="masonry-grid">
          {studios.map(studio => {
            const aspectRatios = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]']
            const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
            
            return (
              <div class="masonry-item">
                <a 
                  href={`/studio/${studio.slug}`}
                  class="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style="display: block; cursor: pointer;"
                >
                  <div class={`${randomAspect} bg-gray-200 overflow-hidden`}>
                    {studio.cover_image_url ? (
                      <img 
                        src={studio.cover_image_url} 
                        alt={studio.name}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style="pointer-events: none;"
                      />
                    ) : (
                      <div class="w-full h-full flex items-center justify-center text-gray-400">
                        <i class="fas fa-image text-6xl"></i>
                      </div>
                    )}
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
