const BASE_URL = "http://127.0.0.1:8000";

export async function fetchRecords(status?: string) {
  const url = status
    ? `${BASE_URL}/api/records?status=${status}`
    : `${BASE_URL}/api/records`;

  const res = await fetch(url);
  return res.json();
}

export async function approveRecord(id: string) {
  await fetch(`${BASE_URL}/api/records/${id}/approve`, {
    method: "POST",
  });
}

export async function rejectRecord(id: string) {
  await fetch(`${BASE_URL}/api/records/${id}/reject`, {
    method: "POST",
  });
}

export async function reviewRecord(id: string) {
  await fetch(`${BASE_URL}/api/records/${id}/review`, {
    method: "POST",
  });
}