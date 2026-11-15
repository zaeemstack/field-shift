import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  ArrowDown, Orbit, Eye, Layers, Compass, Radio, 
  CheckCircle2, ChevronRight, Navigation 
} from 'lucide-react';

export default function RealisticEarthHero({ lang, t, onAnalyzeClick, activeGrid }) {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const isUrdu = lang === 'ur';

  // Mutable refs for high-frequency animation loop
  const scrollProgressRef = useRef(0);
  const targetScrollProgressRef = useRef(0);

  // Low-frequency React state for HUD UI only
  const [altitudeDisplay, setAltitudeDisplay] = useState(12742);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Scroll listener
  useEffect(() => {
    let lastStage = 0;
    let lastAlt = 12742;
    let lastPercent = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const total = container.clientHeight - window.innerHeight;
            if (total > 0) {
              const current = -rect.top;
              const p = Math.min(1, Math.max(0, current / total));
              targetScrollProgressRef.current = p;

              // Calculate altitude
              let alt;
              if (p < 0.25) {
                alt = 12742 - (p / 0.25) * (12742 - 7800);
              } else if (p < 0.50) {
                const sub = (p - 0.25) / 0.25;
                alt = 7800 - sub * (7800 - 847);
              } else if (p < 0.70) {
                const sub = (p - 0.50) / 0.20;
                alt = 847 - sub * (847 - 208);
              } else if (p < 0.85) {
                const sub = (p - 0.70) / 0.15;
                alt = 208 - sub * (208 - 39.0);
              } else {
                const sub = (p - 0.85) / 0.15;
                alt = 39.0 - sub * (39.0 - 3.3);
              }
              const roundedAlt = Math.round(alt);

              let stage = 0;
              if (p < 0.20) stage = 0;
              else if (p < 0.45) stage = 1;
              else if (p < 0.68) stage = 2;
              else if (p < 0.88) stage = 3;
              else stage = 4;

              const pct = Math.round(p * 100);

              if (stage !== lastStage) {
                lastStage = stage;
                setActiveStage(stage);
              }
              if (Math.abs(roundedAlt - lastAlt) >= 2 || (roundedAlt <= 10 && roundedAlt !== lastAlt)) {
                lastAlt = roundedAlt;
                setAltitudeDisplay(roundedAlt);
              }
              if (pct !== lastPercent) {
                lastPercent = pct;
                setScrollPercent(pct);
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Three.js Photorealistic Earth & Satellite Scene (Mounts ONCE)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2500);
    camera.position.set(0, 4.2, 28);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // Starfield
    const starsCount = 2000;
    const starsGeo = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starsPositions[i] = (Math.random() - 0.5) * 1000;
      starsPositions[i + 1] = (Math.random() - 0.5) * 1000;
      starsPositions[i + 2] = -Math.random() * 600 - 60;

      const shade = 0.75 + Math.random() * 0.25;
      starsColors[i] = shade;
      starsColors[i + 1] = shade * 0.95;
      starsColors[i + 2] = 1.0;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Realistic Earth Globe (Oriented towards West/Central Africa & Maradi Corridor Lon 7°E / Lat 13.5°N)
    const earthRadius = 7.0;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 48, 48);

    const dayMap = textureLoader.load('/textures/earth_day.jpg');
    const normalMap = textureLoader.load('/textures/earth_normal.jpg');
    const specularMap = textureLoader.load('/textures/earth_specular.jpg');
    const cloudsMap = textureLoader.load('/textures/earth_clouds.png');
    const lightsMap = textureLoader.load('/textures/earth_lights.png');

    dayMap.colorSpace = THREE.SRGBColorSpace;
    cloudsMap.colorSpace = THREE.SRGBColorSpace;
    lightsMap.colorSpace = THREE.SRGBColorSpace;

    const earthMat = new THREE.MeshStandardMaterial({
      map: dayMap,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: specularMap,
      roughness: 0.55,
      metalness: 0.1,
      transparent: true,
      opacity: 1.0
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    // Orient Niger / Maradi region (Lon 7°E, Lat 13.5°N) toward camera
    earthMesh.rotation.y = -Math.PI * 0.48;
    earthMesh.rotation.x = 0.24;
    scene.add(earthMesh);

    // Night Lights
    const lightsGeo = new THREE.SphereGeometry(earthRadius + 0.015, 48, 48);
    const lightsMat = new THREE.MeshBasicMaterial({
      map: lightsMap,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    });
    const lightsMesh = new THREE.Mesh(lightsGeo, lightsMat);
    lightsMesh.rotation.y = earthMesh.rotation.y;
    lightsMesh.rotation.x = earthMesh.rotation.x;
    scene.add(lightsMesh);

    // Clouds Sphere
    const cloudGeo = new THREE.SphereGeometry(earthRadius + 0.06, 48, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      roughness: 1.0
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    cloudMesh.rotation.y = earthMesh.rotation.y;
    cloudMesh.rotation.x = earthMesh.rotation.x;
    scene.add(cloudMesh);

    // Atmosphere Glow Shell
    const atmoGeo = new THREE.SphereGeometry(earthRadius + 0.3, 48, 48);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.28, 0.7, 1.0, 1.0) * intensity * 1.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmoMesh);

    // Reticle on Maradi Region
    const reticleGroup = new THREE.Group();
    for (let r of [0.22, 0.42, 0.65]) {
      const ringGeo = new THREE.RingGeometry(r, r + 0.025, 36);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xfacc15,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      reticleGroup.add(ring);
    }
    const lineMat = new THREE.LineBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.75 });
    const lineGeoH = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.8, 0, 0), new THREE.Vector3(0.8, 0, 0)]);
    const lineGeoV = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.8, 0), new THREE.Vector3(0, 0.8, 0)]);
    reticleGroup.add(new THREE.Line(lineGeoH, lineMat));
    reticleGroup.add(new THREE.Line(lineGeoV, lineMat));

    reticleGroup.position.set(0.08, 0.32, 7.04);
    scene.add(reticleGroup);

    // NASA Terra Satellite Model
    const satGroup = new THREE.Group();
    const satBodyGeo = new THREE.BoxGeometry(0.5, 0.35, 0.65);
    const satBodyMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.25,
    });
    const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
    satGroup.add(satBody);

    const modisGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 16);
    const modisMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const modis = new THREE.Mesh(modisGeo, modisMat);
    modis.rotation.x = Math.PI / 2;
    modis.position.set(0, -0.22, 0.1);
    satGroup.add(modis);

    const solarWingGeo = new THREE.BoxGeometry(2.3, 0.02, 0.48);
    const solarWingMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      metalness: 0.85,
      roughness: 0.3
    });
    const solarWing = new THREE.Mesh(solarWingGeo, solarWingMat);
    satGroup.add(solarWing);

    const dishGeo = new THREE.ConeGeometry(0.22, 0.12, 20, 1, true);
    const dishMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.5, roughness: 0.3, side: THREE.DoubleSide });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.rotation.x = -Math.PI * 0.7;
    dish.position.set(0, 0.28, -0.2);
    satGroup.add(dish);

    const beamGeo = new THREE.CylinderGeometry(0.02, 0.7, 4.2, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const laserBeam = new THREE.Mesh(beamGeo, beamMat);
    laserBeam.position.set(0, -2.1, 0.1);
    satGroup.add(laserBeam);

    satGroup.position.set(2.8, 2.5, 8.8);
    satGroup.lookAt(0.08, 0.32, 7.04);
    scene.add(satGroup);

    // Ground Agricultural Patchwork (847 km down to 3.3 km)
    const farmSatTexture = textureLoader.load('/textures/farm_satellite.jpg');
    farmSatTexture.wrapS = THREE.RepeatWrapping;
    farmSatTexture.wrapT = THREE.RepeatWrapping;
    farmSatTexture.repeat.set(2, 2);

    const farmPlaneGeo = new THREE.PlaneGeometry(24, 24, 32, 32);
    const farmPlaneMat = new THREE.MeshStandardMaterial({
      map: farmSatTexture,
      roughness: 0.85,
      metalness: 0.05,
      transparent: true,
      opacity: 0.0
    });
    const farmPlane = new THREE.Mesh(farmPlaneGeo, farmPlaneMat);
    farmPlane.position.set(0.08, 0.32, 7.08);
    scene.add(farmPlane);

    // 4 Field Markers on 3.3 km view representing Guidan Roumdji, Augie, Tessaoua, Madarounfa
    const markerGroup = new THREE.Group();
    const createFieldMarker = (x, y, color) => {
      const g = new THREE.Group();
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshBasicMaterial({ color: color })
      );
      g.add(pin);
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.35, 6),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      pole.position.y = -0.18;
      g.add(pole);
      g.position.set(x, y, 7.22);
      return g;
    };

    markerGroup.add(createFieldMarker(-0.5, 0.3, 0xfacc15)); // Guidan
    markerGroup.add(createFieldMarker(0.4, 0.2, 0x38bdf8)); // Augie
    markerGroup.add(createFieldMarker(0.1, -0.5, 0x22c55e)); // Tessaoua
    markerGroup.add(createFieldMarker(-0.2, -0.2, 0xe11d48)); // Madarounfa
    markerGroup.visible = false;
    scene.add(markerGroup);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xfff8eb, 2.5);
    sunLight.position.set(30, 18, 35);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x18243b, 1.0);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x0ea5e9, 1.2);
    rimLight.position.set(-25, -12, -15);
    scene.add(rimLight);

    // 60 FPS Render Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      earthMesh.rotation.y += 0.0005;
      cloudMesh.rotation.y += 0.0007;
      lightsMesh.rotation.y = earthMesh.rotation.y;

      const pulse = 1 + Math.sin(time * 3.5) * 0.1;
      reticleGroup.scale.set(pulse, pulse, 1);

      scrollProgressRef.current = THREE.MathUtils.lerp(
        scrollProgressRef.current,
        targetScrollProgressRef.current,
        0.1
      );
      const p = scrollProgressRef.current;

      const targetZ = 7.62 + Math.pow(1 - p, 0.75) * 20.38;
      const targetY = 0.32 + Math.pow(1 - p, 0.85) * 4.18;
      const targetX = (1 - p) * 0.4;

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.12);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.12);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.12);

      const lookTarget = new THREE.Vector3(0.08 * p, 0.32 * p, 7.04);
      camera.lookAt(lookTarget);

      // Satellite Descent Motion
      const satOrbitAngle = time * 0.2 + p * Math.PI * 1.2;
      const satTargetZ = 7.8 + (1 - p) * 1.4 + Math.sin(satOrbitAngle * 0.8) * 0.25;
      const satTargetX = (1 - p) * 2.2 * Math.cos(satOrbitAngle) + 0.3;
      const satTargetY = 0.6 + (1 - p) * 2.0 * Math.sin(satOrbitAngle * 0.7) + 0.3;

      satGroup.position.x = THREE.MathUtils.lerp(satGroup.position.x, satTargetX, 0.1);
      satGroup.position.y = THREE.MathUtils.lerp(satGroup.position.y, satTargetY, 0.1);
      satGroup.position.z = THREE.MathUtils.lerp(satGroup.position.z, satTargetZ, 0.1);
      satGroup.lookAt(0.08, 0.32, 7.04);

      if (p > 0.40) {
        const farmOpacity = Math.min(1.0, (p - 0.40) / 0.35);
        farmPlaneMat.opacity = farmOpacity;
        earthMat.opacity = 1.0 - farmOpacity * 0.95;
        earthMat.transparent = farmOpacity > 0.05;
        atmoMat.opacity = 1.0 - farmOpacity;
        cloudMat.opacity = 0.4 * (1.0 - farmOpacity);
      } else {
        farmPlaneMat.opacity = 0.0;
        earthMat.opacity = 1.0;
        earthMat.transparent = false;
        atmoMat.opacity = 1.0;
        cloudMat.opacity = 0.4;
      }

      markerGroup.visible = p > 0.82;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      lightsGeo.dispose();
      lightsMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      satBodyGeo.dispose();
      satBodyMat.dispose();
      solarWingGeo.dispose();
      solarWingMat.dispose();
      farmPlaneGeo.dispose();
      farmPlaneMat.dispose();
    };
  }, []);

  const scrollToStage = useCallback((stageIdx) => {
    const container = containerRef.current;
    if (!container) return;
    const total = container.clientHeight - window.innerHeight;
    const targetScroll = container.offsetTop + (stageIdx / 4) * total;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050811]">
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none">
        
        {/* Three.js 3D Canvas */}
        <div ref={mountRef} className="absolute inset-0 z-0" />

        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050811]/90 via-[#050811]/40 to-transparent pointer-events-none z-10" />

        {/* Floating HUD Cards */}
        <div className={`absolute top-24 sm:top-28 ${isUrdu ? 'right-6 md:right-16 text-right' : 'left-6 md:left-16 text-left'} z-20 max-w-xl pointer-events-auto`}>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md mb-4 shadow-lg">
            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>NASA Terra (EOS AM-1) • Target: {activeGrid?.name || 'Guidan Roumdji, Maradi'}</span>
          </div>

          {/* Stage 0: 12,742 km */}
          {activeStage === 0 && (
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-lg">
                {t.hero.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg drop-shadow">
                {t.hero.subtitle}
              </p>

              <div className={`mt-8 flex flex-wrap items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => scrollToStage(1)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#facc15] hover:bg-[#eab308] text-black font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-yellow-500/25"
                >
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                  <span>{t.hero.cta}</span>
                </button>

                <button
                  onClick={() => onAnalyzeClick?.()}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm backdrop-blur-md transition-all"
                >
                  <span>{t.nav.analyze}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                <span>{isUrdu ? "سیٹلائٹ کے ساتھ مرادی کے کھیتوں پر اترنے کے لیے نیچے اسکرول کریں ↓" : "Scroll down to fly satellite down to Maradi fields ↓"}</span>
              </div>
            </div>
          )}

          {/* Stage 1: 705 km */}
          {activeStage === 1 && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl animate-fade-in max-w-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Orbit className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {t.hero.hudTerra.title}
                  </h3>
                  <span className="text-xs font-mono text-blue-300">
                    Orbit Speed: 27,000 km/h • Target: Sahel Semi-Arid Belt
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                {t.hero.hudTerra.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-yellow-400">
                <span>Reticle: {activeGrid?.lat || 13.65}°N, {activeGrid?.lon || 6.70}°E ({activeGrid?.name || 'Guidan Roumdji'})</span>
                <span>Descending ↓</span>
              </div>
            </div>
          )}

          {/* Stage 2: 208 km */}
          {activeStage === 2 && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl animate-fade-in max-w-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Layers className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {t.hero.hudFields.title}
                  </h3>
                  <span className="text-xs font-mono text-emerald-300">
                    4 Grids: Guidan, Augie, Tessaoua, Madarounfa
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                {t.hero.hudFields.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Upland Dunes & Goulbi Valleys Resolved</span>
                <span>Altitude: ~208 km</span>
              </div>
            </div>
          )}

          {/* Stage 3: 39 km */}
          {activeStage === 3 && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl animate-fade-in max-w-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Eye className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {t.hero.hudHealth.title}
                  </h3>
                  <span className="text-xs font-mono text-cyan-300">
                    NIR Soil Reflectance & Drydown Detection
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                {t.hero.hudHealth.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-yellow-400">
                <span>Mean Surface Wetness: 0.19 (GWETTOP)</span>
                <span>Altitude: ~39 km</span>
              </div>
            </div>
          )}

          {/* Stage 4: 3.3 km - SAMPLE ADVICE for Sahelian Field Rotations */}
          {activeStage === 4 && (
            <div className="bg-black/85 backdrop-blur-xl border border-yellow-400/40 rounded-3xl p-6 sm:p-7 shadow-2xl animate-fade-in max-w-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-yellow-400 text-black uppercase tracking-wider">
                  FIELD SHIFT RECOMMENDATIONS
                </span>
                <span className="text-xs text-yellow-400 font-mono flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" />
                  Altitude: 3.3 km
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {isUrdu ? "مرادی فارمز کیلئے فوری عملی رہنمائی" : "Advice for Maradi Dryland Fields"}
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Upland Sandy Soil:</strong> Rotate Pearl Millet with Cowpea to fix nitrogen in poor sandy loam (0.6% OC).</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Rapid Drydown Alert:</strong> GWETTOP collapsed to 0.08 in Nov; maintain surface residue mulch against wind erosion.</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Agroforestry Boost:</strong> Plant native shrubs (Guiera senegalensis) — proven to raise millet yields from 547 to 937 kg/ha.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Altitude Meter (Top-Right) */}
        <div className={`absolute top-24 sm:top-28 ${isUrdu ? 'left-6 md:left-16 text-left' : 'right-6 md:right-16 text-right'} z-20 pointer-events-auto`}>
          <div className="bg-black/70 backdrop-blur-xl border border-white/15 p-5 rounded-3xl shadow-2xl">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-mono mb-1">
              {t.nav.altitude}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl md:text-6xl font-mono font-black text-white tracking-tight drop-shadow-xl">
                {altitudeDisplay.toLocaleString()}
              </span>
              <span className="text-2xl sm:text-3xl font-mono text-yellow-400 font-bold">
                km
              </span>
            </div>

            <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-yellow-400 h-full transition-all duration-75"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-1 pt-2 border-t border-white/10">
              {[
                { label: "12k", stage: 0 },
                { label: "705k", stage: 1 },
                { label: "208k", stage: 2 },
                { label: "39k", stage: 3 },
                { label: "3.3k", stage: 4 }
              ].map((st) => (
                <button
                  key={st.stage}
                  onClick={() => scrollToStage(st.stage)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                    activeStage === st.stage
                      ? 'bg-yellow-400 text-black font-bold shadow-md'
                      : 'bg-white/5 hover:bg-white/15 text-slate-400'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span>{scrollPercent}% Descent • Scroll to explore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
