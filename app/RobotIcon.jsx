export default function RobotIcon({ className }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--metal-green)"
      strokeWidth="1.5"
      className={className}
    >
      <rect x="5" y="10" width="14" height="10" rx="2" ry="2" />
      <path d="M12 10V6" />
      <circle cx="12" cy="4" r="2" className="robot-antenna-glow" />
      <circle
        cx="9"
        cy="14"
        r="1.5"
        fill="var(--neon-green)"
        stroke="none"
        className="robot-eye"
      />
      <circle
        cx="15"
        cy="14"
        r="1.5"
        fill="var(--neon-green)"
        stroke="none"
        className="robot-eye"
      />
      <path d="M10 18h4" />
      <path d="M2 14h3" />
      <path d="M19 14h3" />
    </svg>
  );
}
