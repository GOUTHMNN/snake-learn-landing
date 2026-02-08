import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * LiquidButton - Premium button with liquid ripple hover effect
 * Use for primary CTAs and important actions
 */
const liquidButtonVariants = cva(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-deep disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-glow-lg focus-visible:ring-brand-primary",
                emerald: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-glow-lg focus-visible:ring-emerald-500",
                purple: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-glow-purple focus-visible:ring-purple-500",
                gold: "bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:shadow-glow-gold focus-visible:ring-amber-500",
                ghost: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40 focus-visible:ring-white/50",
            },
            size: {
                default: "h-12 px-6 py-3 text-base",
                sm: "h-10 px-4 py-2 text-sm",
                lg: "h-14 px-8 py-4 text-lg",
                xl: "h-16 px-10 py-5 text-xl",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const LiquidButton = React.forwardRef(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                className={cn(liquidButtonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {/* Liquid ripple effect layer */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                    <span
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white/20 rounded-full group-hover:w-[200%] group-hover:h-[200%] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100"
                        aria-hidden="true"
                    />
                </span>

                {/* Shimmer effect */}
                <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    aria-hidden="true"
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>

                {/* Pulse glow on hover */}
                <span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse-glow transition-opacity duration-300 pointer-events-none"
                    style={{
                        boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
                    }}
                    aria-hidden="true"
                />
            </Comp>
        )
    }
)

LiquidButton.displayName = "LiquidButton"

export { LiquidButton, liquidButtonVariants }
