import { useEffect, useRef, useState } from 'react';

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

const contactInfo = [
    {
        label: 'WhatsApp',
        value: '+62 821-2609-9407',
        href: 'https://wa.me/6282126099407',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.428a.75.75 0 00.916.916l5.57-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.432l-.371-.22-3.853 1.021 1.021-3.741-.242-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/rezdika-akbr',
        href: 'https://www.linkedin.com/in/rezdika-akbr-8a16aa378/',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        value: 'github.com/rezdika',
        href: 'https://github.com/rezdika',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        value: '@rezdkaaakbr._',
        href: 'https://www.instagram.com/rezdkaaakbr._',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
];

function InputField({ label, type = 'text', name, value, onChange, placeholder }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 text-xs uppercase tracking-widest">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-all duration-200"
                style={{ borderColor: focused ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }}
            />
        </div>
    );
}

function TextareaField({ label, name, value, onChange, placeholder }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 text-xs uppercase tracking-widest">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none resize-none transition-all duration-200"
                style={{ borderColor: focused ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }}
            />
        </div>
    );
}

export default function ContactSection() {
    const [sectionRef, inView] = useInView(0.1);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate send — replace with actual API call
        await new Promise(r => setTimeout(r, 1500));
        setStatus('sent');
    };

    const fadeUp = (delay = 0) => ({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    });

    return (
        <section id="contact" ref={sectionRef} className="bg-black py-32 px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

                {/* LEFT — Info */}
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3" style={fadeUp(0)}>
                        <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Get In Touch</p>
                        <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Let's work<br />
                            <span className="text-gray-400">together.</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mt-2">
                            Have a project in mind or just want to say hi?
                            My inbox is always open — I'll get back to you within 24 hours.
                        </p>
                    </div>

                    {/* Contact links */}
                    <div className="flex flex-col gap-3" style={fadeUp(150)}>
                        {contactInfo.map((info) => (
                            <a
                                key={info.label}
                                href={info.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/[0.07] transition-all duration-300"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/20 transition-all duration-200 shrink-0">
                                    {info.icon}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">{info.label}</p>
                                    <p className="text-white text-sm">{info.value}</p>
                                </div>
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-white ml-auto transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </a>
                        ))}
                    </div>

                    {/* Availability badge */}
                    <div style={fadeUp(250)} className="flex items-center gap-3">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-gray-400 text-sm">Available for new projects</span>
                    </div>
                </div>

                {/* RIGHT — Form */}
                <div style={fadeUp(100)}>
                    {status === 'sent' ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 text-center border border-white/10 rounded-2xl p-10 bg-white/5">
                            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold text-lg">Message Sent!</h3>
                            <p className="text-gray-400 text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                            <button
                                onClick={() => { setStatus(null); setForm({ name: '', email: '', subject: '', message: '' }); }}
                                className="text-gray-500 hover:text-white text-sm transition-colors mt-2 underline underline-offset-4"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-white/10 rounded-2xl p-8 bg-white/5">
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Rezdika Akbar" />
                                <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="hello@email.com" />
                            </div>
                            <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry" />
                            <TextareaField label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." />

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-white text-black py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
