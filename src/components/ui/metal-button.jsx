import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * MetalButton - Premium button with metallic sheen effect
 * Use for secondary actions and premium UI elements
 */
const metalButtonVariants = cva(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-deep disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                chrome: "bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 text-zinc-900 border border-zinc-400/50 hover:shadow-lg focus-visible:ring-zinc-400",
                gold: "bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-500 text-amber-900 border border-amber-400/50 hover:shadow-glow-gold focus-visible:ring-amber-400",
                copper: "bg-gradient-to-b from-orange-300 via-orange-200 to-orange-500 text-orange-900 border border-orange-400/50 hover:shadow-lg focus-visible:ring-orange-400",
                steel: "bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 text-slate-900 border border-slate-400/50 hover:shadow-lg focus-visible:ring-slate-400",
                dark: "bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 text-zinc-100 border border-zinc-600/50 hover:shadow-lg focus-visible:ring-zinc-600",
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
            variant: "chrome",
            size: "default",
        },
    }
)

const MetalButton = React.forwardRef(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                className={cn(metalButtonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {/* Metallic sheen overlay */}
                <span
                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        transform: 'translateX(-100%) rotate(15deg)',
                        animation: 'none'
                    }}
                    aria-hidden="true"
                />

                {/* Moving shine effect on hover */}
                <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                        transform: 'skewX(-15deg)'
                    }}
                    aria-hidden="true"
                />

                {/* Top highlight */}
                <span
                    className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    aria-hidden="true"
                />

                {/* Bottom shadow line */}
                <span
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent"
                    aria-hidden="true"
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                    {children}
                </span>

                {/* Embossed effect on press */}
                <span
                    className="absolute inset-0 rounded-xl opacity-0 active:opacity-100 transition-opacity duration-100"
                    style={{
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                    }}
                    aria-hidden="true"
                />
            </Comp>
        )
    }
)

MetalButton.displayName = "MetalButton"

export { MetalButton, metalButtonVariants }
