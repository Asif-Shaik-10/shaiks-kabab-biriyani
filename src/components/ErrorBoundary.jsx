import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
                    <div className="bg-gray-800 p-4 rounded-lg text-left w-full max-w-lg overflow-auto">
                        <p className="text-yellow-400 font-mono text-sm mb-2">
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <pre className="text-gray-400 text-xs font-mono whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Reload App
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
