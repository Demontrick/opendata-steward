import { mockRecords } from "../mocks/records";

export async function fetchRecords() {
  // simulate API latency
  await new Promise((r) => setTimeout(r, 300));
  return mockRecords;
}