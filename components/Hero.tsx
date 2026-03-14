"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Sparkle hotspot positions (relative 0-1 coords on the neural image)
const HOTSPOTS = [
    { x: 0.35, y: 0.55 },
    { x: 0.42, y: 0.45 },
    { x: 0.55, y: 0.3 },
    { x: 0.62, y: 0.25 },
    { x: 0.7, y: 0.2 },
    { x: 0.3, y: 0.7 },
    { x: 0.78, y: 0.15 },
    { x: 0.48, y: 0.38 },
];

interface Hotspot {
    x: number;
    y: number;
}

class Sparkle {
    hotspot: Hotspot;
    rx: number;
    ry: number;
    size: number;
    maxAlpha: number;
    alpha: number;
    phase: number;
    speed: number;
    driftX: number;
    driftY: number;
    life: number;
    maxLife: number;
    color: string;

    constructor(hotspot: Hotspot) {
        this.hotspot = hotspot;
        this.rx = 0;
        this.ry = 0;
        this.size = 0;
        this.maxAlpha = 0;
        this.alpha = 0;
        this.phase = 0;
        this.speed = 0;
        this.driftX = 0;
        this.driftY = 0;
        this.life = 0;
        this.maxLife = 0;
        this.color = "";
        this.reset();
    }

    reset() {
        const spread = 0.04;
        this.rx = this.hotspot.x + (Math.random() - 0.5) * spread;
        this.ry = this.hotspot.y + (Math.random() - 0.5) * spread;
        this.size = Math.random() * 3 + 1;
        this.maxAlpha = Math.random() * 0.7 + 0.3;
        this.alpha = 0;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.01;
        this.driftX = (Math.random() - 0.5) * 0.0003;
        this.driftY = (Math.random() - 0.5) * 0.0003;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        const hue = Math.random() * 60 + 220;
        const sat = Math.random() * 30 + 70;
        this.color = `hsla(${hue}, ${sat}%, 75%,`;
    }

    update() {
        this.life++;
        this.phase += this.speed;
        this.rx += this.driftX;
        this.ry += this.driftY;
        this.alpha = this.maxAlpha * Math.abs(Math.sin(this.phase));
        const lifeRatio = this.life / this.maxLife;
        if (lifeRatio < 0.1) this.alpha *= lifeRatio / 0.1;
        else if (lifeRatio > 0.8) this.alpha *= (1 - lifeRatio) / 0.2;
        if (this.life >= this.maxLife) this.reset();
    }

    draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const x = this.rx * w;
        const y = this.ry * h;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 4);
        gradient.addColorStop(0, this.color + (this.alpha * 0.6) + ")");
        gradient.addColorStop(0.5, this.color + (this.alpha * 0.2) + ")");
        gradient.addColorStop(1, this.color + "0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(x, y, this.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sparkle canvas animation
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const particles: Sparkle[] = [];
        HOTSPOTS.forEach((hs) => {
            const count = Math.floor(Math.random() * 3) + 2;
            for (let i = 0; i < count; i++) {
                particles.push(new Sparkle(hs));
            }
        });

        let animId: number;

        function resizeCanvas() {
            if (!container || !canvas || !ctx) return;
            const rect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        function animate() {
            if (!container || !canvas || !ctx) return;
            const rect = container.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw(ctx, w, h);
            });
            animId = requestAnimationFrame(animate);
        }

        resizeCanvas();
        animate();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    // Parallax effect (desktop only)
    useEffect(() => {
        if (window.innerWidth < 768) return;

        const hero = document.querySelector(".hero") as HTMLElement;
        if (!hero) return;

        function handleScroll() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.15}px)`;
                hero.style.opacity = String(1 - scrolled / (window.innerHeight * 1.2));
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="hero" id="hero">
            {/* Neural Synapse Image + Sparkle Animation */}
            <div className="hero__neural" ref={containerRef} aria-hidden="true">
                <Image
                    src="/neural-synapse.png"
                    alt=""
                    width={600}
                    height={300}
                    className="hero__neural-img"
                    priority
                />
                <canvas ref={canvasRef} className="hero__sparkle-canvas" />
            </div>

            <h1 className="hero__heading" style={{ fontFamily: "var(--font-sora)" }}>
                <span>Neuronale Aktivität Steigern. </span>
                <span>Leistung Optimieren. </span>
                <span>Inbound Performance Skalieren</span>
            </h1>
            <p className="hero__subtitle">
                hybit NeuraFlow – für Contact Center, die mehr aus jedem Call herausholen
                wollen.
            </p>
            <div className="hero__scroll-hint" aria-hidden="true">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
