import React from 'react';
import { AlertCircle } from 'lucide-react';

class ServiceErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ServiceErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <div className="flex items-center gap-2 p-4 text-sm text-red-400 bg-red-900/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    <span>Component unavailable</span>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ServiceErrorBoundary;
