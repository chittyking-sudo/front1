import type { Tag, Studio } from '../types'
import { Layout } from '../components/Layout'
import { TagNavigation } from '../components/TagNavigation'

export function HomePage({ 
  tags, 
  studios 
}: { 
  tags: Record<string, Tag[]>
  studios: Studio[]
}) {
  const conceptTags = tags.concept || []
  
  return (
    <Layout>
      {/* Tag Navigation */}
      <TagNavigation tags={conceptTags} />
      {/* Hero Section with Hand Background */}
      <div class="hero-section" style="position: relative; height: 100vh; overflow: hidden; background: linear-gradient(135deg, #8BA5B0 0%, #A8BCC4 100%);">
        {/* Background Image */}
        <div style="position: absolute; inset: 0; background-image: url('https://www.genspark.ai/api/files/s/kH9Pk265'); background-size: cover; background-position: center; opacity: 0.95;"></div>
        
        {/* Tags along fingers */}
        <div id="finger-tags" style="position: absolute; inset: 0;">
          {conceptTags.slice(0, 10).map((tag, index) => (
            <a 
              href={`/explore?tags=${tag.slug}&type=concept`}
              class="finger-tag"
              data-index={index}
              style="position: absolute; color: white; font-size: 16px; font-weight: 600; text-decoration: none; text-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.3s ease; white-space: nowrap; cursor: pointer; z-index: 10; letter-spacing: 0.05em;"
            >
              {tag.name}
            </a>
          ))}
        </div>
        
        {/* Custom cursor */}
        <div id="cursor" style="position: fixed; width: 20px; height: 20px; border-radius: 50%; background: white; pointer-events: none; z-index: 9999; transition: transform 0.15s ease; transform: translate(-50%, -50%); mix-blend-mode: difference;"></div>
      </div>
      
      {/* Studios Gallery - Masonry Layout (Images Only) */}
      <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div class="masonry-grid">
          {studios.map(studio => {
            const aspectRatios = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]']
            const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
            
            return (
              <div class="masonry-item">
                <a 
                  href={`/studio/${studio.slug}`}
                  class="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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
                </a>
              </div>
            )
          })}
        </div>
        
        {studios.length === 0 && (
          <div class="text-center py-16 text-gray-500">
            <i class="fas fa-inbox text-6xl mb-4 opacity-20"></i>
            <p class="text-xl">暂无工作室，敬请期待</p>
          </div>
        )}
      </div>
      
      {/* Finger Tags Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const fingerTags = document.querySelectorAll('.finger-tag');
            const cursor = document.getElementById('cursor');
            
            // Define positions along the white lines on fingers (in percentages of viewport)
            // These positions trace the white text lines in the hand image
            const fingerPositions = [
              { x: 15, y: 68, rotation: -25 },   // Thumb base - left hand
              { x: 22, y: 58, rotation: -15 },   // Thumb mid
              { x: 28, y: 48, rotation: -8 },    // Index base
              { x: 35, y: 38, rotation: 0 },     // Index mid
              { x: 42, y: 28, rotation: 5 },     // Middle base
              { x: 48, y: 20, rotation: 8 },     // Middle mid
              { x: 55, y: 18, rotation: 12 },    // Ring base
              { x: 62, y: 22, rotation: 15 },    // Ring mid
              { x: 68, y: 28, rotation: 18 },    // Pinky base
              { x: 72, y: 35, rotation: 20 }     // Pinky mid
            ];
            
            function positionTags() {
              const vw = window.innerWidth;
              const vh = window.innerHeight;
              
              fingerTags.forEach((tag, index) => {
                if (index < fingerPositions.length) {
                  const pos = fingerPositions[index];
                  const x = (pos.x / 100) * vw;
                  const y = (pos.y / 100) * vh;
                  
                  tag.style.left = x + 'px';
                  tag.style.top = y + 'px';
                  tag.style.transform = 'translate(-50%, -50%) rotate(' + pos.rotation + 'deg)';
                }
              });
            }
            
            // Mouse cursor
            document.addEventListener('mousemove', (e) => {
              cursor.style.left = e.clientX + 'px';
              cursor.style.top = e.clientY + 'px';
            });
            
            // Tag hover effects
            fingerTags.forEach(tag => {
              tag.addEventListener('mouseenter', () => {
                tag.style.fontSize = '20px';
                tag.style.fontWeight = '700';
                tag.style.transform = tag.style.transform.replace('scale(1)', 'scale(1.2)');
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
              });
              
              tag.addEventListener('mouseleave', () => {
                tag.style.fontSize = '16px';
                tag.style.fontWeight = '600';
                tag.style.transform = tag.style.transform.replace('scale(1.2)', 'scale(1)');
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
              });
            });
            
            // Initialize positions
            positionTags();
            
            // Responsive positioning
            window.addEventListener('resize', positionTags);
          })();
        `
      }}/>
    </Layout>
  )
}
