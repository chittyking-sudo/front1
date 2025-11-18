import type { Tag, Studio } from '../types'

export function HomePage({ 
  tags, 
  studios 
}: { 
  tags: Record<string, Tag[]>
  studios: Studio[]
}) {
  const conceptTags = tags.concept || []
  
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Studio Network</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
        <link href="/static/style.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet"/>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'SimSun', '宋体', serif;
              cursor: none;
              overflow-x: hidden;
            }
            
            .finger-tag {
              cursor: pointer !important;
            }
            
            .finger-tag:hover {
              font-size: 18px !important;
              font-weight: 700 !important;
              text-shadow: 0 4px 16px rgba(255,255,255,0.4) !important;
            }
            
            a, button {
              cursor: pointer !important;
            }
            
            .masonry-item a {
              cursor: pointer !important;
              display: block;
            }
          `
        }}/>
      </head>
      <body>
        {/* Hero Section with Hand Background - Full Screen */}
        <div style="position: relative; height: 100vh; width: 100vw; overflow: hidden;">
          {/* Hand Background Image */}
          <div style="position: absolute; inset: 0; background-image: url('https://www.genspark.ai/api/files/s/kH9Pk265'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
          
          {/* Tags along white lines on fingers */}
          <div id="finger-tags-container">
            {conceptTags.slice(0, 10).map((tag, index) => (
              <a 
                href={`/explore?tags=${tag.slug}&type=concept`}
                class="finger-tag"
                data-index={index}
                style="position: absolute; color: white; font-size: 14px; font-weight: 600; text-decoration: none; text-shadow: 0 2px 10px rgba(0,0,0,0.4); transition: all 0.3s ease; white-space: nowrap; z-index: 10; letter-spacing: 0.08em; text-transform: uppercase;"
              >
                {tag.name}
              </a>
            ))}
          </div>
          
          {/* Custom Cursor */}
          <div id="cursor" style="position: fixed; width: 20px; height: 20px; border-radius: 50%; background: white; pointer-events: none; z-index: 9999; transition: transform 0.15s ease; transform: translate(-50%, -50%); mix-blend-mode: difference;"></div>
        </div>
        
        {/* Gallery Section - Image Masonry */}
        <div style="background: #f9fafb; min-height: 50vh; padding: 60px 0;">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="masonry-grid">
              {/* Show actual studios if available */}
              {studios.length > 0 ? (
                studios.map(studio => {
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
                })
              ) : (
                <>
                  {/* Placeholder images to show framework positions */}
                  {[
                    { aspect: 'aspect-square', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600' },
                    { aspect: 'aspect-[4/5]', url: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600' },
                    { aspect: 'aspect-[3/4]', url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600' },
                    { aspect: 'aspect-[16/9]', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600' },
                    { aspect: 'aspect-square', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600' },
                    { aspect: 'aspect-[4/5]', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' },
                    { aspect: 'aspect-[3/4]', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600' },
                    { aspect: 'aspect-[16/9]', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600' },
                    { aspect: 'aspect-square', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600' },
                    { aspect: 'aspect-[4/5]', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600' },
                    { aspect: 'aspect-[3/4]', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600' },
                    { aspect: 'aspect-[16/9]', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600' },
                  ].map((item, index) => (
                    <div class="masonry-item">
                      <div class="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div class={`${item.aspect} bg-gray-200 overflow-hidden`}>
                          <img 
                            src={item.url}
                            alt={`Placeholder ${index + 1}`}
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Finger Tags Positioning Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const fingerTags = document.querySelectorAll('.finger-tag');
              const cursor = document.getElementById('cursor');
              
              // Positions along the white text lines in the hand image
              // Coordinates match the white text placement in the uploaded image
              const fingerPositions = [
                // Left hand thumb - bottom left
                { x: 12, y: 75, rotation: -30 },
                { x: 17, y: 65, rotation: -25 },
                
                // Index finger
                { x: 24, y: 52, rotation: -15 },
                { x: 32, y: 40, rotation: -8 },
                
                // Middle finger
                { x: 40, y: 28, rotation: 0 },
                { x: 48, y: 18, rotation: 5 },
                
                // Ring finger
                { x: 57, y: 15, rotation: 10 },
                { x: 65, y: 18, rotation: 15 },
                
                // Pinky - top right
                { x: 72, y: 25, rotation: 20 },
                { x: 78, y: 35, rotation: 25 }
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
              
              // Custom cursor movement
              document.addEventListener('mousemove', (e) => {
                if (cursor) {
                  cursor.style.left = e.clientX + 'px';
                  cursor.style.top = e.clientY + 'px';
                }
              });
              
              // Tag hover effects
              fingerTags.forEach(tag => {
                tag.addEventListener('mouseenter', () => {
                  if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                  }
                });
                
                tag.addEventListener('mouseleave', () => {
                  if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                  }
                });
              });
              
              // Initialize
              positionTags();
              
              // Handle resize
              window.addEventListener('resize', positionTags);
            })();
          `
        }}/>
      </body>
    </html>
  )
}
