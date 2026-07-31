import { useEffect, useRef, useState } from 'react';
import {
    SiReact, SiVuedotjs, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5,
    SiLaravel, SiNodedotjs, SiPhp, SiPython, SiInertia,
    SiMysql, SiPostgresql, SiMongodb, SiRedis,
    SiGit, SiDocker, SiLinux, SiVite, SiFigma,
    SiGithub, SiPostman, SiNpm, SiBootstrap,
} from 'react-icons/si';

const categories = [
    {
        label: 'Frontend',
        col: 'md:col-span-2',
        skills: [
            { name: 'React', icon: SiReact, level: 90 },
            { name: 'Vue.js', icon: SiVuedotjs, level: 75 },
            { name: 'JavaScript', icon: SiJavascript, level: 92 },
            { name: 'TypeScript', icon: SiTypescript, level: 70 },
            { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95 },
            { name: 'HTML5', icon: SiHtml5, level: 98 },
            { name: 'Bootstrap', icon: SiBootstrap, level: 88 },
        ],
    },
    {
        label: 'Backend',
        col: 'md:col-span-1',
        skills: [
            { name: 'Laravel', icon: SiLaravel, level: 88 },
            { name: 'Node.js', icon: SiNodedotjs, level: 80 },
            { name: 'PHP', icon: SiPhp, level: 85 },
            { name: 'Python', icon: SiPython, level: 65 },
            { name: 'Inertia.js', icon: SiInertia, level: 82 },
        ],
    },
    {
        label: 'Database',
        col: 'md:col-span-1',
        skills: [
            { name: 'MySQL', icon: SiMysql, level: 85 },
            { name: 'PostgreSQL', icon: SiPostgresql, level: 75 },
            { name: 'MongoDB', icon: SiMongodb, level: 65 },
            { name: 'Redis', icon: SiRedis, level: 60 },
        ],
    },
    {
        label: 'Tools & DevOps',
        col: 'md:col-span-2',
        skills: [
            { name: 'Git', icon: SiGit, level: 90 },
            { name: 'Docker', icon: SiDocker, level: 70 },
            { name: 'Linux', icon: SiLinux, level: 72 },
            { name: 'Vite', icon: SiVite, level: 85 },
            { name: 'GitHub', icon: SiGithub, level: 90 },
            { name: 'Postman', icon: SiPostman, level: 88 },
            { name: 'npm', icon: SiNpm, level: 85 },
        ],
    },
    {
        label: 'Design',
        col: 'md:col-span-1',
        skills: [
            { name: 'Figma', icon: SiFigma, level: 78 },
        ],
    },
];

function useInView(threshold = 0.15) {
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

function SkillBar({ name, icon: Icon, level, inView, delay }) {
    return (
        <div
            className="flex flex-col gap-1.5"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-base"><Icon /></span>
                    <span>{name}</span>
                </div>
                <span className="text-gray-500 text-xs">{level}%</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white rounded-full"
                    style={{
                        width: inView ? `${level}%` : '0%',
                        transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay + 200}ms`,
                    }}
                />
            </div>
        </div>
    );
}

function BentoCard({ category, inView, cardDelay }) {
    return (
        <div
            className={`${category.col} bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5 hover:border-white/20 transition-colors duration-300`}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
                transition: `opacity 0.6s ease ${cardDelay}ms, transform 0.6s ease ${cardDelay}ms`,
            }}
        >
            <p className="text-gray-500 text-xs uppercase tracking-widest">{category.label}</p>
            <div className="flex flex-col gap-4">
                {category.skills.map((skill, i) => (
                    <SkillBar
                        key={skill.name}
                        {...skill}
                        inView={inView}
                        delay={cardDelay + i * 60}
                    />
                ))}
            </div>
        </div>
    );
}

export default function SkillsSection() {
    const [sectionRef, inView] = useInView(0.1);

    return (
        <section id="skills" ref={sectionRef} className="bg-black py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col gap-12">

                {/* Header */}
                <div
                    className="flex flex-col gap-3"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">What I Work With</p>
                    <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                        Skills &<br />
                        <span className="text-gray-400">Tech Stack.</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((cat, i) => (
                        <BentoCard
                            key={cat.label}
                            category={cat}
                            inView={inView}
                            cardDelay={100 + i * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
