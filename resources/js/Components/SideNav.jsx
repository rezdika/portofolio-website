import { useEffect, useState, useCallback } from 'react';
import OptionWheel from './OptionWheel';

const sections = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
];

const items = sections.map(s => s.label);

export default function SideNav({ visible = false }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [key, setKey] = useState(0);

    // Detect active section on scroll
    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY + window.innerHeight * 0.4;
            let current = 0;
            sections.forEach((s, i) => {
                const el = document.getElementById(s.id);
                if (!el) return;
                if (el.offsetTop <= scrollY) current = i;
            });
            setActiveIndex(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Smooth scroll to section on wheel change
    const handleChange = useCallback((index) => {
        const el = document.getElementById(sections[index].id);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <div
            className={`
                fixed left-0 top-0 h-screen z-40
                hidden md:flex items-center
                transition-all duration-700
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
            `}
            style={{ width: '210px' }}
        >
            {/* Subtle left border line */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-white/5" />

            <OptionWheel
                key={key}
                items={items}
                defaultSelected={activeIndex}
                onChange={handleChange}
                textColor="#4b5563"
                activeColor="#ffffff"
                side="left"
                fontSize={1.1}
                spacing={2.2}
                curve={0.8}
                tilt={7}
                blur={1.2}
                fade={0.35}
                minOpacity={0.04}
                smoothing={200}
                inset={24}
                loop={false}
                draggable
            />
        </div>
    );
}
