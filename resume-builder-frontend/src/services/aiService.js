export const rewriteResumeAI = async (payload) => {
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const res = await fetch(`${API}/api/ai/rewrite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("AI rewrite failed");
  }

  const data = await res.json();

  if (!data.preview) {
    throw new Error("Invalid AI response");
  }

  return data.preview;
};
