import type { StewardRecord } from "../types/record";
import { QualityBadge } from "./QualityBadge";

interface Props {
  record: StewardRecord;
  onApprove: () => void;
  onReject: () => void;
  onReview: () => void;

  // 👇 NEW: loading state
  loading?: boolean;
}

export function RecordCard({
  record,
  onApprove,
  onReject,
  onReview,
  loading = false,
}: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {/* LEFT */}
      <div>
        <h3 style={{ margin: 0 }}>{record.company_name}</h3>

        <p style={{ margin: "4px 0" }}>
          {record.country} • {record.specialty}
        </p>

        <small>{record.flag_reason}</small>
      </div>

      {/* RIGHT */}
      <div style={{ textAlign: "right" }}>
        <QualityBadge score={record.data_quality_score} />

        <p style={{ margin: "6px 0", fontSize: "12px" }}>
          {record.status}
        </p>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={onApprove} disabled={loading}>
            {loading ? "..." : "✔"}
          </button>

          <button onClick={onReject} disabled={loading}>
            {loading ? "..." : "✖"}
          </button>

          <button onClick={onReview} disabled={loading}>
            {loading ? "..." : "⚠"}
          </button>
        </div>
      </div>
    </div>
  );
}