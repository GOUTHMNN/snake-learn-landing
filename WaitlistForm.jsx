import React, { useState } from 'react';
import { rtdb } from '@/lib/firebase'; // Ensure RTDB is exported from firebase.js
import { ref, push, serverTimestamp } from 'firebase/database';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Redefining icons to avoid export issues and keep this component isolated
const MailIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const CheckIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const LoaderIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

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
            toast.success("✅ You’re on the waitlist! We’ll notify you soon.");
            setEmail('');

            // Notify Parent to Update Count
            if (onJoin) onJoin();

        } catch (error) {
            console.error("Waitlist Error:", error);
            // Even on error, we stop loading
            if (error.code === 'PERMISSION_DENIED') {
                toast.error("Permission Denied: Check Firebase Rules.");
            } else {
                toast.error(`Error: ${error.message} (${error.code || 'UNKNOWN'})`);
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl animate-in fade-in zoom-in duration-500">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">You’re on the waitlist!</h3>
                <p className="text-emerald-200/80 text-sm text-center">We’ll notify you soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${loading ? 'animate-pulse' : ''}`}></div>
            <div className="relative flex items-center bg-[#0d0d25] rounded-xl border border-white/10 p-2 shadow-2xl">
                <div className="pl-4 text-gray-400">
                    <MailIcon className="w-5 h-5" />
                </div>
                <input
                    type="email"
                    placeholder="Enter your email for early access..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none px-4 py-2 font-light"
                    required
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg px-6 py-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] whitespace-nowrap"
                >
                    {loading ? <LoaderIcon className="w-5 h-5" /> : 'Join Waitlist'}
                </Button>
            </div>
            <p className="mt-3 text-xs text-center text-gray-500 font-light">
                <span className="text-emerald-500">limited spots available</span> for beta access.
            </p>
        </form>
    );
}
