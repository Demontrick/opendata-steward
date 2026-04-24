export type RecordStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "needs_review";

export interface StewardRecord {
  id: string;
  company_name: string;
  country: string;
  specialty: string;
  data_quality_score: number; // 0–100
  flag_reason: string;
  status: RecordStatus;
  duplicate_of: string | null;
  last_updated: string;
}