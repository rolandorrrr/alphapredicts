interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div className={`glass-panel p-6 border border-outline-variant/20 rounded-sm ${className}`}>
      {children}
    </div>
  );
}
