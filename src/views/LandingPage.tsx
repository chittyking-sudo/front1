export function LandingPage({ tags }: { tags: any[] }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Studio Network</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet"/>
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
              font-family: 'Noto Sans SC', sans-serif;
            }
            
            #container {
              width: 100vw;
              height: 100vh;
              position: relative;
              cursor: none;
            }
            
            /* Custom cursor */
            #cursor {
              width: 20px;
              height: 20px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              position: fixed;
              pointer-events: none;
              z-index: 9999;
              transition: transform 0.15s ease;
              transform: translate(-50%, -50%);
            }
            
            #cursor.active {
              transform: translate(-50%, -50%) scale(1.5);
              background: rgba(255, 255, 255, 0.2);
            }
            
            /* Ring container */
            #ring {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 600px;
              height: 600px;
            }
            
            /* Tag elements */
            .tag {
              position: absolute;
              padding: 12px 24px;
              border-radius: 50px;
              font-size: 16px;
              font-weight: 500;
              color: #ffffff;
              border: 2px solid currentColor;
              background: rgba(0, 0, 0, 0.5);
              backdrop-filter: blur(10px);
              cursor: pointer;
              transition: all 0.3s ease;
              transform-origin: center;
              white-space: nowrap;
              user-select: none;
            }
            
            .tag:hover {
              transform: scale(1.1);
              box-shadow: 0 0 30px currentColor;
              background: rgba(0, 0, 0, 0.8);
            }
            
            /* Center dot */
            #center-dot {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 12px;
              height: 12px;
              background: #ffffff;
              border-radius: 50%;
              transform: translate(-50%, -50%);
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
              z-index: 10;
            }
            
            /* Connection lines */
            #lines {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0;
              height: 0;
            }
            
            .line {
              position: absolute;
              height: 2px;
              background: linear-gradient(90deg, transparent, currentColor, transparent);
              transform-origin: left center;
              opacity: 0.3;
              pointer-events: none;
            }
            
            /* Skip button */
            #skip-btn {
              position: fixed;
              bottom: 40px;
              right: 40px;
              background: rgba(255, 255, 255, 0.1);
              border: 2px solid rgba(255, 255, 255, 0.3);
              color: #ffffff;
              padding: 14px 28px;
              border-radius: 50px;
              font-family: 'Noto Sans SC', sans-serif;
              font-size: 15px;
              font-weight: 500;
              cursor: pointer;
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;
              z-index: 10;
            }
            
            #skip-btn:hover {
              background: rgba(255, 255, 255, 0.2);
              border-color: rgba(255, 255, 255, 0.5);
              transform: translateY(-2px);
              box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
            }
            
            /* Responsive */
            @media (max-width: 768px) {
              #ring {
                width: 400px;
                height: 400px;
              }
              
              .tag {
                padding: 8px 16px;
                font-size: 14px;
              }
            }
            
            @media (max-width: 480px) {
              #ring {
                width: 300px;
                height: 300px;
              }
              
              .tag {
                padding: 6px 12px;
                font-size: 12px;
              }
            }
          `
        }}/>
      </head>
      <body>
        <div id="container">
          <div id="cursor"></div>
          <div id="ring">
            <div id="center-dot"></div>
            <div id="lines"></div>
          </div>
        </div>
        <button id="skip-btn" onclick="window.location.href='/home'">进入主站 →</button>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Tags data
            const tags = ${JSON.stringify(tags)};
            
            // Custom cursor
            const cursor = document.getElementById('cursor');
            let cursorX = window.innerWidth / 2;
            let cursorY = window.innerHeight / 2;
            
            document.addEventListener('mousemove', (e) => {
              cursorX = e.clientX;
              cursorY = e.clientY;
            });
            
            function updateCursor() {
              cursor.style.left = cursorX + 'px';
              cursor.style.top = cursorY + 'px';
              requestAnimationFrame(updateCursor);
            }
            updateCursor();
            
            // Ring setup
            const ring = document.getElementById('ring');
            const linesContainer = document.getElementById('lines');
            const centerX = ring.offsetWidth / 2;
            const centerY = ring.offsetHeight / 2;
            const radius = Math.min(ring.offsetWidth, ring.offsetHeight) / 2 - 50;
            
            let rotation = 0;
            let targetRotation = 0;
            
            // Create tags
            tags.forEach((tag, index) => {
              const tagEl = document.createElement('div');
              tagEl.className = 'tag';
              tagEl.textContent = tag.name;
              tagEl.style.color = tag.color;
              tagEl.style.borderColor = tag.color;
              tagEl.dataset.index = index;
              
              // Click to navigate
              tagEl.addEventListener('click', () => {
                window.location.href = '/explore?tags=' + tag.slug + '&type=concept';
              });
              
              // Hover effect on cursor
              tagEl.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursor.style.borderColor = tag.color;
              });
              
              tagEl.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursor.style.borderColor = '#ffffff';
              });
              
              ring.appendChild(tagEl);
            });
            
            // Create connection lines
            tags.forEach((tag, index) => {
              const line = document.createElement('div');
              line.className = 'line';
              line.style.color = tag.color;
              linesContainer.appendChild(line);
            });
            
            // Position tags and lines
            function updatePositions() {
              const tagElements = document.querySelectorAll('.tag');
              const lineElements = document.querySelectorAll('.line');
              
              tagElements.forEach((tagEl, index) => {
                const angle = (rotation + (index / tags.length) * Math.PI * 2);
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                tagEl.style.left = x + 'px';
                tagEl.style.top = y + 'px';
                tagEl.style.transform = 'translate(-50%, -50%)';
              });
              
              // Update lines
              lineElements.forEach((line, index) => {
                const nextIndex = (index + 1) % tags.length;
                
                const angle1 = (rotation + (index / tags.length) * Math.PI * 2);
                const angle2 = (rotation + (nextIndex / tags.length) * Math.PI * 2);
                
                const x1 = Math.cos(angle1) * radius;
                const y1 = Math.sin(angle1) * radius;
                const x2 = Math.cos(angle2) * radius;
                const y2 = Math.sin(angle2) * radius;
                
                const dx = x2 - x1;
                const dy = y2 - y1;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);
                
                line.style.width = distance + 'px';
                line.style.left = x1 + 'px';
                line.style.top = y1 + 'px';
                line.style.transform = \`rotate(\${angle}rad)\`;
              });
            }
            
            // Mouse influence on rotation
            document.addEventListener('mousemove', (e) => {
              const centerScreenX = window.innerWidth / 2;
              const centerScreenY = window.innerHeight / 2;
              
              const dx = e.clientX - centerScreenX;
              const dy = e.clientY - centerScreenY;
              
              // Calculate target rotation based on mouse position
              targetRotation = Math.atan2(dy, dx) * 0.3;
            });
            
            // Animation loop
            function animate() {
              // Smooth rotation following mouse
              rotation += (targetRotation - rotation) * 0.05;
              
              // Auto rotation
              rotation += 0.002;
              
              updatePositions();
              requestAnimationFrame(animate);
            }
            
            // Start animation
            animate();
            
            // Handle window resize
            window.addEventListener('resize', () => {
              // Recalculate positions
              updatePositions();
            });
          `
        }}/>
      </body>
    </html>
  )
}
