import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { HexagonPattern } from '../registry/magicui/hexagon-pattern';

const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Open Source Contributor'];

export default function HeroSection({ onScrollProgress }) {
    const [roleIndex, setRoleIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Entrance animation
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Rotating role text
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex(i => (i + 1) % roles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Scroll progress for navbar
    useEffect(() => {
        const onScroll = () => {
            const progress = Math.min(window.scrollY / window.innerHeight, 1);
            setScrolled(window.scrollY > 20);
            if (onScrollProgress) onScrollProgress(progress);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScrollProgress]);

    const fadeUp = (delay = 0) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
    });

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">

            {/* Hexagon Pattern Background */}
            <HexagonPattern
                radius={30}
                x={-1}
                y={-1}
                className={cn(
                    'text-white/[0.07]',
                    '[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,white_20%,transparent_100%)]'
                )}
            />

            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.04),transparent)]" />



            {/* ── MOBILE LAYOUT (hidden on md+) ── */}
            <div className="md:hidden absolute inset-0 z-10 flex flex-col justify-between px-6 pt-24 pb-10">
                {/* Top: nama */}
                <div style={fadeUp(200)}>
                    <p className="text-white/40 text-xs uppercase tracking-[0.4em] mb-1 font-light">Hello, I'm</p>
                    <h1 className="text-white text-5xl font-bold leading-none tracking-tight">Rezdika</h1>
                    <h1 className="text-white text-5xl font-bold leading-none tracking-tight">Akbar</h1>
                    <div className="mt-2 h-5 overflow-hidden">
                        <p
                            key={roleIndex}
                            className="text-white/40 text-xs uppercase tracking-widest"
                            style={{ animation: 'slideUp 0.4s ease forwards' }}
                        >
                            {roles[roleIndex]}
                        </p>
                    </div>
                </div>

                {/* Bottom: tagline + CTA */}
                <div style={fadeUp(500)}>
                    <p className="text-white/50 text-sm leading-relaxed font-light mb-5">
                        Crafting digital experiences<br />
                        with clean code & bold design.
                    </p>
                    <div className="flex gap-3">
                        <a
                            href="#projects"
                            className="flex-1 text-center bg-white text-black px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="flex-1 text-center border border-white/20 text-white/70 px-4 py-2.5 rounded-full text-sm hover:border-white/50 hover:text-white transition-all"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
            {/* TOP LEFT */}
            <div className="hidden md:block absolute top-24 left-16 z-10" style={fadeUp(200)}>
                <p className="text-white/40 text-xs uppercase tracking-[0.4em] mb-2 font-light">Hello, I'm</p>
                <h1 className="text-white text-8xl font-bold leading-none tracking-tight">Rezdika</h1>
            </div>

            {/* TOP RIGHT */}
            <div className="hidden md:block absolute top-24 right-16 z-10 text-right" style={fadeUp(350)}>
                <h1 className="text-white text-8xl font-bold leading-none tracking-tight">Akbar</h1>
                <div className="mt-3 h-5 overflow-hidden">
                    <p
                        key={roleIndex}
                        className="text-white/40 text-xs uppercase tracking-widest"
                        style={{ animation: 'slideUp 0.4s ease forwards' }}
                    >
                        {roles[roleIndex]}
                    </p>
                </div>
            </div>

            {/* BOTTOM LEFT */}
            <div className="hidden md:block absolute bottom-16 left-16 z-10" style={fadeUp(500)}>
                <p className="text-white/50 text-base max-w-xs leading-relaxed font-light">
                    Crafting digital experiences<br />
                    with clean code & bold design.
                </p>
            </div>

            {/* BOTTOM RIGHT */}
            <div className="hidden md:flex absolute bottom-16 right-16 z-10 flex-col items-end gap-3" style={fadeUp(650)}>
                <a href="#projects" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105">
                    View Projects
                </a>
                <a href="#contact" className="border border-white/20 text-white/70 px-6 py-2.5 rounded-full text-sm hover:border-white/50 hover:text-white transition-all duration-200">
                    Contact Me
                </a>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                style={{
                    opacity: scrolled ? 0 : visible ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    transitionDelay: scrolled ? '0ms' : '800ms',
                }}
            >
                <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
            </div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/10" />
            <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/10" />
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/10" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/10" />
        </section>
    );
}
