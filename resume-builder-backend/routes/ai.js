import express from "express";
const router = express.Router();

router.post("/rewrite", (req, res) => {
  const { summary, experience, projects, customSections } = req.body;

  const rewritten = {
    summary: summary?.trim()
      ? "Motivated and detail-oriented professional seeking an entry-level opportunity to apply technical skills, contribute to organizational growth, and continuously enhance expertise."
      : summary || "",

    experience: Array.isArray(experience)
      ? experience.map(exp => {
          if (!exp.description?.trim()) {
            return exp; // ✅ NO rewrite
          }

          return {
            ...exp,
            description:
              "Collaborated with team members to develop software solutions using modern technologies while following best coding practices."
          };
        })
      : [],

    projects: Array.isArray(projects)
      ? projects.map(proj => {
          if (!proj.description?.trim()) {
            return proj; // ✅ NO rewrite
          }

          return {
            ...proj,
            description:
              "Designed and built this project with a focus on scalability, performance, and user experience using industry best practices."
          };
        })
      : [],

    customSections: Array.isArray(customSections)
      ? customSections.map(sec => {
          if (!sec.content?.trim()) {
            return sec; // ✅ NO rewrite
          }

          return {
            ...sec,
            content:
              "Demonstrated strong communication, time management, and problem-solving skills in a collaborative environment."
          };
        })
      : []
  };

  res.json({ preview: rewritten });
});

export default router;
