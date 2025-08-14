export default function ChevronIcon({ width = "16", height = "16", className = "" }) {
  return (
    <svg 
      className={className} 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M7 10l5 5 5-5z" />
    </svg>
  );
} 