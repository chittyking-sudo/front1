import type { Tag, Studio } from '../types'

export function HomePage({ 
  tags, 
  studios 
}: { 
  tags: Record<string, Tag[]>
  studios: Studio[]
}) {
  const conceptTags = tags.concept || []
  
  // Set target date: February 1, 2025 00:00:00
  const targetDate = new Date('2025-02-01T00:00:00').getTime()
  
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Studio Network</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
        <link href="/static/style.css" rel="stylesheet"/>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'SimSun', '宋体', serif;
              cursor: default;
              overflow-x: hidden;
              background: linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #2a5298 100%);
            }
            
            .countdown-container {
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 24px;
              padding: 48px 64px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .countdown-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
            }
            
            .countdown-number {
              font-size: 72px;
              font-weight: 700;
              color: white;
              line-height: 1;
              text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
            }
            
            .countdown-label {
              font-size: 20px;
              color: rgba(255, 255, 255, 0.8);
              font-weight: 400;
              letter-spacing: 0.05em;
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            
            .floating-element {
              animation: float 6s ease-in-out infinite;
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.6; }
            }
            
            .background-blur {
              position: absolute;
              border-radius: 50%;
              filter: blur(100px);
              animation: pulse 8s ease-in-out infinite;
            }
            
            .finger-tag {
              cursor: none !important;
              font-family: 'SimSun', '宋体', serif;
            }
            
            .finger-tag:hover {
              font-size: 18px !important;
              font-weight: 700 !important;
              text-shadow: 0 4px 16px rgba(255,255,255,0.4) !important;
            }
          `
        }}/>
      </head>
      <body>
        {/* Landing Page with Countdown */}
        <div style="position: relative; min-height: 100vh; width: 100vw; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px;">
          {/* Animated Background Elements */}
          <div class="background-blur" style="top: 10%; left: 15%; width: 400px; height: 400px; background: rgba(138, 43, 226, 0.3);"></div>
          <div class="background-blur" style="top: 60%; right: 10%; width: 500px; height: 500px; background: rgba(220, 20, 60, 0.3); animation-delay: 2s;"></div>
          <div class="background-blur" style="bottom: 20%; left: 40%; width: 350px; height: 350px; background: rgba(30, 144, 255, 0.3); animation-delay: 4s;"></div>
          
          {/* Main Content */}
          <div class="floating-element" style="text-align: center; z-index: 10; max-width: 1200px; width: 100%;">
            {/* Title */}
            <h1 style="font-size: 64px; font-weight: 700; color: white; margin-bottom: 16px; text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); line-height: 1.2;">
              Segment Anything
            </h1>
            
            {/* Subtitle */}
            <p style="font-size: 28px; color: rgba(255, 255, 255, 0.85); margin-bottom: 64px; font-weight: 300; letter-spacing: 0.02em;">
              A playground for interactive media
            </p>
            
            {/* Countdown Container */}
            <div class="countdown-container">
              <div style="display: flex; gap: 48px; justify-content: center; align-items: center;">
                {/* Days */}
                <div class="countdown-item">
                  <div id="days" class="countdown-number">01</div>
                  <div class="countdown-label">Days</div>
                </div>
                
                {/* Hours */}
                <div class="countdown-item">
                  <div id="hours" class="countdown-number">01</div>
                  <div class="countdown-label">Hours</div>
                </div>
                
                {/* Minutes */}
                <div class="countdown-item">
                  <div id="minutes" class="countdown-number">18</div>
                  <div class="countdown-label">Min</div>
                </div>
                
                {/* Seconds */}
                <div class="countdown-item">
                  <div id="seconds" class="countdown-number">25</div>
                  <div class="countdown-label">Sec</div>
                </div>
              </div>
            </div>
            
            {/* Enter Button */}
            <div style="margin-top: 48px;">
              <a 
                href="/explore"
                style="display: inline-block; padding: 16px 48px; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 50px; color: white; font-size: 18px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);"
                onmouseover="this.style.background='rgba(255, 255, 255, 0.25)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 48px rgba(0, 0, 0, 0.3)';"
                onmouseout="this.style.background='rgba(255, 255, 255, 0.15)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 32px rgba(0, 0, 0, 0.2)';"
              >
                <i class="fas fa-rocket" style="margin-right: 12px;"></i>
                进入探索
              </a>
            </div>
          </div>
        </div>
        
        {/* Gallery Section - Image Masonry */}
        <div style="background: #f9fafb; min-height: 50vh;">
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
        </div>
        
        {/* Countdown Timer Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Target date: February 1, 2025 00:00:00
              const targetDate = new Date('2025-02-01T00:00:00').getTime();
              
              function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate - now;
                
                if (distance < 0) {
                  document.getElementById('days').textContent = '00';
                  document.getElementById('hours').textContent = '00';
                  document.getElementById('minutes').textContent = '00';
                  document.getElementById('seconds').textContent = '00';
                  return;
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Pad with leading zeros
                document.getElementById('days').textContent = String(days).padStart(2, '0');
                document.getElementById('hours').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
              }
              
              // Update countdown immediately
              updateCountdown();
              
              // Update every second
              setInterval(updateCountdown, 1000);
            })();
          `
        }}/>
      </body>
    </html>
  )
}
