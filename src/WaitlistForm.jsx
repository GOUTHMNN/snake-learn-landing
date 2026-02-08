import React, { useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════
// ICONS - Isolated to prevent export issues
// ═══════════════════════════════════════════════════════════════════════════

const MailIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const CheckIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const LoaderIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

const StarIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const SparkleIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" />
    </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// CONFETTI PARTICLES
// ═══════════════════════════════════════════════════════════════════════════

const SuccessParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                initial={{
                    opacity: 1,
                    scale: 0,
                    x: '50%',
                    y: '50%'
                }}
                animate={{
                    opacity: 0,
                    scale: 1,
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`
                }}
                transition={{
                    duration: 1 + Math.random() * 0.5,
                    delay: i * 0.05,
                    ease: "easeOut"
                }}
                className="absolute w-2 h-2"
                style={{
                    background: ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B'][i % 4],
                    borderRadius: i % 2 === 0 ? '50%' : '2px',
                }}
            />
        ))}
    </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// XP REWARD BADGE
// ═══════════════════════════════════════════════════════════════════════════

const XPRewardBadge = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono"
    >
        <StarIcon className="w-3.5 h-3.5" />
        <span>+100 XP Reward</span>
    </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function WaitlistForm({ onJoin }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            // DATABASE LOGIC (Realtime Database - No Auth)
            if (!rtdb) {
                // FALLBACK / DEMO MODE
                await new Promise(resolve => setTimeout(resolve, 1000));
                setSuccess(true);
                toast.success("✅ Demo Mode: You're on the waitlist!");
                setEmail('');
                if (onJoin) onJoin();
                return;
            }

            const waitlistRef = ref(rtdb, 'waitlist');

            // Timeout Promise
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('REQUEST_TIMEOUT')), 10000)
            );

            // Race Condition: Write vs Timeout
            await Promise.race([
                push(waitlistRef, {
                    email: email.trim(),
                    createdAt: serverTimestamp(),
                    source: window.location.pathname === '/' ? 'landing' : 'ads'
                }),
                timeout
            ]);

            // Analytics
            if (window.gtag) window.gtag('event', 'generate_lead', { 'event_category': 'Waitlist' });
            if (window.fbq) window.fbq('track', 'Lead');

            // Success State
            setSuccess(true);
            toast.success("✅ You're on the waitlist! We'll notify you soon.");
            setEmail('');

            // Notify Parent to Update Count
            if (onJoin) onJoin();

        } catch (error) {
            console.error("Waitlist Error:", error);
            if (error.code === 'PERMISSION_DENIED') {
                toast.error("Permission Denied: Check Firebase Rules.");
            } else {
                toast.error(`Error: ${error.message} (${error.code || 'UNKNOWN'})`);
            }
        } finally {
            setLoading(false);
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // SUCCESS STATE
    // ═══════════════════════════════════════════════════════════════════════

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center justify-center p-8 glass rounded-2xl overflow-hidden"
            >
                <SuccessParticles />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-glow-md"
                >
                    <CheckIcon className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold text-white mb-2"
                >
                    You're on the waitlist!
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-emerald-200/80 text-sm text-center mb-4"
                >
                    We'll notify you soon.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30"
                >
                    <SparkleIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 text-sm font-bold font-mono">+100 XP EARNED!</span>
                    <SparkleIcon className="w-4 h-4 text-amber-400" />
                </motion.div>
            </motion.div>
        );
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FORM STATE
    // ═══════════════════════════════════════════════════════════════════════

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative group">
            {/* Animated Gradient Border */}
            <div className={`absolute -inset-[2px] rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm ${loading ? 'animate-pulse opacity-100' : ''}`}></div>
            <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 opacity-30 group-hover:opacity-50 group-focus-within:opacity-60 transition-opacity duration-300 ${loading ? 'animate-gradient-x opacity-60' : ''}`} style={{ backgroundSize: '200% 100%' }}></div>

            {/* Form Container */}
            <div className="relative flex items-center glass rounded-xl p-2 shadow-depth">
                <div className="pl-4 text-gray-400 group-focus-within:text-emerald-400 transition-colors">
                    <MailIcon className="w-5 h-5" />
                </div>
                <input
                    type="email"
                    placeholder="Enter your email for early access..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none px-4 py-3 font-light text-sm md:text-base"
                    required
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="btn-premium bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold rounded-lg px-6 py-2.5 text-sm shadow-glow-sm hover:shadow-glow-md whitespace-nowrap"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <LoaderIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Joining...</span>
                        </span>
                    ) : (
                        'Join Waitlist'
                    )}
                </Button>
            </div>

            {/* XP Reward Indicator */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <XPRewardBadge />
                <p className="text-xs text-gray-500 font-light">
                    <span className="text-emerald-500 font-medium">Limited spots</span> available for beta access.
                </p>
            </div>
        </form>
    );
}
