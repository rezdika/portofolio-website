import { useEffect, useRef, useState } from 'react';
import LogoLoop from './LogoLoop';
import TiltedCard from './TiltedCard';
import {
    SiReact, SiLaravel, SiNodedotjs, SiTailwindcss, SiMysql, SiPhp,
    SiJavascript, SiTypescript, SiGit, SiFigma, SiDocker, SiPostgresql,
    SiVuedotjs, SiInertia, SiVite, SiLinux
} from 'react-icons/si';

const stats = [
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 20, suffix: '+', label: 'Projects Done' },
    { value: 15, suffix: '+', label: 'Happy Clients' },
    { value: 5, suffix: '', label: 'Awards Won' },
];

const rowOne = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiLaravel />, title: 'Laravel', href: 'https://laravel.com' },
    { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
    { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { node: <SiMysql />, title: 'MySQL', href: 'https://mysql.com' },
    { node: <SiPhp />, title: 'PHP', href: 'https://php.net' },
    { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org' },
    { node: <SiTypescript />, title: 'TypeScript', href: 'https://typescriptlang.org' },
];

const rowTwo = [
    { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
    { node: <SiFigma />, title: 'Figma', href: 'https://figma.com' },
    { node: <SiDocker />, title: 'Docker', href: 'https://docker.com' },
    { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://postgresql.org' },
    { node: <SiVuedotjs />, title: 'Vue.js', href: 'https://vuejs.org' },
    { node: <SiInertia />, title: 'Inertia.js', href: 'https://inertiajs.com' },
    { node: <SiVite />, title: 'Vite', href: 'https://vitejs.dev' },
    { node: <SiLinux />, title: 'Linux', href: 'https://linux.org' },
];

function useInView(threshold = 0.2) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setInView(true); obs.disconnect(); }
        }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

function Counter({ target, suffix, inView }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 30);
        return () => clearInterval(timer);
    }, [inView, target]);
    return <span>{count}{suffix}</span>;
}

export default function AboutSection() {
    const [sectionRef, inView] = useInView(0.15);

    const fadeUp = (delay = 0) =>
        `transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
        + ` delay-[${delay}ms]`;

    return (
        <section id="about" ref={sectionRef} className="bg-black py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT — TiltedCard Photo */}
                <div className={`relative flex justify-center transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
                    <TiltedCard
                        imageSrc="/assets/image/about/guwa.png"
                        altText="Rezdika Akbar"
                        captionText="Rezdika Akbar Dwi Putra Hadi"
                        containerHeight="420px"
                        containerWidth="100%"
                        imageHeight="380px"
                        imageWidth="380px"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <div className="absolute bottom-0 left-0 right-0 p-5 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-bold text-lg leading-tight whitespace-nowrap">Rezdika Akbar</p>
                                <p className="text-white/50 text-xs mt-1 whitespace-nowrap">Full Stack Developer</p>
                            </div>
                        }
                    />

                </div>

                {/* RIGHT — Content */}
                <div className="flex flex-col gap-6">
                    {/* Label */}
                    <p className={`text-gray-500 text-xs uppercase tracking-[0.3em] transition-all duration-700 delay-[100ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        About Me
                    </p>

                    {/* Heading */}
                    <h2 className={`text-white text-4xl md:text-5xl font-bold leading-tight transition-all duration-700 delay-[200ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Turning ideas into<br />
                        <span className="text-gray-400">real products.</span>
                    </h2>

                    {/* Bio */}
                    <p className={`text-gray-400 text-sm leading-relaxed transition-all duration-700 delay-[300ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        I'm Rezdika Akbar, a passionate Full Stack Developer based in Indonesia.
                        I love building clean, performant web applications with great user experiences.
                        From backend architecture to pixel-perfect UI — I handle it all.
                    </p>

                    {/* Logo Loop — 2 rows */}
                    <div className={`flex flex-col gap-3 transition-all duration-700 delay-[400ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <LogoLoop
                            logos={rowOne}
                            speed={60}
                            direction="left"
                            logoHeight={28}
                            gap={32}
                            hoverSpeed={0}
                            fadeOut
                            fadeOutColor="#000000"
                            scaleOnHover
                            className="text-white/70"
                        />
                        <LogoLoop
                            logos={rowTwo}
                            speed={60}
                            direction="right"
                            logoHeight={28}
                            gap={32}
                            hoverSpeed={0}
                            fadeOut
                            fadeOutColor="#000000"
                            scaleOnHover
                            className="text-white/70"
                        />
                    </div>

                    {/* Stats */}
                    <div className={`grid grid-cols-4 gap-4 pt-4 border-t border-white/10 transition-all duration-700 delay-[500ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {stats.map((s) => (
                            <div key={s.label}>
                                <p className="text-white text-3xl font-bold">
                                    <Counter target={s.value} suffix={s.suffix} inView={inView} />
                                </p>
                                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className={`flex gap-4 pt-2 transition-all duration-700 delay-[600ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <a href="#contact" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                            Let's Talk
                        </a>
                        <a href="/cv.pdf" download className="border border-white/30 text-white px-6 py-2.5 rounded-full text-sm hover:border-white transition-colors">
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
