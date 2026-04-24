import { useState } from "react";
import { useRecords } from "./hooks/useRecords";
import { RecordCard } from "./components/RecordCard";
import { Toast } from "./components/Toast";

function App() {
  const [status, setStatus] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { records, isLoading, approve, reject, review } =
    useRecords(status || undefined);

  const handleAction = async (
    id: string,
    action: (id: string) => Promise<any>
  ) => {
    setLoadingId(id);

    try {
      await action(id);
      setToast("Action successful");
    } catch (e) {
      setToast("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>OpenData Steward</h1>

      {/* FILTER */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginBottom: "16px", padding: "8px" }}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="needs_review">Needs Review</option>
      </select>

      {/* CONTENT */}
      {isLoading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {records.map((record: any) => (
            <RecordCard
              key={record.id}
              record={record}
              loading={loadingId === record.id}
              onApprove={() => handleAction(record.id, approve)}
              onReject={() => handleAction(record.id, reject)}
              onReview={() => handleAction(record.id, review)}
            />
          ))}
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default App;