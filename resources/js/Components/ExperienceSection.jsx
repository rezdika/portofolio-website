import { useEffect, useRef, useState } from 'react';

const experiences = [
    {
        role: 'AI & Software Development Participant',
        company: 'Samsung Innovation Campus',
        type: 'Program',
        period: 'Jul 2026 — Present',
        duration: 'Ongoing',
        location: 'Bandung, Indonesia',
        initials: 'SIC',
        description: [
            'Selected as a participant in Samsung Innovation Campus 2026 — a prestigious tech program by Samsung.',
            'Learning Artificial Intelligence, IoT, and Software Development through a 6-month intensive program.',
            'Collaborating with Team HIDUP PECUT AI to develop AI-based solutions for real-world problems.',
            'Working directly with mentors from Samsung on industry-grade technology projects.',
        ],
        tags: ['AI', 'Python', 'IoT', 'Team Collaboration'],
    },
    {
        role: 'Founder & Full Stack Developer',
        company: 'DexterCode',
        type: 'Self-employed',
        period: '2025 — Present',
        duration: 'Ongoing',
        location: 'Indonesia · Remote',
        initials: 'DC',
        description: [
            'Founded DexterCode, a digital agency focused on website and custom application development.',
            'Designed and developed responsive company profile websites, landing pages, and business web apps.',
            'Managed end-to-end project lifecycle: branding, UI/UX design, development, deployment, and client communication.',
            'Built modern web interfaces using Laravel, Next.js, React, and Tailwind CSS.',
            'Handled client acquisition, project scoping, and delivery for multiple concurrent projects.',
        ],
        tags: ['Laravel', 'Next.js', 'React', 'Tailwind CSS', 'UI/UX Design'],
    },
    {
        role: 'Freelance Full Stack Web Developer',
        company: 'Freelance',
        type: 'Freelance',
        period: '2024 — Present',
        duration: 'Ongoing',
        location: 'Indonesia · Remote',
        initials: 'FL',
        description: [
            'Developed websites for personal brands, portfolios, and small businesses across various industries.',
            'Built responsive web applications using PHP, Laravel, and MySQL with clean, maintainable code.',
            'Customized website interfaces based on client requirements and brand guidelines.',
            'Managed full project lifecycle from planning, development, testing, to deployment and post-launch support.',
        ],
        tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    },
    {
        role: 'Website Developer',
        company: 'Human Computer Interaction Laboratory',
        type: 'Academic Project',
        period: '2026',
        duration: '',
        location: 'Bandung, Indonesia',
        initials: 'LAB',
        description: [
            'Contributed to the development of the HCI Laboratory official website.',
            'Implemented responsive layouts and improved user interface components for better usability.',
            'Collaborated with the team on website design, content structure, and presentation.',
            'Applied HCI principles to ensure an accessible and user-friendly experience.',
        ],
        tags: ['Laravel', 'HTML', 'CSS', 'JavaScript'],
        live: 'https://lab-hci-unpad-dev-at8khs.laravel.cloud/',
    },
    {
        role: 'Frontend & Website Designer',
        company: 'Floristy Keynyla',
        type: 'Project',
        period: '2026',
        duration: '',
        location: 'Indonesia · Remote',
        initials: 'FK',
        description: [
            'Designed and developed a modern website interface for a florist business.',
            'Created responsive layouts with a strong focus on visual aesthetics and user experience.',
            'Produced promotional design assets for social media aligned with the website branding.',
            'Delivered a cohesive brand identity through consistent design language across all touchpoints.',
        ],
        tags: ['Figma', 'UI Design', 'Frontend Development'],
        live: 'https://floristy-keynyla.wuaze.com',
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

function ExperienceCard({ exp, index }) {
    const [ref, inView] = useInView(0.2);

    return (
        <div ref={ref} className="relative flex gap-6">
            {/* Timeline line & dot */}
            <div className="flex flex-col items-center">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 border border-white/10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'scale(1)' : 'scale(0.5)',
                        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
                    }}
                >
                    {exp.initials}
                </div>
                {/* Vertical line */}
                <div
                    className="w-px bg-white/10 flex-1 mt-3"
                    style={{
                        height: inView ? '100%' : '0%',
                        transition: `height 0.8s ease ${index * 100 + 300}ms`,
                    }}
                />
            </div>

            {/* Card */}
            <div
                className="flex-1 pb-10"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(24px)',
                    transition: `opacity 0.6s ease ${index * 100 + 100}ms, transform 0.6s ease ${index * 100 + 100}ms`,
                }}
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                        <h3 className="text-white font-semibold text-base leading-tight">{exp.role}</h3>
                        <p className="text-gray-400 text-sm mt-0.5">
                            {exp.company} · <span className="text-gray-500">{exp.type}</span>
                        </p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-gray-500 text-xs">{exp.period}</p>
                        <p className="text-gray-600 text-xs">{exp.duration}</p>
                    </div>
                </div>

                <p className="text-gray-600 text-xs mb-3 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {exp.location}
                </p>

                {/* Description */}
                <ul className="flex flex-col gap-1.5 mb-4">
                    {exp.description.map((d, i) => (
                        <li key={i} className="text-gray-400 text-sm flex gap-2">
                            <span className="text-white/30 mt-1 shrink-0">–</span>
                            <span>{d}</span>
                        </li>
                    ))}
                </ul>

                {/* Tags + Live link */}
                <div className="flex flex-wrap items-center gap-2">
                    {exp.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-400 border border-white/10 px-2.5 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                    {exp.live && (
                        <a href={exp.live} target="_blank" rel="noopener noreferrer"
                            className="ml-auto flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-2.5 py-0.5 rounded-full transition-colors">
                            Live
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ExperienceSection() {
    const [headerRef, headerInView] = useInView(0.3);

    return (
        <section id="experience" className="bg-black py-32 px-6">
            <div className="max-w-3xl mx-auto flex flex-col gap-12">

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
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Career Path</p>
                    <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                        Work<br />
                        <span className="text-gray-400">Experience.</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="flex flex-col">
                    {experiences.map((exp, i) => (
                        <ExperienceCard key={i} exp={exp} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
