import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecords } from "../api/client";
import type { StewardRecord } from "../types/record";
import { RecordCard } from "./RecordCard";
import { StatusFilter } from "./StatusFilter";

export function RecordQueue() {
  const { data = [] } = useQuery({
    queryKey: ["records"],
    queryFn: fetchRecords,
  });

  const [records, setRecords] = useState<StewardRecord[]>(data);
  const [filter, setFilter] =
    useState<StewardRecord["status"] | "all">("all");

  // sync query → state once loaded
  useMemo(() => {
    setRecords(data);
  }, [data]);

  function updateStatus(id: string, status: StewardRecord["status"]) {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status, last_updated: new Date().toISOString() }
          : r
      )
    );
  }

  const filtered = useMemo(() => {
    let d = [...records];

    if (filter !== "all") {
      d = d.filter((r) => r.status === filter);
    }

    return d.sort((a, b) => a.data_quality_score - b.data_quality_score);
  }, [records, filter]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Steward Queue</h2>

      <StatusFilter value={filter} onChange={setFilter} />

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            onApprove={() => updateStatus(record.id, "approved")}
            onReject={() => updateStatus(record.id, "rejected")}
            onReview={() => updateStatus(record.id, "needs_review")}
          />
        ))}
      </div>
    </div>
  );
}