import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplineScene } from "@/components/ui/splite";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { db, rtdb } from '@/lib/firebase';
import { ref, set, onValue } from "firebase/database";
import { toast } from "sonner";
import ServiceErrorBoundary from '@/components/ServiceErrorBoundary';

export default function HeroLuxury({ waitlistCount = 6445, onJoin }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState(''); // Store exact error message

    const handleJoin = async (e) => {
        e.preventDefault();
        if (!email || status === 'loading' || status === 'success') return;

        // CHECK IF FIREBASE IS INITIALIZED
        if (!rtdb) {
            console.warn("Firebase RTDB is not initialized. Using fallback/demo mode.");
            setStatus('loading');
            setTimeout(() => {
                setStatus('success');
                toast.success("Demo Mode: You're on the list! (Firebase disconnected)");
                if (onJoin) onJoin();
            }, 1000);
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        let isRequestComplete = false;

        // Force timeout error if taking too long (4 seconds)
        const timeoutId = setTimeout(() => {
            if (!isRequestComplete) {
                console.error("DEBUG: Request timed out.");
                setStatus('error');
                setErrorMessage("Network timeout. The request took too long.");
                toast.error("Network timeout. Please check your connection.");
            }
        }, 4000);

        try {
            // 1. Validate Email (simple check)
            if (!email.includes('@')) {
                throw new Error("Invalid email format.");
            }

            // 2. Sanitize email for RTDB key (cannot contain '.', '$', '[', ']', '#', '/')
            const sanitizedEmail = email.replace(/\./g, ',');
            const timestamp = new Date().toISOString();

            // ATTEMPT WRITE (Realtime Database)
            console.log("DEBUG: Attempting to write to RTDB...", sanitizedEmail);

            // Using 'set' on 'waitlist/{email}' effectively deduplicates by overwriting
            await set(ref(rtdb, 'waitlist/' + sanitizedEmail), {
                email: email,
                timestamp: timestamp,
                source: "landing_hero"
            });

            console.log("DEBUG: RTDB write successful.");

            // SUCCESS
            isRequestComplete = true; // Mark as complete so timeout doesn't fire
            clearTimeout(timeoutId);

            if (onJoin) onJoin();
            setStatus('success');
            setErrorMessage('');
            toast.success("Welcome to the future.");

        } catch (error) {
            isRequestComplete = true; // Mark as complete
            clearTimeout(timeoutId);
            console.error("Waitlist Error Full Object:", error);

            let displayMsg = "Unexpected error.";

            if (error.code === 'PERMISSION_DENIED') {
                displayMsg = "Permission denied: Database rules blocked this write.";
            } else if (error.code === 'NETWORK_ERROR') {
                displayMsg = "Network error: unable to reach Firebase.";
            } else if (error.message && error.message.includes("Invalid email")) {
                displayMsg = error.message;
            } else {
                displayMsg = `Error: ${error.message || "Unknown failure"} `;
            }

            setErrorMessage(displayMsg);
            setStatus('error');
            toast.error(displayMsg);
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-[#020205] overflow-hidden flex items-center selection:bg-emerald-500/20">

            {/* ═══════════════════════════════════════════════════════════════════
                 AMBIENT LIGHTING (CINEMATIC)
                ═══════════════════════════════════════════════════════════════════ */}

            {/* Top Center Spotlight - Subtle */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Bottom Right Glow - Anchoring the Robot */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-900/5 blur-[100px] rounded-full pointer-events-none" />


            <div className="container relative z-20 mx-auto px-6 h-full flex flex-col justify-center min-h-screen pt-20 lg:pt-0">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center h-full">

                    {/* ═══════════════════════════════════════════════════════════════════
                        LEFT COLUMN: AUTHORITY (5 COLUMNS)
                        ═══════════════════════════════════════════════════════════════════ */}
                    <div className="lg:col-span-6 flex flex-col justify-center relative z-30">

                        {/* HEADLINE */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-8"
                        >
                            Learn Python <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                                like playing
                            </span> <br />
                            <span className="text-emerald-500 relative inline-block">
                                a game.
                                {/* Subtle decorative underline */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                        </motion.h1>

                        {/* SUBTEXT */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="text-lg text-zinc-400 max-w-md font-light leading-relaxed mb-8 tracking-wide border-l border-zinc-800 pl-6"
                        >
                            The world's most advanced gamified coding environment.
                            Built for those who demand mastery, not just tutorials.
                        </motion.p>

                        {/* INCENTIVE - Clean & Premium */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="mb-6 flex items-center gap-2 text-sm font-medium text-emerald-400/90"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                            First 10,000 users get a free 1-month membership.
                        </motion.div>

                        {/* WAITLIST INPUT - Minimal */}
                        <motion.form
                            id="hero-waitlist-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            onSubmit={handleJoin}
                            className="relative max-w-md mb-10"
                        >
                            <div className="relative group">
                                <label htmlFor="email-input" className="sr-only">Email address</label>
                                <input
                                    id="email-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('idle'); // Clear error on type
                                    }}
                                    placeholder="Enter your email"
                                    disabled={status === 'loading' || status === 'success'}
                                    className={cn(
                                        "w-full bg-transparent border-b py-4 text-xl text-white placeholder-zinc-600 focus:outline-none transition-colors disabled:cursor-not-allowed disabled:text-zinc-500",
                                        status === 'error' ? "border-red-500 text-red-500" : "border-zinc-700 focus:border-emerald-500"
                                    )}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success' || !email}
                                    aria-label="Join Waitlist"
                                    className={cn(
                                        "absolute right-0 top-1/2 -translate-y-1/2 transition-colors disabled:opacity-50",
                                        status === 'error' ? "text-red-500 hover:text-red-400" : "text-zinc-400 hover:text-emerald-400 disabled:hover:text-zinc-400"
                                    )}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : status === 'success' ? (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <Check className="w-6 h-6 text-emerald-500" />
                                        </motion.div>
                                    ) : status === 'error' ? (
                                        <AlertCircle className="w-6 h-6" />
                                    ) : (
                                        <ArrowRight className="w-6 h-6" />
                                    )}
                                </button>
                                <div className={cn(
                                    "absolute bottom-0 left-0 w-0 h-[1px] group-focus-within:w-full transition-all duration-500 ease-out",
                                    status === 'error' ? "bg-red-500" : "bg-emerald-500"
                                )}></div>
                            </div>

                            {/* DEBUG ERROR MESSAGE - Visible to Founder */}
                            {(errorMessage || status === 'error') && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-24 left-0 text-xs font-mono text-red-400 bg-red-900/20 px-3 py-2 border border-red-500/30 rounded w-full break-words"
                                >
                                    <p><span className="font-bold">DEBUG:</span> {errorMessage}</p>
                                    <p className="mt-1 text-zinc-500">
                                        Project: {import.meta.env.VITE_FIREBASE_PROJECT_ID ? import.meta.env.VITE_FIREBASE_PROJECT_ID : "UNDEFINED (Restart Server)"}
                                    </p>
                                </motion.div>
                            )}
                        </motion.form>

                        {/* SOCIAL PROOF (Real Humans) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.6 }}
                            className="flex items-center gap-4"
                        >
                            <div className="flex -space-x-4">
                                {/* Using placeholder portraits for "Real Human Presence" */}
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="Start" className="w-10 h-10 rounded-full border-2 border-[#020205] object-cover" />
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces" alt="Start" className="w-10 h-10 rounded-full border-2 border-[#020205] object-cover" />
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces" alt="Start" className="w-10 h-10 rounded-full border-2 border-[#020205] object-cover" />
                                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces" alt="Start" className="w-10 h-10 rounded-full border-2 border-[#020205] object-cover" />
                            </div>
                            <div className="text-sm font-medium text-zinc-400">
                                <span className="text-white font-bold tabular-nums">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={waitlistCount}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {waitlistCount.toLocaleString()}
                                        </motion.span>
                                    </AnimatePresence>+
                                </span> learners already on the waitlist
                            </div>
                        </motion.div>

                    </div>


                    {/* ═══════════════════════════════════════════════════════════════════
                        RIGHT COLUMN: THE ENTITY (7 COLUMNS)
                        ═══════════════════════════════════════════════════════════════════ */}
                    <div className="lg:col-span-6 relative h-[60vh] lg:h-[120vh] w-full flex items-center justify-center lg:translate-x-10 lg:-translate-y-10 pointer-events-none lg:pointer-events-auto">

                        {/* Branding Overlay - "Integrated" */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 1, duration: 2 }}
                            className="absolute z-20 top-1/4 right-0 lg:-right-12 font-bold text-[10px] sm:text-xs tracking-[0.5em] text-white/50 -rotate-90 select-none pointer-events-none mix-blend-overlay"
                        >
                            SnakeLearn
                        </motion.div>

                        {/* The Spline Scene - Full Bleed on Right */}
                        <div className="absolute inset-0 w-full h-full lg:scale-110">
                            <ServiceErrorBoundary fallback={
                                <div className="w-full h-full flex items-center justify-center bg-black/20">
                                    <div className="text-zinc-600 animate-pulse">3D Scene Loading...</div>
                                </div>
                            }>
                                <SplineScene
                                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                    className="w-full h-full"
                                />
                            </ServiceErrorBoundary>
                        </div>

                        {/* Integration Gradients - CRITICAL for "Not Boxed" look */}

                        {/* Left edge fade to blend with text */}
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#020205] to-transparent pointer-events-none" />

                        {/* Bottom fade */}
                        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#020205] to-transparent pointer-events-none" />

                        {/* Radial vignette to focus center */}
                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#020205]/50 pointer-events-none" />

                    </div>

                </div>
            </div>

            {/* Scroll Indicator - Absolute Bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-mono">Initiate</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-600 to-transparent"></div>
            </motion.div>

        </section>
    );
}
