export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="novaxN" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>

      {/* N monogram */}
      <rect x="10" y="10" width="80" height="80" rx="10" fill="white" />
      <path
        d="M28 74V26h10l24 32V26h10v48H62L38 42v32H28z"
        fill="url(#novaxN)"
      />
    </svg>
  );
}
