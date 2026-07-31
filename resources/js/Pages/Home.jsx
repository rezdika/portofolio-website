import { useState } from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import AboutSection from '../Components/AboutSection';
import SkillsSection from '../Components/SkillsSection';
import ExperienceSection from '../Components/ExperienceSection';
import ProjectsSection from '../Components/ProjectsSection';
import AchievementsSection from '../Components/AchievementsSection';
import FAQSection from '../Components/FAQSection';
import ContactSection from '../Components/ContactSection';
import ScrollLine from '../Components/ScrollLine';
import SideNav from '../Components/SideNav';
import Footer from '../Components/Footer';

export default function Home() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const navVisible = scrollProgress >= 0.5;

    return (
        <div className="bg-black min-h-screen relative">
            <ScrollLine />
            <SideNav visible={navVisible} />
            <Navbar visible={navVisible} />
            <HeroSection onScrollProgress={setScrollProgress} />
            <AboutSection />

            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <AchievementsSection />
            <FAQSection />
            <ContactSection />

            <Footer />
        </div>
    );
}
