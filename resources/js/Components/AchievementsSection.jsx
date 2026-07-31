import { useEffect, useRef, useState, useCallback } from 'react';

const certificates = [
    {
        title: 'Juara 1 EventInformindfest',
        issuer: 'Nasional Web Programming Competition',
        image: '/assets/image/achievements/sertifikat/sertifikat3 - Juara 1 EventInformindfest - NasionalWeb Programming Competation.png',
    },
    {
        title: 'Peraih Medali Emas',
        issuer: 'University ID Olimpiade Matematika',
        image: '/assets/image/achievements/sertifikat/sertifikat1-peraih medali emas by university id olimpiade matematika.png',
    },
    {
        title: 'Runner Up Basketball Event',
        issuer: 'Merdeka Ala Kita',
        image: '/assets/image/achievements/sertifikat/sertifikat2- Runner up basketball event merdeka ala kita.png',
    },
    {
        title: 'Partisipasi Lomba Web Development',
        issuer: 'Tingkat Nasional',
        image: '/assets/image/achievements/sertifikat/sertifikat4 - partisipasi lomba web development tingkat nasional.png',
    },
    {
        title: 'Finalis Olimpiade Matematika',
        issuer: 'Tingkat Nasional',
        image: '/assets/image/achievements/sertifikat/sertifikat5- Sebagai finalis komptesi Olimpiade Matematika Tingkat Nasional.png',
    },
];

const awards = [
    {
        title: 'Runner Up Basketball Event',
        issuer: 'Merdeka Ala Kita',
        image: '/assets/image/achievements/award/award1.jpg',
    },
    {
        title: 'Juara 1 Web Programming Competition',
        issuer: 'Informindfest — Nasional',
        image: '/assets/image/achievements/award/award2.jpg',
    },
    {
        title: 'Award',
        issuer: '',
        image: '/assets/image/achievements/award/award3.jpg',
    },
];

function useInView(threshold = 0.1) {
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

// Lightbox
function Lightbox({ item, onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-16" onClick={onClose}>
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <div className="relative z-10 max-w-3xl w-full flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-10 right-0 text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    <img src={item.image} alt={item.title} className="w-full object-contain max-h-[70vh]" />
                </div>
                <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    {item.issuer && <p className="text-gray-400 text-sm mt-0.5">{item.issuer}</p>}
                </div>
            </div>
        </div>
    );
}

// Horizontal drag scroll strip
function ScrollStrip({ items, label, accent, inView, onCardClick }) {
    const trackRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - trackRef.current.offsetLeft;
        scrollLeft.current = trackRef.current.scrollLeft;
        trackRef.current.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        trackRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = 'grab';
    };

    // Touch support
    const touchStart = useRef(0);
    const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; scrollLeft.current = trackRef.current.scrollLeft; };
    const onTouchMove = (e) => {
        const walk = (touchStart.current - e.touches[0].clientX) * 1.2;
        trackRef.current.scrollLeft = scrollLeft.current + walk;
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Label */}
            <div
                className="flex items-center gap-3"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${accent}`} />
                <p className="text-gray-500 text-xs uppercase tracking-widest">{label}</p>
                <span className="text-gray-700 text-xs">{items.length} items</span>
            </div>

            {/* Track */}
            <div
                ref={trackRef}
                className="flex gap-4 overflow-x-auto pb-4 cursor-grab select-none"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollSnapType: 'x mandatory',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
            >
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="shrink-0 group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
                        style={{
                            width: 'clamp(260px, 35vw, 380px)',
                            height: 'clamp(180px, 22vw, 260px)',
                            scrollSnapAlign: 'start',
                        }}
                        onClick={() => !isDragging.current && onCardClick(item)}
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            draggable={false}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                            {item.issuer && <p className="text-gray-400 text-xs mt-0.5">{item.issuer}</p>}
                        </div>

                        {/* Zoom icon */}
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AchievementsSection() {
    const [sectionRef, inView] = useInView(0.1);
    const [lightbox, setLightbox] = useState(null);

    return (
        <section id="achievements" ref={sectionRef} className="bg-black py-32 overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col gap-14">

                {/* Header */}
                <div
                    className="flex flex-col gap-3 px-6"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Recognition</p>
                    <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                        Achievements &<br />
                        <span className="text-gray-400">Certificates.</span>
                    </h2>
                    <p className="text-gray-600 text-xs mt-1">Drag or swipe to explore · Click to view full</p>
                </div>

                {/* Certificates strip — bleeds to edge */}
                <div className="pl-6">
                    <ScrollStrip
                        items={certificates}
                        label="Certificates"
                        accent="bg-blue-500"
                        inView={inView}
                        onCardClick={setLightbox}
                    />
                </div>

                {/* Awards strip */}
                <div className="pl-6">
                    <ScrollStrip
                        items={awards}
                        label="Awards"
                        accent="bg-yellow-500"
                        inView={inView}
                        onCardClick={setLightbox}
                    />
                </div>
            </div>

            {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
        </section>
    );
}
