import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

import HeroLuxury from '@/components/HeroLuxury';


// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM ICONS (PREMIUM GAME STYLE)
// ═══════════════════════════════════════════════════════════════════════════

const IconSnake = ({ className }) => (
    <svg viewBox="0 0 300 300" fill="none" className={className}>
        <path d="M 50 150 Q 80 100, 120 120 T 180 140 Q 220 150, 240 180 T 220 220" stroke="currentColor" strokeWidth="28" strokeLinecap="round" />
        <circle cx="220" cy="220" r="18" fill="currentColor" />
        <circle cx="215" cy="215" r="3" fill="#000" />
    </svg>
);

// --- NEW SACRED ICONS ---
const IconSoul = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
    </svg>
);

const IconGlobal = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const IconUnlock = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const IconVerify = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

// --- KINGDOM ICONS ---
const IconCastle = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M4 21v-8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" /><path d="M4 11V7l2.5-2.5L9 7V6l2.5-2.5L14 6v1l2.5-2.5L19 7v4" /><path d="M10 21v-4h4v4" /></svg>;
const IconLoop = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
const IconFunction = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 8h10" /><path d="M7 12h10" /><path d="M7 16h6" /></svg>;
const IconStructure = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M12 21V9" /><path d="M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" /><path d="M18.8 6a3 3 0 1 0-2.3-4.5" /></svg>;
const IconModule = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /></svg>;
const IconAlgo = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M18 6L6 18" /><path d="M6 6l12 12" /><rect x="4" y="4" width="16" height="16" rx="2" /></svg>;
const IconVillage = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M2 22h20" /><path d="M17 2h-4v4h-2V4H7v18h2v-8h6v8h2" /></svg>;
const IconCity = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M3 21h18" /><path d="M5 21V7l8-4 8 4v14" /><path d="M13 21V11" /></svg>;
const IconCrown = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" /></svg>;
const IconBot = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M2 13h2" /><path d="M20 13h2" /><path d="M9 13v.01" /><path d="M15 13v.01" /><path d="M9 4v4" /><path d="M15 4v4" /><circle cx="12" cy="4" r="2" /></svg>;

// XP Icon
const IconXP = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// THE 9 KINGDOMS (SACRED DATA)
// ═══════════════════════════════════════════════════════════════════════════

const kingdoms = [
    { id: 'basics', name: 'Basics Kingdom', img: '/src/assets/icons/basics_kingdom_icon_1770173834840.png', icon: IconCastle, color: 'from-blue-600 to-indigo-600', tagline: 'The Foundation', xp: 500, unlocked: true },
    { id: 'loops', name: 'Loops Land', img: '/src/assets/icons/loops_land_icon_1770173850108.png', icon: IconLoop, color: 'from-pink-500 to-rose-500', tagline: 'The Automation', xp: 750, unlocked: true },
    { id: 'functions', name: 'Function Forest', img: '/src/assets/icons/function_forest_icon_1770173865403.png', icon: IconFunction, color: 'from-green-500 to-emerald-600', tagline: 'The Logic', xp: 1000, unlocked: true },
    { id: 'oop', name: 'OOP Forest', img: '/src/assets/icons/oop_forest_icon_1770173879967.png', icon: IconStructure, color: 'from-orange-500 to-amber-500', tagline: 'The Architecture', xp: 1250, unlocked: false },
    { id: 'modules', name: 'Module Mountains', img: '/src/assets/icons/module_mountains_icon_1770173895145.png', icon: IconModule, color: 'from-purple-500 to-violet-500', tagline: 'The Toolkit', xp: 1500, unlocked: false },
    { id: 'algorithms', name: 'Algorithm Arena', img: '/src/assets/icons/algorithm_arena_icon_1770173910552.png', icon: IconAlgo, color: 'from-red-600 to-orange-700', tagline: 'The Competition', xp: 2000, unlocked: false },
    { id: 'ml_village', name: 'ML Village', icon: IconVillage, color: 'from-cyan-500 to-sky-500', tagline: 'The Intelligence', xp: 2500, unlocked: false },
    { id: 'ml_city', name: 'ML City', icon: IconCity, color: 'from-blue-700 to-indigo-800', tagline: 'The Neural Net', xp: 3000, unlocked: false },
    { id: 'ml_kingdom', name: 'ML Kingdom', icon: IconCrown, color: 'from-yellow-400 to-amber-500', tagline: 'The Mastery', xp: 5000, unlocked: false },
];


// ═══════════════════════════════════════════════════════════════════════════
// FLOATING PARTICLES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const FloatingParticles = () => (
    <div className="particles">
        {[...Array(10)].map((_, i) => (
            <div key={i} className="particle" />
        ))}
    </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS RING COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const ProgressRing = ({ progress = 33, size = 60, strokeWidth = 4, color = "#10B981" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} className="progress-ring">
            <circle
                stroke="rgba(255,255,255,0.1)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="progress-ring__circle"
                stroke={color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
        </svg>
    );
};

// ═══════════════════════════════════════════════════════════════════════════
// XP BADGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const XPBadge = ({ xp }) => (
    <div className="xp-badge">
        <IconXP className="w-3 h-3" />
        <span>+{xp} XP</span>
    </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function ValidationLanding() {
    // Analytics
    useEffect(() => {
        if (window.gtag) window.gtag('event', 'page_view', { page_title: 'Validation Landing', page_path: window.location.pathname });
        if (window.fbq) window.fbq('track', 'PageView');
    }, []);

    const [waitlistCount, setWaitlistCount] = useState(6445);

    const handleJoin = () => {
        setWaitlistCount(prev => prev + 1);
    };

    const scrollToWaitlist = () => {
        const form = document.getElementById('hero-waitlist-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Attempt to focus the input after a small delay to account for smooth scroll
            setTimeout(() => {
                const input = form.querySelector('input');
                if (input) input.focus({ preventScroll: true });
            }, 600); // 600ms is a reasonable duration for smooth scroll
        }
    };

    return (
        <div className="min-h-screen bg-surface-deep text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">

            {/* ═══════════════════════════════════════════════════════════════════
                SNAKE WEBGL BACKGROUND
                ═══════════════════════════════════════════════════════════════════ */}
            {/* ═══════════════════════════════════════════════════════════════════
                HERO SECTION (NEO-LUXURY REDESIGN)
                ═══════════════════════════════════════════════════════════════════ */}
            <HeroLuxury waitlistCount={waitlistCount} onJoin={handleJoin} />



            {/* ═══════════════════════════════════════════════════════════════════
                NAVIGATION (BRAND IDENTITY)
                ═══════════════════════════════════════════════════════════════════ */}
            <nav className="fixed top-14 left-0 right-0 z-50 flex justify-center w-full px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass flex items-center gap-4 px-6 py-3 rounded-full shadow-depth hover:shadow-glow-sm transition-all duration-500"
                >
                    <div className="w-9 h-9 text-emerald-400 icon-float">
                        <IconSnake className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                    </div>
                    <span className="text-xl font-black tracking-wider text-white">
                        SNAKELEARN
                    </span>
                    <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
                        <div className="level-badge">1</div>
                        <span className="text-xs font-mono text-gray-400">LEVEL</span>
                    </div>
                </motion.div>
            </nav>

            {/* ═══════════════════════════════════════════════════════════════════
                HERO SECTION
                ═══════════════════════════════════════════════════════════════════ */}


            {/* ═══════════════════════════════════════════════════════════════════
                THE 9 KINGDOMS (CORE IDENTITY)
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-28 bg-surface-elevated relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Your Quest Awaits</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">The World Map</h2>
                        <p className="text-xl text-gray-400">From Hello World to Certified Professional.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-yellow-900/50 transform -translate-y-1/2 hidden lg:block rounded-full animate-gradient-flow" style={{ backgroundSize: '200% 100%' }} />

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-6 relative z-10">
                            {kingdoms.map((kingdom, index) => (
                                <motion.div
                                    key={kingdom.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className={`group flex flex-col items-center text-center ${!kingdom.unlocked ? 'opacity-60' : ''}`}
                                >
                                    <div className="relative">
                                        {/* Glow Ring */}
                                        <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${kingdom.color} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}></div>

                                        <div className={`relative w-20 h-20 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${kingdom.color} p-[2px] shadow-lg group-hover:scale-110 transition-all duration-300 ${kingdom.unlocked ? 'hover:shadow-glow-md' : ''}`}>
                                            <div className="w-full h-full bg-surface-card rounded-[14px] flex items-center justify-center relative overflow-hidden">
                                                {kingdom.img ? (
                                                    <img
                                                        src={kingdom.img}
                                                        alt={kingdom.name}
                                                        className={`w-full h-full object-cover ${!kingdom.unlocked ? 'grayscale opacity-50' : ''}`}
                                                    />
                                                ) : (
                                                    <kingdom.icon className={`w-8 h-8 ${kingdom.unlocked ? 'text-white' : 'text-gray-500'}`} />
                                                )}
                                                {!kingdom.unlocked && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* XP Badge */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <XPBadge xp={kingdom.xp} />
                                        </div>
                                    </div>

                                    <div className="mt-6 md:mt-8">
                                        <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 px-2 ${kingdom.unlocked ? 'text-white' : 'text-gray-500'}`}>{kingdom.name}</h3>
                                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{kingdom.tagline}</p>
                                    </div>

                                    {/* Mobile Connector */}
                                    {index < kingdoms.length - 1 && (
                                        <div className="lg:hidden h-8 w-1 bg-gradient-to-b from-white/20 to-white/5 my-4 rounded-full" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 text-center"
                    >
                        <p className="text-gray-400 italic glass-subtle inline-block px-8 py-4 rounded-2xl">"Each kingdom represents a major Python mastery zone. You don't just finish lessons — you conquer territory."</p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CERTIFICATION VALUE (REAL & DUAL)
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-28 bg-surface-elevated relative overflow-hidden">
                <div className="absolute inset-0 bg-surface-deep skew-y-3 transform origin-bottom-right opacity-50 pointer-events-none"></div>

                {/* Background Orbs */}
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest">🏆 Achievements</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Earn Verified Credentials.</h2>
                        <p className="text-xl text-gray-400">Prove your skill. Not your attendance.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 1. PROFESSIONAL PYTHON CERTIFICATION */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group card-hover"
                        >
                            {/* Inner Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500"></div>

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                Core Certification
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Professional Python Certification</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                                Awarded after conquering the first 6 Kingdoms. Proves you have mastered loops, functions, OOP, and algorithms through code-based battles.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                                    <IconVerify className="w-5 h-5 text-blue-500" /> Unique Credential ID
                                </div>
                                <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                                    <IconGlobal className="w-5 h-5 text-blue-500" /> Public Verification URL
                                </div>
                            </div>
                            <div className="pt-8 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-glow-cyan">
                                            <IconCastle className="w-7 h-7 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase font-bold">Requirement</div>
                                            <div className="text-white font-bold">Complete 6 Core Kingdoms</div>
                                        </div>
                                    </div>
                                    <ProgressRing progress={33} size={50} strokeWidth={4} color="#3B82F6" />
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. MACHINE LEARNING CERTIFICATION */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group card-hover"
                        >
                            {/* Inner Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500"></div>

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                Advanced Certification
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Machine Learning Specialist</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                                The elite tier. Awarded after surviving ML Village, ML City, and the ML Kingdom. Demonstrates ability to build real neural networks.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                                    <IconVerify className="w-5 h-5 text-purple-500" /> Unique Credential ID
                                </div>
                                <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                                    <IconGlobal className="w-5 h-5 text-purple-500" /> Public Verification URL
                                </div>
                            </div>
                            <div className="pt-8 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-purple-900/30 rounded-xl flex items-center justify-center border border-purple-500/20 shadow-glow-purple">
                                            <IconCrown className="w-7 h-7 text-purple-400" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase font-bold">Requirement</div>
                                            <div className="text-white font-bold">Conquer All 9 Kingdoms</div>
                                        </div>
                                    </div>
                                    <ProgressRing progress={0} size={50} strokeWidth={4} color="#8B5CF6" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                AI TUTOR (ALIVE)
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-28 bg-gradient-to-b from-surface-elevated to-surface-deep relative overflow-hidden">
                {/* Glowing Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-900/20 via-transparent to-transparent pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block p-5 rounded-full glass mb-8 pulse-glow"
                    >
                        <IconBot className="w-14 h-14 text-cyan-400 icon-float" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Your Personal AI Mentor.</h2>
                        <h3 className="text-xl md:text-2xl text-cyan-400 mb-8 font-medium">Never Stuck. Never Alone. Always Online.</h3>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                            Imagine a senior developer sitting next to you 24/7.
                            It doesn't just give you the answer—it explains the <i>why</i>.
                            It learns how you learn.
                        </p>
                    </motion.div>

                    {/* Chat Interface Mock */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-3xl p-6 md:p-8 text-left relative max-w-2xl mx-auto card-hover"
                    >
                        {/* Online Indicator */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            ONLINE
                        </div>

                        <div className="flex gap-4 mb-6">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center shrink-0 border border-cyan-500/30 text-white font-bold shadow-glow-cyan">AI</div>
                            <div className="glass-subtle text-gray-200 p-4 rounded-2xl rounded-tl-none text-sm md:text-base leading-relaxed">
                                <span className="text-cyan-400 font-bold block mb-1">Mentor</span>
                                I see you're struggling with the loop logic! 🧐 Remember, a <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">while</code> loop keeps running as long as the condition is True. Check your counter variable!
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div className="bg-emerald-900/20 text-emerald-100 p-4 rounded-2xl rounded-tr-none border border-emerald-500/20 text-sm md:text-base">
                                Oh! I forgot to increment <code className="bg-black/20 px-1.5 py-0.5 rounded font-mono text-sm">i</code>! Thanks!
                            </div>
                            <div className="w-11 h-11 rounded-full bg-gray-700 flex items-center justify-center shrink-0 font-bold border border-white/10">You</div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════════════════
                FOOTER CTA
                ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-36 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none"></div>
                <FloatingParticles />

                {/* Radial Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-emerald-900/30 via-transparent to-transparent pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">🚀 Launch Coming Soon</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black italic mb-8 uppercase tracking-tighter text-shimmer">
                            Don't Miss the Launch.
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 font-light max-w-xl mx-auto">
                            Be there before the kingdoms open. <br />
                            <span className="text-emerald-400 font-medium">Join {waitlistCount.toLocaleString()}+ others seeking mastery.</span>
                        </p>

                        <div className="flex flex-col items-center">
                            <Button
                                onClick={scrollToWaitlist}
                                size="lg"
                                className="btn-premium h-16 px-14 text-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black hover:from-emerald-400 hover:to-emerald-500 font-black uppercase tracking-widest shadow-glow-lg transition-all rounded-full"
                            >
                                Join the Waitlist
                            </Button>
                            <p className="mt-5 text-xs text-gray-600 font-mono text-center uppercase tracking-wider">No Spam. Early Access Only.</p>

                            {/* Trust Badges */}
                            <div className="mt-10 flex items-center gap-6 opacity-50">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    SSL Secured
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                    Privacy First
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
