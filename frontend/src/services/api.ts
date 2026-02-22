const API_BASE = "http://127.0.0.1:8000/api";

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}
