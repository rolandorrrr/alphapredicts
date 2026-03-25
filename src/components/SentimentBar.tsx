interface SentimentBarProps {
  label: string;
  value: number;
  sentiment: "bullish" | "neutral" | "bearish";
  valueLabel?: string;
}

const sentimentColors = {
  bullish: { bar: "bg-secondary", glow: "glow-secondary", text: "text-secondary" },
  neutral: { bar: "bg-tertiary", glow: "", text: "text-tertiary" },
  bearish: { bar: "bg-error", glow: "glow-error", text: "text-error" },
};

export default function SentimentBar({ label, value, sentiment, valueLabel }: SentimentBarProps) {
  const colors = sentimentColors[sentiment];
  const displayLabel = valueLabel || `${value}% ${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}`;

  return (
    <div>
      <div className="flex justify-between text-[10px] uppercase tracking-wider mb-2">
        <span className="text-on-surface">{label}</span>
        <span className={colors.text}>{displayLabel}</span>
      </div>
      <div className="h-1 w-full bg-surface-container-highest overflow-hidden" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${label}: ${displayLabel}`}>
        <div className={`h-full ${colors.bar} ${colors.glow}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
