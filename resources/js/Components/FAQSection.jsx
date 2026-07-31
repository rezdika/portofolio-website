import { useEffect, useRef, useState } from 'react';

const faqs = [
    {
        q: 'What services do you offer?',
        a: 'I offer full-stack web development, UI/UX implementation, REST API development, database design, and technical consulting. From building MVPs to scaling existing products — I handle the full lifecycle.',
    },
    {
        q: 'What is your typical project timeline?',
        a: 'It depends on the scope. A simple landing page takes 3–5 days, a mid-size web app takes 2–6 weeks, and a full SaaS product can take 2–4 months. I always provide a detailed timeline estimate before starting.',
    },
    {
        q: 'Do you work with international clients?',
        a: 'Yes! I work remotely with clients worldwide. I\'m flexible with time zones and communicate primarily via Slack, email, or video calls. Most of my recent projects have been with international teams.',
    },
    {
        q: 'What tech stack do you prefer?',
        a: 'My go-to stack is React + Laravel (Inertia.js) with MySQL/PostgreSQL. For APIs I use Node.js or Laravel. I\'m also comfortable with Vue.js, TypeScript, and Docker for containerization.',
    },
    {
        q: 'Do you provide post-launch support?',
        a: 'Yes, I offer 30 days of free bug fixes after launch. For ongoing maintenance and feature development, I offer monthly retainer packages tailored to your needs.',
    },
    {
        q: 'How do we get started?',
        a: 'Simply reach out via the contact form or email me directly. We\'ll schedule a discovery call to discuss your project, goals, and budget. I\'ll then send a detailed proposal within 48 hours.',
    },
    {
        q: 'Are you available for full-time opportunities?',
        a: 'Yes, I\'m open to full-time remote positions as well as long-term contract engagements. Feel free to reach out with your opportunity and we can discuss further.',
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

function FAQItem({ item, index, inView }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(open ? contentRef.current.scrollHeight : 0);
        }
    }, [open]);

    return (
        <div
            className="border-b border-white/10"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms`,
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            >
                <span className={`text-sm font-medium transition-colors duration-200 ${open ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {item.q}
                </span>
                <span
                    className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-hover:border-white/40 group-hover:text-white transition-all duration-200"
                    style={{
                        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                    }}
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>

            {/* Animated answer */}
            <div
                style={{ height: `${height}px`, overflow: 'hidden', transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <div ref={contentRef} className="pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [sectionRef, inView] = useInView(0.1);

    return (
        <section id="faq" ref={sectionRef} className="bg-black py-32 px-6">
            <div className="max-w-3xl mx-auto flex flex-col gap-12">

                {/* Header */}
                <div
                    className="flex flex-col gap-3"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Got Questions?</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Frequently<br />
                            <span className="text-gray-400">Asked.</span>
                        </h2>
                        <p className="text-gray-500 text-sm max-w-xs md:text-right">
                            Can't find your answer? <a href="#contact" className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors">Send me a message.</a>
                        </p>
                    </div>
                </div>

                {/* Accordion */}
                <div className="flex flex-col">
                    {faqs.map((item, i) => (
                        <FAQItem key={i} item={item} index={i} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
