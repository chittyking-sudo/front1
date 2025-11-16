export function LandingPage() {
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
            }
            
            #canvas-container {
              width: 100vw;
              height: 100vh;
              cursor: none;
            }
            
            canvas {
              display: block;
            }
            
            /* Loading indicator */
            #loading {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #ffffff;
              font-family: 'Arial', sans-serif;
              font-size: 14px;
              opacity: 0.5;
              z-index: 10;
            }
            
            /* Skip button */
            #skip-btn {
              position: fixed;
              bottom: 40px;
              right: 40px;
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #ffffff;
              padding: 12px 24px;
              border-radius: 50px;
              font-family: 'Arial', sans-serif;
              font-size: 14px;
              cursor: pointer;
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;
              z-index: 10;
            }
            
            #skip-btn:hover {
              background: rgba(255, 255, 255, 0.2);
              border-color: rgba(255, 255, 255, 0.4);
              transform: translateY(-2px);
            }
          `
        }}/>
      </head>
      <body>
        <div id="loading">Loading...</div>
        <div id="canvas-container"></div>
        <button id="skip-btn" onclick="window.location.href='/home'">Enter Site →</button>
        
        <script type="importmap" dangerouslySetInnerHTML={{
          __html: `
            {
              "imports": {
                "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
                "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
              }
            }
          `
        }}/>
        
        <script type="module" dangerouslySetInnerHTML={{
          __html: `
            import * as THREE from 'three';
            
            // Scene setup
            const scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
            
            const camera = new THREE.PerspectiveCamera(
              75,
              window.innerWidth / window.innerHeight,
              0.1,
              1000
            );
            camera.position.z = 5;
            
            const renderer = new THREE.WebGLRenderer({ 
              antialias: true,
              alpha: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            document.getElementById('canvas-container').appendChild(renderer.domElement);
            
            // Hide loading
            setTimeout(() => {
              document.getElementById('loading').style.display = 'none';
            }, 500);
            
            // Create torus geometry
            const geometry = new THREE.TorusGeometry(1.5, 0.4, 32, 100);
            
            // Create material with gradient-like effect
            const material = new THREE.MeshStandardMaterial({
              color: 0x6366f1,
              metalness: 0.7,
              roughness: 0.2,
              emissive: 0x4338ca,
              emissiveIntensity: 0.3
            });
            
            const torus = new THREE.Mesh(geometry, material);
            scene.add(torus);
            
            // Add lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
            scene.add(ambientLight);
            
            const pointLight1 = new THREE.PointLight(0x6366f1, 1.5);
            pointLight1.position.set(5, 5, 5);
            scene.add(pointLight1);
            
            const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.5);
            pointLight2.position.set(-5, -5, 5);
            scene.add(pointLight2);
            
            // Mouse tracking
            const mouse = {
              x: 0,
              y: 0,
              targetX: 0,
              targetY: 0
            };
            
            document.addEventListener('mousemove', (event) => {
              mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
              mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
            });
            
            // Animation loop
            function animate() {
              requestAnimationFrame(animate);
              
              // Smooth mouse following
              mouse.x += (mouse.targetX - mouse.x) * 0.05;
              mouse.y += (mouse.targetY - mouse.y) * 0.05;
              
              // Rotate torus
              torus.rotation.x += 0.005;
              torus.rotation.y += 0.005;
              
              // Follow mouse with parallax effect
              torus.rotation.y += mouse.x * 0.01;
              torus.rotation.x += mouse.y * 0.01;
              
              // Move torus position slightly with mouse
              torus.position.x = mouse.x * 0.5;
              torus.position.y = mouse.y * 0.5;
              
              // Animate lights
              pointLight1.position.x = Math.sin(Date.now() * 0.001) * 5;
              pointLight1.position.y = Math.cos(Date.now() * 0.001) * 5;
              
              pointLight2.position.x = Math.cos(Date.now() * 0.0015) * 5;
              pointLight2.position.y = Math.sin(Date.now() * 0.0015) * 5;
              
              renderer.render(scene, camera);
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            // Start animation
            animate();
          `
        }}/>
      </body>
    </html>
  )
}
