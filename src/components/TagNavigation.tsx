import type { Tag } from '../types'

export function TagNavigation({ tags }: { tags: Tag[] }) {
  return (
    <div class="concept-gradient border-b-2 border-white/20 sticky top-16 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3 py-3 overflow-x-auto scrollbar-hide">
          <span class="text-white font-bold whitespace-nowrap text-sm">分类:</span>
          {tags.map(tag => (
            <a 
              href={`/explore?tags=${tag.slug}&type=concept`}
              class="concept-tag px-4 py-2 rounded-full text-sm font-bold transition hover:scale-105 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              {tag.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
