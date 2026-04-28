// @ts-nocheck
"use client";
import { useEffect, useRef } from "react";

export type Scene = "petals" | "shapes" | "wave";

interface Props { scene?: Scene; className?: string; }

export default function ThreeBg({ scene = "petals", className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    let animId = 0;
    let disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const w = el.clientWidth  || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%!important;height:100%!important;pointer-events:none;";

      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
      camera.position.z = 5;
      const threeScene = new THREE.Scene();

      /* ── PETALS: warm floating particles ── */
      if (scene === "petals") {
        const COUNT = 90;
        const positions  = new Float32Array(COUNT * 3);
        const colors     = new Float32Array(COUNT * 3);
        const opacities  = new Float32Array(COUNT);
        const palette    = [
          new THREE.Color("#BBA796"),
          new THREE.Color("#BE7865"),
          new THREE.Color("#D9CEC3"),
          new THREE.Color("#c4a080"),
          new THREE.Color("#e8d5c4"),
        ];

        for (let i = 0; i < COUNT; i++) {
          positions[i*3]   = (Math.random()-0.5)*16;
          positions[i*3+1] = (Math.random()-0.5)*10;
          positions[i*3+2] = (Math.random()-0.5)*5;
          const c = palette[Math.floor(Math.random()*palette.length)];
          colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
          opacities[i] = 0.15 + Math.random()*0.25;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions,3));
        geo.setAttribute("color",    new THREE.BufferAttribute(colors,3));

        const mat = new THREE.PointsMaterial({
          vertexColors: true, size: 0.09, transparent: true,
          opacity: 0.3, sizeAttenuation: true, depthWrite: false,
        });

        const points = new THREE.Points(geo, mat);
        threeScene.add(points);

        const vx = Array.from({length:COUNT},()=>(Math.random()-0.5)*0.003);
        const vy = Array.from({length:COUNT},()=> Math.random()*0.004+0.001);
        const phase = Array.from({length:COUNT},()=>Math.random()*Math.PI*2);

        let t = 0;
        const animate = () => {
          if (disposed) return;
          animId = requestAnimationFrame(animate);
          t += 0.01;
          const pos = geo.attributes.position.array;
          for (let i=0; i<COUNT; i++) {
            pos[i*3]   += vx[i] + Math.sin(t+phase[i])*0.001;
            pos[i*3+1] += vy[i];
            if (pos[i*3+1] > 5.5) { pos[i*3+1]=-5.5; pos[i*3]=(Math.random()-0.5)*16; }
          }
          geo.attributes.position.needsUpdate = true;
          // gentle camera drift
          camera.position.x = Math.sin(t*0.05)*0.3;
          renderer.render(threeScene, camera);
        };
        animate();
      }

      /* ── SHAPES: floating translucent geometry ── */
      if (scene === "shapes") {
        const shapeColors = ["#BBA796","#BE7865","#D9CEC3","#c4a080","#bfb0a0"];
        const meshes = [];

        for (let i=0; i<18; i++) {
          const r = Math.floor(Math.random()*4);
          let geo;
          if      (r===0) geo = new THREE.TorusGeometry(0.4+Math.random()*0.5, 0.06, 8, 32);
          else if (r===1) geo = new THREE.OctahedronGeometry(0.3+Math.random()*0.4);
          else if (r===2) geo = new THREE.IcosahedronGeometry(0.25+Math.random()*0.35);
          else            geo = new THREE.TetrahedronGeometry(0.3+Math.random()*0.4);

          const col = new THREE.Color(shapeColors[Math.floor(Math.random()*shapeColors.length)]);
          const mat = new THREE.MeshBasicMaterial({
            color: col, transparent: true,
            opacity: 0.06 + Math.random()*0.09,
            wireframe: Math.random()>0.4,
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set((Math.random()-0.5)*14,(Math.random()-0.5)*9,(Math.random()-0.5)*3-1);
          mesh.userData = {
            rx:(Math.random()-0.5)*0.006, ry:(Math.random()-0.5)*0.006,
            floatY:Math.random()*Math.PI*2, speed:0.004+Math.random()*0.004,
          };
          threeScene.add(mesh);
          meshes.push(mesh);
        }

        const animate = () => {
          if (disposed) return;
          animId = requestAnimationFrame(animate);
          meshes.forEach(m => {
            m.rotation.x += m.userData.rx;
            m.rotation.y += m.userData.ry;
            m.userData.floatY += m.userData.speed;
            m.position.y += Math.sin(m.userData.floatY)*0.005;
          });
          renderer.render(threeScene, camera);
        };
        animate();
      }

      /* ── WAVE: gentle mesh wave ── */
      if (scene === "wave") {
        const geo = new THREE.PlaneGeometry(18, 12, 40, 25);
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color("#BBA796"), transparent: true, opacity: 0.08,
          wireframe: true,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -0.4;
        mesh.position.y = -1;
        threeScene.add(mesh);
        camera.position.z = 6;
        camera.position.y = 2;

        let t = 0;
        const pos = geo.attributes.position;
        const animate = () => {
          if (disposed) return;
          animId = requestAnimationFrame(animate);
          t += 0.012;
          for (let i=0; i<pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            pos.setZ(i, Math.sin(x*0.5+t)*0.35 + Math.sin(y*0.4+t*0.8)*0.25);
          }
          pos.needsUpdate = true;
          renderer.render(threeScene, camera);
        };
        animate();
      }

      const onResize = () => {
        const nw = el.clientWidth||window.innerWidth;
        const nh = el.clientHeight||window.innerHeight;
        camera.aspect = nw/nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);

      return () => {
        disposed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      };
    })().then(cleanup => {
      if (disposed && cleanup) cleanup();
    });

    return () => { disposed = true; cancelAnimationFrame(animId); };
  }, [scene]);

  return <div ref={mountRef} className={`absolute inset-0 overflow-hidden ${className}`} />;
}
