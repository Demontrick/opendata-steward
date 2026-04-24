interface Props {
  score: number;
}

function getQualityLabel(score: number) {
  if (score <= 40) return "LOW";
  if (score <= 70) return "MEDIUM";
  return "HIGH";
}

function getQualityColor(score: number) {
  if (score <= 40) return "#e74c3c"; // red
  if (score <= 70) return "#f39c12"; // amber
  return "#2ecc71"; // green
}

export function QualityBadge({ score }: Props) {
  const color = getQualityColor(score);
  const label = getQualityLabel(score);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "999px",
        backgroundColor: color,
        color: "white",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {label} • {score}
    </div>
  );
}