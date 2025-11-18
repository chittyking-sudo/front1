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
      {/* Tag Ring Hero Section */}
      <div class="home-gradient text-white" style="position: relative; min-height: 70vh; display: flex; align-items: center; justify-content: center;">
        <div id="ring-container" style="position: relative; width: 600px; height: 600px;">
          <div id="center-dot" style="position: absolute; top: 50%; left: 50%; width: 8px; height: 8px; background: white; border-radius: 50%; transform: translate(-50%, -50%); z-index: 1; opacity: 0.3;"></div>
          <svg id="connections" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></svg>
          {conceptTags.map((tag, index) => (
            <a 
              href={`/explore?tags=${tag.slug}&type=concept`}
              class="tag-item"
              data-index={index}
              data-total={conceptTags.length}
              style="position: absolute; color: white; font-size: 18px; font-weight: 500; text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); white-space: nowrap; user-select: none; cursor: pointer; transform-origin: center; z-index: 10;"
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
      
      {/* Tag Ring Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const RADIUS = 250;
            const CENTER_X = 300;
            const CENTER_Y = 300;
            const ROTATION_SPEED = 0.0003;
            
            let rotation = 0;
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let targetRotation = 0;
            
            const tagItems = document.querySelectorAll('.tag-item');
            const cursor = document.getElementById('cursor');
            const svg = document.getElementById('connections');
            
            function getRadius() {
              return window.innerWidth < 768 ? 160 : RADIUS;
            }
            
            function getCenterX() {
              return window.innerWidth < 768 ? 200 : CENTER_X;
            }
            
            function getCenterY() {
              return window.innerWidth < 768 ? 200 : CENTER_Y;
            }
            
            function positionTags() {
              const radius = getRadius();
              const centerX = getCenterX();
              const centerY = getCenterY();
              const totalTags = tagItems.length;
              
              tagItems.forEach((tag, index) => {
                const angle = (index / totalTags) * Math.PI * 2 + rotation;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                tag.style.left = x + 'px';
                tag.style.top = y + 'px';
                tag.style.transform = 'translate(-50%, -50%)';
              });
              
              drawConnections();
            }
            
            function drawConnections() {
              const radius = getRadius();
              const centerX = getCenterX();
              const centerY = getCenterY();
              const totalTags = tagItems.length;
              
              let pathData = '';
              
              for (let i = 0; i < totalTags; i++) {
                const angle1 = (i / totalTags) * Math.PI * 2 + rotation;
                const angle2 = ((i + 1) / totalTags) * Math.PI * 2 + rotation;
                
                const x1 = centerX + Math.cos(angle1) * radius;
                const y1 = centerY + Math.sin(angle1) * radius;
                const x2 = centerX + Math.cos(angle2) * radius;
                const y2 = centerY + Math.sin(angle2) * radius;
                
                if (i === 0) {
                  pathData += 'M ' + x1 + ' ' + y1 + ' ';
                }
                pathData += 'L ' + x2 + ' ' + y2 + ' ';
              }
              
              pathData += 'Z';
              svg.innerHTML = '<path style="stroke: rgba(255, 255, 255, 0.15); stroke-width: 1; fill: none;" d="' + pathData + '" />';
            }
            
            document.addEventListener('mousemove', (e) => {
              mouseX = e.clientX;
              mouseY = e.clientY;
              
              cursor.style.left = mouseX + 'px';
              cursor.style.top = mouseY + 'px';
              
              const containerRect = document.getElementById('ring-container').getBoundingClientRect();
              const containerCenterX = containerRect.left + containerRect.width / 2;
              const containerCenterY = containerRect.top + containerRect.height / 2;
              
              const deltaX = mouseX - containerCenterX;
              const deltaY = mouseY - containerCenterY;
              
              targetRotation = Math.atan2(deltaY, deltaX) * 0.1;
            });
            
            tagItems.forEach(tag => {
              tag.addEventListener('mouseenter', () => {
                tag.style.fontSize = '28px';
                tag.style.fontWeight = '700';
                tag.style.zIndex = '20';
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
              });
              
              tag.addEventListener('mouseleave', () => {
                tag.style.fontSize = '18px';
                tag.style.fontWeight = '500';
                tag.style.zIndex = '10';
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
              });
            });
            
            function animate() {
              rotation += (targetRotation - rotation) * 0.05;
              rotation += ROTATION_SPEED;
              positionTags();
              requestAnimationFrame(animate);
            }
            
            window.addEventListener('resize', positionTags);
            positionTags();
            animate();
          })();
        `
      }}/>
    </Layout>
  )
}
