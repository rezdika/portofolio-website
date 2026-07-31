import { useEffect, useRef, useState } from 'react';

const projects = [
    {
        number: '01',
        title: 'Portfolio Website',
        description: 'Personal portfolio website built with Laravel, Inertia.js, and React. Features scroll-driven animations, hexagon hero section, bento grid skills, and interactive project showcase.',
        tags: ['React', 'Laravel', 'Inertia.js', 'Tailwind CSS'],
        image: '/assets/image/project/portofoliowebsite.png',
        color: 'from-violet-500/20 to-indigo-500/10',
        accent: 'bg-violet-500',
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true,
    },
    {
        number: '02',
        title: 'Bucket Website',
        description: 'A modern bucket list web application where users can create, manage, and track their life goals. Features user authentication, goal categorization, and progress tracking.',
        tags: ['Laravel', 'MySQL', 'Tailwind CSS', 'JavaScript'],
        image: '/assets/image/project/bucketwebsite.png',
        color: 'from-emerald-500/20 to-teal-500/10',
        accent: 'bg-emerald-500',
        github: 'https://github.com',
        live: '',
        featured: true,
    },
    {
        number: '03',
        title: 'ProfileLab',
        description: 'A dynamic profile builder platform that lets users create stunning professional profiles with customizable templates, skill showcases, and shareable public links.',
        tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        image: '/assets/image/project/profilelab.png',
        color: 'from-orange-500/20 to-rose-500/10',
        accent: 'bg-orange-500',
        github: 'https://github.com',
        live: 'https://lab-hci-unpad-dev-at8khs.laravel.cloud/',
        featured: true,
    },
    {
        number: '04',
        title: 'REST API Service',
        description: 'Scalable RESTful API built with Laravel, featuring authentication, rate limiting, and comprehensive documentation.',
        tags: ['Laravel', 'MySQL', 'Sanctum', 'Postman'],
        image: null,
        color: 'from-sky-500/20 to-blue-500/10',
        accent: 'bg-sky-500',
        github: 'https://github.com',
        live: null,
        featured: false,
    },
    {
        number: '05',
        title: 'UI Component Library',
        description: 'A reusable React component library with dark mode support, built with Tailwind CSS and Storybook documentation.',
        tags: ['React', 'Tailwind CSS', 'Storybook', 'TypeScript'],
        image: null,
        color: 'from-pink-500/20 to-fuchsia-500/10',
        accent: 'bg-pink-500',
        github: 'https://github.com',
        live: null,
        featured: false,
    },
    {
        number: '06',
        title: 'Admin Dashboard',
        description: 'A clean and responsive admin dashboard template with charts, tables, and user management built with Vue.js.',
        tags: ['Vue.js', 'Laravel', 'Chart.js', 'Tailwind CSS'],
        image: null,
        color: 'from-lime-500/20 to-green-500/10',
        accent: 'bg-lime-500',
        github: 'https://github.com',
        live: null,
        featured: false,
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

function ArrowIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
    );
}

function GithubIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

// Featured large card (first 3)
function FeaturedCard({ project, index }) {
    const [ref, inView] = useInView(0.15);
    const [hovered, setHovered] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-500"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image / Visual side */}
            <div className={`relative h-64 md:h-auto bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden ${!isEven ? 'md:order-2' : ''}`}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            transform: hovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                        }}
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                backgroundSize: '40px 40px',
                                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.6s ease',
                            }}
                        />
                        <span
                            className="text-white/10 font-bold select-none"
                            style={{
                                fontSize: 'clamp(80px, 15vw, 140px)',
                                lineHeight: 1,
                                transform: hovered ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
                                transition: 'transform 0.5s ease',
                            }}
                        >
                            {project.number}
                        </span>
                    </>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} ${project.image ? 'opacity-30' : 'opacity-100'}`} />
                <div className={`absolute top-6 left-6 w-2 h-2 rounded-full ${project.accent}`} />
            </div>

            {/* Content side */}
            <div className={`bg-white/5 p-8 flex flex-col justify-between gap-6 ${!isEven ? 'md:order-1' : ''}`}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs font-mono">{project.number}</span>
                        {project.featured && (
                            <span className="text-xs text-white/50 border border-white/10 px-2 py-0.5 rounded-full">Featured</span>
                        )}
                    </div>
                    <h3
                        className="text-white text-2xl font-bold leading-tight"
                        style={{
                            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-500 border border-white/10 px-2.5 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                        <GithubIcon /> Source
                    </a>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors ml-auto">
                            Live Demo <ArrowIcon />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// Small card (last 3)
function SmallCard({ project, index }) {
    const [ref, inView] = useInView(0.2);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            ref={ref}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors duration-300 cursor-default"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
                transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-start justify-between">
                <div className={`w-8 h-8 rounded-lg ${project.accent} opacity-80 flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{project.number}</span>
                </div>
                <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="text-gray-600 hover:text-white transition-colors">
                        <GithubIcon />
                    </a>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                            className="text-gray-600 hover:text-white transition-colors">
                            <ArrowIcon />
                        </a>
                    )}
                </div>
            </div>

            <div>
                <h3
                    className="text-white font-semibold text-base mb-2"
                    style={{
                        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'transform 0.3s ease',
                    }}
                >
                    {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-600 border border-white/10 px-2 py-0.5 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function ProjectsSection() {
    const [headerRef, headerInView] = useInView(0.3);

    const featured = projects.filter(p => p.featured);
    const others = projects.filter(p => !p.featured);

    return (
        <section id="projects" className="bg-black py-32 px-6">
            <div className="max-w-5xl mx-auto flex flex-col gap-16">

                {/* Header */}
                <div
                    ref={headerRef}
                    className="flex flex-col gap-3"
                    style={{
                        opacity: headerInView ? 1 : 0,
                        transform: headerInView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Selected Work</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Featured<br />
                            <span className="text-gray-400">Projects.</span>
                        </h2>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors self-start md:self-auto border border-white/10 hover:border-white/30 px-4 py-2 rounded-full">
                            View all on GitHub <ArrowIcon />
                        </a>
                    </div>
                </div>

                {/* Featured cards */}
                <div className="flex flex-col gap-4">
                    {featured.map((project, i) => (
                        <FeaturedCard key={project.number} project={project} index={i} />
                    ))}
                </div>

                {/* Other projects */}
                <div className="flex flex-col gap-6">
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Other Projects</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {others.map((project, i) => (
                            <SmallCard key={project.number} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
