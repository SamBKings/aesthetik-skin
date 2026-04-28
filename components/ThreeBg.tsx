// @ts-nocheck
"use client";
import { useEffect, useRef } from "react";

export type Scene = "molecular" | "dna" | "crystals" | "wave";

interface Props {
  scene: Scene;
  className?: string;
}

const AQ1 = 0x00d4e8;
const AQ2 = 0x4ecdc4;
const AQ3 = 0x00b4d8;
const AQ4 = 0x0077b6;
const AQ5 = 0x7fe8f0;
const GOLD = 0xc4a96a;

export default function ThreeBg({ scene, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let animId = 0;

    import("three").then((THREE) => {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const w = canvas.parentElement?.clientWidth ?? window.innerWidth;
      const h = canvas.parentElement?.clientHeight ?? window.innerHeight;
      renderer.setSize(w, h);

      const threeScene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 30;

      const clock = new THREE.Clock();
      const setId = (id: number) => { animId = id; };

      if (scene === "molecular") buildMolecular(THREE, threeScene, camera, renderer, clock, setId);
      else if (scene === "dna") buildDNA(THREE, threeScene, camera, renderer, clock, setId);
      else if (scene === "crystals") buildCrystals(THREE, threeScene, camera, renderer, clock, setId);
      else buildWave(THREE, threeScene, camera, renderer, clock, setId);

      const onResize = () => {
        const nw = canvas.parentElement?.clientWidth ?? window.innerWidth;
        const nh = canvas.parentElement?.clientHeight ?? window.innerHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    });

    return () => { cancelAnimationFrame(animId); };
  }, [scene]);

  return <canvas ref={canvasRef} className={`bg3d ${className}`} />;
}

type T = typeof import("three");

function buildMolecular(
  THREE: T,
  scene: import("three").Scene,
  camera: import("three").Camera,
  renderer: import("three").WebGLRenderer,
  clock: import("three").Clock,
  setId: (id: number) => void
) {
  const nodes: import("three").Mesh[] = [];
  const velocities: import("three").Vector3[] = [];
  const colors = [AQ1, AQ2, AQ3, GOLD, AQ5];

  for (let i = 0; i < 80; i++) {
    const r = 0.2 + Math.random() * 0.6;
    const geo = new THREE.SphereGeometry(r, 16, 16);
    const col = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.15 + Math.random() * 0.25, wireframe: Math.random() > 0.6 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30);
    scene.add(mesh);
    nodes.push(mesh);
    velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.01));
  }

  const lineMat = new THREE.LineBasicMaterial({ color: AQ1, transparent: true, opacity: 0.08 });
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < 12) {
        const geo = new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(), nodes[j].position.clone()]);
        scene.add(new THREE.Line(geo, lineMat));
      }
    }
  }

  function animate() {
    const id = requestAnimationFrame(animate);
    setId(id);
    const t = clock.getElapsedTime();
    nodes.forEach((n, i) => {
      n.position.add(velocities[i]);
      if (Math.abs(n.position.x) > 30) velocities[i].x *= -1;
      if (Math.abs(n.position.y) > 20) velocities[i].y *= -1;
      if (Math.abs(n.position.z) > 15) velocities[i].z *= -1;
    });
    (camera as import("three").PerspectiveCamera).position.x = Math.sin(t * 0.05) * 3;
    (camera as import("three").PerspectiveCamera).position.y = Math.cos(t * 0.04) * 2;
    (camera as import("three").PerspectiveCamera).lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
}

function buildDNA(
  THREE: T,
  scene: import("three").Scene,
  camera: import("three").Camera,
  renderer: import("three").WebGLRenderer,
  clock: import("three").Clock,
  setId: (id: number) => void
) {
  const count = 120;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 12;
    const r = 6;
    const gA = new THREE.SphereGeometry(0.22, 12, 12);
    const mA = new THREE.MeshBasicMaterial({ color: AQ1, transparent: true, opacity: 0.7 });
    const mshA = new THREE.Mesh(gA, mA);
    mshA.position.set(Math.cos(t) * r, i * 0.28 - count * 0.14, Math.sin(t) * r);
    scene.add(mshA);

    const gB = new THREE.SphereGeometry(0.22, 12, 12);
    const mB = new THREE.MeshBasicMaterial({ color: AQ2, transparent: true, opacity: 0.7 });
    const mshB = new THREE.Mesh(gB, mB);
    mshB.position.set(Math.cos(t + Math.PI) * r, i * 0.28 - count * 0.14, Math.sin(t + Math.PI) * r);
    scene.add(mshB);

    if (i % 6 === 0) {
      const pts = [mshA.position.clone(), mshB.position.clone()];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 })));
    }
  }

  function animate() {
    const id = requestAnimationFrame(animate);
    setId(id);
    const t = clock.getElapsedTime();
    scene.rotation.y = t * 0.12;
    scene.position.y = Math.sin(t * 0.2) * 1.5;
    renderer.render(scene, camera);
  }
  animate();
}

function buildCrystals(
  THREE: T,
  scene: import("three").Scene,
  camera: import("three").Camera,
  renderer: import("three").WebGLRenderer,
  clock: import("three").Clock,
  setId: (id: number) => void
) {
  const crystals: { mesh: import("three").Mesh; speed: import("three").Vector3; rot: import("three").Vector3 }[] = [];
  const geos = [new THREE.IcosahedronGeometry(1.2, 0), new THREE.IcosahedronGeometry(0.7, 0), new THREE.OctahedronGeometry(1, 0)];
  const cols = [AQ1, AQ2, AQ3, GOLD, AQ5];

  for (let i = 0; i < 40; i++) {
    const geo = geos[Math.floor(Math.random() * geos.length)];
    const mat = new THREE.MeshBasicMaterial({ color: cols[Math.floor(Math.random() * cols.length)], wireframe: true, transparent: true, opacity: 0.18 + Math.random() * 0.22 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(0.5 + Math.random() * 2);
    mesh.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30);
    scene.add(mesh);
    crystals.push({ mesh, speed: new THREE.Vector3((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.008), rot: new THREE.Vector3(Math.random() * 0.008, Math.random() * 0.006, Math.random() * 0.004) });
  }

  function animate() {
    const id = requestAnimationFrame(animate);
    setId(id);
    const t = clock.getElapsedTime();
    crystals.forEach(({ mesh, speed, rot }) => {
      mesh.position.add(speed);
      mesh.rotation.x += rot.x;
      mesh.rotation.y += rot.y;
      if (Math.abs(mesh.position.x) > 30) speed.x *= -1;
      if (Math.abs(mesh.position.y) > 20) speed.y *= -1;
      if (Math.abs(mesh.position.z) > 15) speed.z *= -1;
    });
    (camera as import("three").PerspectiveCamera).position.x = Math.sin(t * 0.06) * 4;
    (camera as import("three").PerspectiveCamera).position.y = Math.cos(t * 0.05) * 3;
    (camera as import("three").PerspectiveCamera).lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
}

function buildWave(
  THREE: T,
  scene: import("three").Scene,
  camera: import("three").Camera,
  renderer: import("three").WebGLRenderer,
  clock: import("three").Clock,
  setId: (id: number) => void
) {
  const COLS = 40, ROWS = 30, SEP = 2;
  const posArr = new Float32Array(COLS * ROWS * 3);
  const colArr = new Float32Array(COLS * ROWS * 3);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx = r * COLS + c;
      posArr[idx * 3] = (c - COLS / 2) * SEP;
      posArr[idx * 3 + 1] = (r - ROWS / 2) * SEP;
      posArr[idx * 3 + 2] = 0;
      colArr[idx * 3] = 0; colArr[idx * 3 + 1] = 0.83; colArr[idx * 3 + 2] = 0.91;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colArr, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.5 })));

  const bubbles: { mesh: import("three").Mesh; vy: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.15 + Math.random() * 0.35, 12, 12), new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? AQ1 : AQ2, transparent: true, opacity: 0.2 + Math.random() * 0.3 }));
    mesh.position.set((Math.random() - 0.5) * 60, -25 + Math.random() * 20, (Math.random() - 0.5) * 10);
    scene.add(mesh);
    bubbles.push({ mesh, vy: 0.03 + Math.random() * 0.06 });
  }

  (camera as import("three").PerspectiveCamera).position.set(0, 0, 40);

  function animate() {
    const id = requestAnimationFrame(animate);
    setId(id);
    const t = clock.getElapsedTime();
    const pos = geo.getAttribute("position") as import("three").BufferAttribute;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        const x = (c - COLS / 2) * SEP;
        const y = (r - ROWS / 2) * SEP;
        pos.setXYZ(idx, x, y, Math.sin(x * 0.3 + t) * Math.cos(y * 0.3 + t * 0.7) * 3);
      }
    }
    pos.needsUpdate = true;
    bubbles.forEach(b => { b.mesh.position.y += b.vy; if (b.mesh.position.y > 30) b.mesh.position.y = -25; });
    renderer.render(scene, camera);
  }
  animate();
}
