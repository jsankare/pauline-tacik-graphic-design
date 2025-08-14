"use client";

const DebugInfo = ({ data, title }) => {
    if (process.env.NODE_ENV !== 'development') {
        return null; // Only show in development
    }

    return (
        <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
            <h3 className="font-bold mb-2">{title}</h3>
            <pre className="whitespace-pre-wrap overflow-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default DebugInfo;
