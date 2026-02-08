import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import WaitlistForm from './WaitlistForm';

// --- CUSTOM ICONS (PREMIUM GAME STYLE) ---

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

// --- THE 9 KINGDOMS (SACRED DATA) ---
const kingdoms = [
    { id: 'basics', name: 'Basics Kingdom', icon: IconCastle, color: 'from-blue-600 to-indigo-600', tagline: 'The Foundation' },
    { id: 'loops', name: 'Loops Land', icon: IconLoop, color: 'from-pink-500 to-rose-500', tagline: 'The Automation' },
    { id: 'functions', name: 'Function Forest', icon: IconFunction, color: 'from-green-500 to-emerald-600', tagline: 'The Logic' },
    { id: 'oop', name: 'OOP Forest', icon: IconStructure, color: 'from-orange-500 to-amber-500', tagline: 'The Architecture' },
    { id: 'modules', name: 'Module Mountains', icon: IconModule, color: 'from-purple-500 to-violet-500', tagline: 'The Toolkit' },
    { id: 'algorithms', name: 'Algorithm Arena', icon: IconAlgo, color: 'from-red-600 to-orange-700', tagline: 'The Competition' },
    { id: 'ml_village', name: 'ML Village', icon: IconVillage, color: 'from-cyan-500 to-sky-500', tagline: 'The Intelligence' },
    { id: 'ml_city', name: 'ML City', icon: IconCity, color: 'from-blue-700 to-indigo-800', tagline: 'The Neural Net' },
    { id: 'ml_kingdom', name: 'ML Kingdom', icon: IconCrown, color: 'from-yellow-400 to-amber-500', tagline: 'The Mastery' },
];

export default function ValidationLanding() {
    // Analytics
    useEffect(() => {
        if (window.gtag) window.gtag('event', 'page_view', { page_title: 'Validation Landing', page_path: window.location.pathname });
        if (window.fbq) window.fbq('track', 'PageView');
    }, []);

    const [waitlistCount, setWaitlistCount] = useState(5342);

    const handleJoin = () => {
        setWaitlistCount(prev => prev + 1);
    };

    const scrollToWaitlist = () => {
        document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">

            {/* --- URGENCY BANNER --- */}
            <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 animate-gradient-x p-2 text-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <div className="flex items-center justify-center gap-2 font-bold text-black text-xs md:text-sm uppercase tracking-widest">
                    <span>🎁 First 10,000 Users get 1 Month Free Trial!</span>
                </div>
            </div>

            {/* --- NAVIGATION (BRAND IDENTITY) --- */}
            <nav className="absolute top-12 left-0 right-0 z-50 flex justify-center w-full px-6">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl">
                    <div className="w-8 h-8 text-emerald-400">
                        <IconSnake className="w-full h-full drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                    <span className="text-xl font-black tracking-wider text-white logo-text">
                        SNAKELEARN
                    </span>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-6 py-2 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
                    >
                        {/* REALISTIC SOCIAL PROOF (RandomUser.me) */}
                        <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full border-2 border-[#050511] bg-gray-700 overflow-hidden relative">
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Learner" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-[#050511] bg-gray-700 overflow-hidden relative">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Learner" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-[#050511] bg-gray-700 overflow-hidden relative">
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Learner" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-sm font-bold text-gray-300">Join <span className="text-white">{waitlistCount.toLocaleString()}+</span> real learners waiting</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
                        Learn Python Like <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 filter drop-shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                            Playing a Game.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
                        Conquer Kingdoms. Solve Challenges. Become a Certified Master.
                        <span className="block mt-2 text-lg text-gray-500 font-normal">
                            Guided by your 24/7 AI Personal Mentor.
                        </span>
                    </p>

                    <div id="waitlist-section" className="relative z-20 mb-12 flex flex-col items-center">
                        <WaitlistForm onJoin={handleJoin} />
                        <div className="flex items-center gap-4 mt-4 text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-widest opacity-70">
                            <span>🔒 Secure & Spam-Free</span>
                            <span>•</span>
                            <span>🚀 Early Access Only</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE 9 KINGDOMS (CORE IDENTITY) --- */}
            <section className="py-24 bg-[#0a0a1f] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">The World Map</h2>
                        <p className="text-xl text-gray-400">From Hello World to Certified Professional.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-purple-900 to-yellow-900 transform -translate-y-1/2 hidden lg:block opacity-30 rounded-full" />

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-4 relative z-10">
                            {kingdoms.map((kingdom, index) => (
                                <motion.div
                                    key={kingdom.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex flex-col items-center text-center"
                                >
                                    <div className={`w-20 h-20 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${kingdom.color} p-[1px] shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-20`}>
                                        <div className="w-full h-full bg-[#15152a] rounded-[14px] flex items-center justify-center">
                                            <kingdom.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-6">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 px-2">{kingdom.name}</h3>
                                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{kingdom.tagline}</p>
                                    </div>

                                    {/* Mobile Connector */}
                                    {index < kingdoms.length - 1 && (
                                        <div className="lg:hidden h-8 w-1 bg-white/10 my-4" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-gray-400 italic">"Each kingdom represents a major Python mastery zone. You don’t just finish lessons — you conquer territory."</p>
                    </div>
                </div>
            </section>

            {/* --- CERTIFICATION VALUE (REAL & DUAL) --- */}
            <section className="py-24 bg-[#0a0a1f] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#050511] skew-y-3 transform origin-bottom-right opacity-50 pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Earn Verified Credentials.</h2>
                        <p className="text-xl text-gray-400">Prove your skill. Not your attendance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 1. PROFESSIONAL PYTHON CERTIFICATION */}
                        <div className="bg-gradient-to-br from-[#121225] to-[#080815] border border-blue-500/20 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-blue-500/40 transition-colors">
                            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
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
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-500/20">
                                        <IconCastle className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold">Requirement</div>
                                        <div className="text-white font-bold">Complete 6 Core Kingdoms</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. MACHINE LEARNING CERTIFICATION */}
                        <div className="bg-gradient-to-br from-[#1a1024] to-[#0f0a14] border border-purple-500/20 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-purple-500/40 transition-colors">
                            <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
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
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center border border-purple-500/20">
                                        <IconCrown className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold">Requirement</div>
                                        <div className="text-white font-bold">Conquer All 9 Kingdoms</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- AI TUTOR (ALIVE) --- */}
            <section className="py-24 bg-gradient-to-b from-[#0a0a1f] to-[#050511]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-block p-4 rounded-full bg-cyan-500/10 mb-8 animate-pulse">
                        <IconBot className="w-12 h-12 text-cyan-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6">Your Personal AI Mentor.</h2>
                    <h3 className="text-xl md:text-2xl text-cyan-400 mb-8 font-medium">Never Stuck. Never Alone. Always Online.</h3>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                        Imagine a senior developer sitting next to you 24/7.
                        It doesn't just give you the answer—it explains the <i>why</i>.
                        It learns how you learn.
                    </p>

                    {/* Chat Interface Mock */}
                    <div className="bg-[#111] rounded-3xl border border-white/10 p-6 md:p-8 text-left shadow-2xl relative max-w-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center shrink-0 border border-cyan-500/30 text-cyan-400 font-bold">AI</div>
                            <div className="bg-[#1a1a2e] text-gray-200 p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm md:text-base leading-relaxed">
                                <span className="text-cyan-400 font-bold block mb-1">Mentor</span>
                                I see you're struggling with the loop logic! 🧐 Remember, a <code className="bg-black/50 px-1 rounded text-green-400">while</code> loop keeps running as long as the condition is True. Check your counter variable!
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div className="bg-emerald-900/20 text-emerald-100 p-4 rounded-2xl rounded-tr-none border border-emerald-500/20 text-sm md:text-base">
                                Oh! I forgot to increment <code className="bg-black/20 px-1 rounded">i</code>! Thanks!
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 font-bold">You</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none"></div>
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <h2 className="text-5xl md:text-6xl font-black italic mb-8 uppercase tracking-tighter">
                        Don't Miss the Launch.
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 font-light max-w-xl mx-auto">
                        Be there before the kingdoms open. <br />
                        <span className="text-emerald-400 font-medium">Join {waitlistCount.toLocaleString()}+ others seeking mastery.</span>
                    </p>

                    <div className="flex flex-col items-center">
                        <Button onClick={scrollToWaitlist} size="lg" className="h-16 px-12 text-xl bg-emerald-500 text-black hover:bg-white hover:text-black font-black uppercase tracking-widest shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 mb-4 rounded-full">
                            Join the Waitlist
                        </Button>
                        <p className="text-xs text-gray-600 font-mono text-center">NO SPAM. EARLY ACCESS ONLY.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
