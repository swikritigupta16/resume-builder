export const rewriteResumeAI = async (payload) => {
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const res = await fetch(`${API}/api/ai/rewrite`, {     //sending post request
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload) //converting js object to json string
  });

  if (!res.ok) {
    throw new Error("AI rewrite failed");
  }

  const data = await res.json();     //converting backend response to js object

  if (!data.preview) {
    throw new Error("Invalid AI response");
  }

  return data.preview;
};
