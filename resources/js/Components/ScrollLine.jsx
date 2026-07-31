import { useEffect, useRef, useState, useCallback } from 'react';

const SECTIONS = ['#hero', '#about', '#skills', '#experience', '#projects', '#achievements', '#faq', '#contact'];

export default function ScrollLine() {
    const pathRef = useRef(null);
    const svgRef = useRef(null);
    const [pathD, setPathD] = useState('');
    const [svgHeight, setSvgHeight] = useState(0);

    // Build a weaving path through all section midpoints
    const buildPath = useCallback(() => {
        const docHeight = document.documentElement.scrollHeight;
        const docWidth = window.innerWidth;
        setSvgHeight(docHeight);

        const points = [];

        SECTIONS.forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const mid = top + rect.height / 2;
            // Alternate left/right weave
            const x = i % 2 === 0 ? docWidth * 0.15 : docWidth * 0.85;
            points.push({ x, y: mid });
        });

        if (points.length < 2) return;

        // Start from top center
        let d = `M ${docWidth / 2} 0 `;

        points.forEach((pt, i) => {
            if (i === 0) {
                d += `C ${docWidth / 2} ${pt.y * 0.3}, ${pt.x} ${pt.y * 0.7}, ${pt.x} ${pt.y} `;
            } else {
                const prev = points[i - 1];
                const cpY = (prev.y + pt.y) / 2;
                d += `C ${prev.x} ${cpY}, ${pt.x} ${cpY}, ${pt.x} ${pt.y} `;
            }
        });

        // End at bottom center
        const last = points[points.length - 1];
        d += `C ${last.x} ${docHeight * 0.95}, ${docWidth / 2} ${docHeight * 0.97}, ${docWidth / 2} ${docHeight}`;

        setPathD(d);
    }, []);

    // Init path after DOM is ready
    useEffect(() => {
        const timer = setTimeout(buildPath, 300);
        window.addEventListener('resize', buildPath);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', buildPath);
        };
    }, [buildPath]);

    // Scroll-driven stroke animation
    useEffect(() => {
        if (!pathD) return;

        const path = pathRef.current;
        if (!path) return;

        // Wait for path to render
        requestAnimationFrame(() => {
            const length = path.getTotalLength();
            if (!length) return;

            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;

            const onScroll = () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = Math.min(scrollTop / docHeight, 1);
                path.style.strokeDashoffset = `${length - length * progress}`;
            };

            window.addEventListener('scroll', onScroll, { passive: true });
            // Trigger once on mount
            onScroll();

            return () => window.removeEventListener('scroll', onScroll);
        });
    }, [pathD]);

    if (!pathD) return null;

    return (
        <div
            className="absolute top-0 left-0 w-full pointer-events-none z-0"
            style={{ height: svgHeight }}
            aria-hidden
        >
            <svg
                ref={svgRef}
                width="100%"
                height={svgHeight}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="40%" stopColor="rgba(255,255,255,0.15)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Shadow/glow layer */}
                <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />

                {/* Main animated line */}
                <path
                    ref={pathRef}
                    d={pathD}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                />
            </svg>
        </div>
    );
}
