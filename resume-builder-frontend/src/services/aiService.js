export const rewriteResumeAI = async (payload) => {
  const API = process.env.REACT_APP_API_URL;

  const res = await fetch(`${API}/api/ai/rewrite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("AI rewrite failed");
  }

  return res.json();
};

  console.log(process.env.REACT_APP_API_URL);


 //this function is a frontend api helper used to call rewrite resume ai backend