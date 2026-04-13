"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import {
  GithubSVG,
  TwitterSVG,
} from "./icons/SocialIcons";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Main scroll progress for the whole section (for text fade and general parallax)
  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Local scroll progress for the sticky image stage (scroll-jacking effect)
  const { scrollYProgress: stickyScrollProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(mainScrollProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(mainScrollProgress, [0, 0.3], [1, 0.9]);

  // Image animations (revealed early for smoother transition)
  const imageOpacity = useTransform(mainScrollProgress, [0.05, 0.2], [0, 1]);
  const imageScale = useTransform(mainScrollProgress, [0.05, 0.2], [0.85, 1]);
  const imageY = useTransform(mainScrollProgress, [0.05, 0.2], [80, 0]);

  // Interactive Split Animation based on the PINNED scroll progress
  // Line stays at 95% (right) until pinning starts, then sweeps to 5% (left)
  const splitPercentage = useTransform(stickyScrollProgress, [0, 1], [95, 5]);

  const leftMask = useMotionTemplate`linear-gradient(to right, black ${splitPercentage}%, transparent ${splitPercentage}%)`;
  const rightMask = useMotionTemplate`linear-gradient(to left, black calc(100% - ${splitPercentage}%), transparent calc(100% - ${splitPercentage}%))`;
  const lineLeft = useMotionTemplate`${splitPercentage}%`;

  // Dynamic Width and Opacity for Background Elements
  const bgLeftWidth = useMotionTemplate`${splitPercentage}%`;
  const bgRightWidth = useMotionTemplate`calc(100% - ${splitPercentage}%)`;

  const leftSideOpacity = useTransform(splitPercentage, [5, 95], [0.1, 1]);
  const rightSideOpacity = useTransform(splitPercentage, [5, 95], [1, 0.1]);

  // Continuous Zoom Effect linked to sticky scroll
  const portraitZoom = useTransform(stickyScrollProgress, [0, 1], [1, 1.25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(mousePosition.y * -10, springConfig);
  const rotateY = useSpring(mousePosition.x * 10, springConfig);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center text-white bg-background"
    >
      {/* Background Decor & Flying Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient Glows */}
        <motion.div
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] hero-glow-cyan opacity-20"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -50,
            y: mousePosition.y * -50,
          }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] hero-glow-purple opacity-20"
        />

      </div>
      {/* STAGE 1: THE TEXT SECTION (First View) */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 pt-20">
        <motion.div
          style={{
            opacity,
            scale,
            pointerEvents: useTransform(
              mainScrollProgress,
              [0, 0.1],
              ["auto", "none"],
            ),
            y: useTransform(mainScrollProgress, [0, 0.4], [0, -50]),
          }}
          className="container mx-auto max-w-4xl text-center flex flex-col items-center"
        >
          {/* Flying Tech HUD Elements (Jarvis Inspired) */}
          {mounted && (
            <div className="absolute inset-x-0 inset-y-[-20%] z-[-1] opacity-30 pointer-events-none">
              <ArcReactor mousePos={mousePosition} />
              
              <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-[20%] left-0 font-label text-[10px] text-primary/60 tracking-tighter text-left"
              >
                SIGNAL_STRENGTH: NOMINAL<br/>
                LATENCY: 14MS<br/>
                CORE_TEMP: 32°C
              </motion.div>

              <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute bottom-[20%] right-0 font-label text-[10px] text-secondary/60 text-right tracking-tighter"
              >
                DEPLOY_STATUS: ACTIVE<br/>
                TARGET_IMPACT: OPTIMAL<br/>
                RECURSION_DEPTH: 5
              </motion.div>

              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent z-0 shadow-[0_0_15px_var(--primary)]"
              />

              <CornerBracket position="top-left" />
              <CornerBracket position="top-right" />
              <CornerBracket position="bottom-left" />
              <CornerBracket position="bottom-right" />
            </div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black font-headline tracking-tighter leading-[1.05] text-on-background mb-8"
          >
            Building <span className="text-gradient">high-impact</span> products
            through strategy, leadership, and delivery.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl font-body mb-12"
          >
            Bridging engineering excellence with business outcomes —
            orchestrating cross-functional teams to ship world-class software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-secondary to-primary text-on-secondary rounded-full font-bold shadow-lg shadow-secondary/10 flex items-center gap-2"
            >
              Let&apos;s Build Impact <ArrowRight size={20} />
            </motion.a>

            <div className="flex items-center gap-6 px-8 py-4 rounded-full border border-outline-variant bg-surface-container backdrop-blur-xl">
              <SocialIcon
                icon={<Mail size={20} />}
                href="mailto:prafulthapa97@gmail.com"
              />
              <SocialIcon
                icon={<TwitterSVG size={20} />}
                href="https://x.com/Praful611793"
              />
              <SocialIcon
                icon={<GithubSVG size={20} />}
                href="https://github.com/praful097"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            opacity: useTransform(mainScrollProgress, [0, 0.1], [1, 0]),
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
            Explore Visuals
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </div>{" "}
      {/* STAGE 2: THE PINNED IMAGE SECTION (Scroll-Jacking) */}
      <div ref={stickyRef} className="relative w-full h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            style={{
              opacity: imageOpacity,
              scale: imageScale,
              y: imageY,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            viewport={{ once: false, margin: "-100px" }}
            className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[650px] flex items-center justify-center transition-shadow duration-700 z-10"
          >
            {/* Background Visual Boxes */}
            <div className="absolute inset-0 flex items-center justify-start gap-0 overflow-hidden rounded-[40px] border border-outline-variant bg-surface/40 backdrop-blur-sm z-0 shadow-2xl">
              {/* Left Side: Engineering Background */}
              <motion.div
                style={{ width: bgLeftWidth, opacity: leftSideOpacity }}
                className="h-full relative code-grid overflow-hidden border-r border-cyan-400/20"
              >
                <div className="absolute inset-0 p-8 font-mono text-[10px] md:text-xs text-cyan-400 pointer-events-none flex flex-col gap-4 select-none min-w-[300px]">
                  <span className="block">
                    const buildApp = (strategy) =&gt; &#123;
                  </span>
                  <span className="block ml-4">
                    return strategy.map(item =&gt; (&#123;
                  </span>
                  <span className="block ml-8">...item,</span>
                  <span className="block ml-8">
                    status: &apos;shipped&apos;,
                  </span>
                  <span className="block ml-8">
                    performance: &apos;100%&apos;
                  </span>
                  <span className="block ml-4">&#125;));</span>
                  <span className="block">&#125;;</span>
                  <span className="block mt-4">
                    import &#123; Impact &#125; from &apos;@praful/core&apos;;
                  </span>
                  <span className="block">
                    export default function Product() &#123; ... &#125;
                  </span>
                </div>
              </motion.div>
              {/* Right Side: Strategy Background */}
              <motion.div
                style={{ width: bgRightWidth, opacity: rightSideOpacity }}
                className="h-full relative bg-gradient-to-br from-secondary/5 to-transparent overflow-hidden"
              >
                <div className="absolute right-0 top-0 bottom-0 p-8 pointer-events-none select-none flex flex-col justify-end items-end gap-6 text-right min-w-[300px]">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-label uppercase tracking-widest text-secondary/60">
                      Product Roadmap
                    </span>
                    <div className="w-32 md:w-48 h-12 flex gap-1">
                      <div className="h-full w-8 bg-secondary/30 rounded-sm"></div>
                      <div className="h-full w-16 bg-secondary/50 rounded-sm"></div>
                      <div className="h-full w-24 bg-secondary/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4 text-secondary/50">
                    <span className="material-symbols-outlined text-2xl text-secondary/60">
                      insights
                    </span>
                    <span className="font-headline font-bold text-lg uppercase tracking-tighter">
                      Strategic Impact
                    </span>
                  </div>
                  <span className="text-secondary/20 font-label text-3xl font-black italic opacity-30">
                    VISION
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Labels */}
            <motion.div
              style={{
                opacity: leftSideOpacity,
                transform: "translateZ(50px) translateY(-50%)",
              }}
              className="absolute left-8 md:left-12 lg:left-16 top-1/2 z-30 pointer-events-none hidden md:block"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-headline font-black text-2xl md:text-3xl lg:text-4xl text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] tracking-tighter uppercase">
                  Engineer
                </span>
                <div className="h-1 w-20 bg-cyan-400"></div>
              </div>
            </motion.div>
            <motion.div
              style={{
                opacity: rightSideOpacity,
                transform: "translateZ(50px) translateY(-50%)",
              }}
              className="absolute right-8 md:right-12 lg:right-16 top-1/2 z-30 pointer-events-none hidden md:block"
            >
              <div className="flex flex-col items-end gap-1">
                <span className="font-headline font-black text-2xl md:text-3xl lg:text-4xl text-secondary drop-shadow-[0_0_15px_rgba(213,117,255,0.5)] tracking-tighter uppercase">
                  Project <br /> Manager
                </span>
                <div className="h-1 w-20 bg-secondary"></div>
              </div>
            </motion.div>

            {/* Central Portrait */}
            <motion.div
              className="relative h-full aspect-[4/5] z-20 portrait-cutout flex items-end"
              style={{ z: 100, scale: portraitZoom }}
            >
              <div className="relative w-full h-[110%] overflow-hidden">
                <motion.div
                  style={{
                    maskImage: leftMask,
                    WebkitMaskImage: leftMask,
                  }}
                  className="absolute inset-0 z-10"
                >
                  <Image
                    alt="Praful Engineering Profile"
                    className="w-full h-full object-contain grayscale dark:mix-blend-screen mix-blend-multiply opacity-90"
                    src="/me-pro.png"
                    width={1000}
                    height={1200}
                    priority
                  />
                  <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color"></div>
                </motion.div>
                <motion.div
                  style={{
                    maskImage: rightMask,
                    WebkitMaskImage: rightMask,
                  }}
                  className="absolute inset-0 z-10"
                >
                  <Image
                    alt="Praful Strategy Profile"
                    className="w-full h-full object-contain"
                    src="/me-pro.png"
                    width={1000}
                    height={1200}
                    priority
                  />
                </motion.div>
                <motion.div
                  style={{ left: lineLeft }}
                  className="absolute top-0 bottom-0 w-[2px] bg-primary/40 z-20 shadow-[0_0_30px_var(--primary)] -translate-x-1/2"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArcReactor({ mousePos }: { mousePos: {x:number, y:number} }) {
  // Creating an Iron Man Arc Reactor inspired SVG
  return (
    <motion.div
      animate={{ 
        x: mousePos.x * 0.05 * 1000,
        y: mousePos.y * 0.05 * 1000,
      }}
      transition={{ 
        x: { type: "spring", stiffness: 30 },
        y: { type: "spring", stiffness: 30 }
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-40 pointer-events-none"
    >
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
        {/* Core Glow */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary blur-[100px] opacity-20 rounded-full" 
        />
        
        {/* Outer Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-[4px] md:border-[8px] border-primary/30 rounded-full"
        />

        {/* Inner Dashed Ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[30px] md:inset-[50px] border-[2px] md:border-[4px] border-dashed border-primary/50 rounded-full"
        />

        {/* Thick segmented Ring */}
        <motion.svg 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[15%] w-[70%] h-[70%] drop-shadow-[0_0_15px_var(--primary)] text-primary/60" viewBox="0 0 100 100"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <path key={i}
              d="M 50 10 L 53 15 L 47 15 Z" 
              fill="currentColor" 
              transform={`rotate(${i * 36} 50 50)`} 
            />
          ))}
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.6" />
        </motion.svg>

        {/* The Central Triangle (Classic Mark I / Infinity War Mark 50 Node) */}
        <motion.div 
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center opacity-80"
        >
          <svg viewBox="0 0 100 100" className="w-[40%] h-[40%] drop-shadow-[0_0_20px_var(--primary)] text-primary">
            <polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="3" />
            <polygon points="50,25 75,70 25,70" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </motion.div>

        {/* The Center Core */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] bg-on-background rounded-full drop-shadow-[0_0_30px_var(--on-background)] shadow-[0_0_50px_var(--primary)]"
        />
      </div>
    </motion.div>
  );
}

function CornerBracket({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const styles = {
    "top-left": "top-12 left-12 border-t-2 border-l-2",
    "top-right": "top-12 right-12 border-t-2 border-r-2",
    "bottom-left": "bottom-12 left-12 border-b-2 border-l-2",
    "bottom-right": "bottom-12 right-12 border-b-2 border-r-2",
  };

  return (
    <motion.div
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`absolute w-8 h-8 border-primary/30 ${styles[position]} pointer-events-none`}
    />
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  const isExternal = href.startsWith("http");
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.25, color: "var(--on-background)" }}
      className="text-primary transition-colors duration-300"
    >
      {icon}
    </motion.a>
  );
}
