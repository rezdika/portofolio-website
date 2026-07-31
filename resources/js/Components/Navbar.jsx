import { useState, useEffect } from 'react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

// visible: controlled by parent based on scroll progress >= 0.5 (2x viewport = 50% of 300vh)
export default function Navbar({ visible = false }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50
            transition-all duration-500
            md:hidden
            ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="text-white font-bold text-xl tracking-tight">
                    Rezdika<span className="text-gray-400">.</span>
                </a>

                {/* Desktop */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <a href={link.href} className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="#contact" className="bg-white text-black text-sm px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
                            Hire Me
                        </a>
                    </li>
                </ul>

                {/* Mobile toggle */}
                <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md px-6 pb-6">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <a href={link.href} onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm block transition-colors">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-white text-black text-sm px-4 py-2 rounded-full inline-block hover:bg-gray-200 transition-colors">
                                Hire Me
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
