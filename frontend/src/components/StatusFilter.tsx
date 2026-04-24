import type { StewardRecord } from "../types/record";

interface Props {
  value: StewardRecord["status"] | "all";
  onChange: (value: StewardRecord["status"] | "all") => void;
}

export function StatusFilter({ value, onChange }: Props) {
  return (
    <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
      {["all", "pending", "approved", "rejected", "needs_review"].map(
        (status) => (
          <button
            key={status}
            onClick={() => onChange(status as any)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: value === status ? "#222" : "#fff",
              color: value === status ? "#fff" : "#000",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {status}
          </button>
        )
      )}
    </div>
  );
}