interface Tag {
  name: string
  slug: string
  color: string
}

interface LandingPageProps {
  tags: Tag[]
}

export function LandingPage({ tags }: LandingPageProps) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Studio Network</title>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              overflow: hidden;
              background: #0a0a0a;
              font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
              cursor: none;
            }
            
            #container {
              width: 100vw;
              height: 100vh;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            #ring-container {
              position: relative;
              width: 600px;
              height: 600px;
            }
            
            .tag-item {
              position: absolute;
              color: white;
              font-size: 18px;
              font-weight: 500;
              text-decoration: none;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              white-space: nowrap;
              user-select: none;
              cursor: none;
              transform-origin: center;
              z-index: 10;
            }
            
            .tag-item:hover {
              font-size: 28px;
              font-weight: 700;
              z-index: 20;
            }
            
            /* Custom cursor */
            #cursor {
              position: fixed;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              pointer-events: none;
              z-index: 9999;
              transition: transform 0.15s ease, background-color 0.3s ease;
              transform: translate(-50%, -50%);
              mix-blend-mode: difference;
            }
            
            #cursor.hover {
              transform: translate(-50%, -50%) scale(1.5);
            }
            
            /* Loading indicator */
            #loading {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #ffffff;
              font-size: 14px;
              opacity: 0.5;
              z-index: 5;
            }
            
            /* Center dot */
            #center-dot {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
              opacity: 0.3;
            }
            
            /* Connection lines */
            svg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }
            
            .connection-line {
              stroke: rgba(255, 255, 255, 0.15);
              stroke-width: 1;
              fill: none;
            }
            
            @media (max-width: 768px) {
              #ring-container {
                width: 400px;
                height: 400px;
              }
              
              .tag-item {
                font-size: 14px;
              }
              
              .tag-item:hover {
                font-size: 20px;
              }
            }
          `
        }}/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <div id="loading">Loading...</div>
        <div id="cursor"></div>
        
        <div id="container">
          <div id="ring-container">
            <div id="center-dot"></div>
            <svg id="connections"></svg>
            {tags.map((tag, index) => (
              <a 
                href={`/explore?tags=${tag.slug}&type=concept`}
                class="tag-item"
                data-index={index}
                data-total={tags.length}
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Configuration
            const RADIUS = 250; // Ring radius
            const CENTER_X = 300;
            const CENTER_Y = 300;
            const ROTATION_SPEED = 0.0003; // Slow rotation speed
            
            // State
            let rotation = 0;
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let targetRotation = 0;
            
            // Get elements
            const tagItems = document.querySelectorAll('.tag-item');
            const cursor = document.getElementById('cursor');
            const svg = document.getElementById('connections');
            const loading = document.getElementById('loading');
            
            // Hide loading
            setTimeout(() => {
              loading.style.display = 'none';
            }, 300);
            
            // Calculate responsive radius
            function getRadius() {
              if (window.innerWidth < 768) {
                return 160; // Smaller radius for mobile
              }
              return RADIUS;
            }
            
            function getCenterX() {
              return window.innerWidth < 768 ? 200 : CENTER_X;
            }
            
            function getCenterY() {
              return window.innerHeight < 768 ? 200 : CENTER_Y;
            }
            
            // Position tags in a circle
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
            
            // Draw connection lines between tags
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
                  pathData += \`M \${x1} \${y1} \`;
                }
                pathData += \`L \${x2} \${y2} \`;
              }
              
              // Close the ring
              pathData += 'Z';
              
              svg.innerHTML = \`<path class="connection-line" d="\${pathData}" />\`;
            }
            
            // Mouse move handler
            document.addEventListener('mousemove', (e) => {
              mouseX = e.clientX;
              mouseY = e.clientY;
              
              // Update cursor position
              cursor.style.left = mouseX + 'px';
              cursor.style.top = mouseY + 'px';
              
              // Calculate rotation based on mouse position
              const containerRect = document.getElementById('ring-container').getBoundingClientRect();
              const containerCenterX = containerRect.left + containerRect.width / 2;
              const containerCenterY = containerRect.top + containerRect.height / 2;
              
              const deltaX = mouseX - containerCenterX;
              const deltaY = mouseY - containerCenterY;
              
              // Calculate target rotation (mouse influences rotation)
              targetRotation = Math.atan2(deltaY, deltaX) * 0.1;
            });
            
            // Tag hover effects
            tagItems.forEach(tag => {
              tag.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
              });
              
              tag.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
              });
            });
            
            // Animation loop
            function animate() {
              // Smooth rotation interpolation
              rotation += (targetRotation - rotation) * 0.05;
              
              // Continuous slow rotation
              rotation += ROTATION_SPEED;
              
              // Update positions
              positionTags();
              
              requestAnimationFrame(animate);
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
              positionTags();
            });
            
            // Initial setup
            positionTags();
            animate();
          `
        }}/>
      </body>
    </html>
  )
}
