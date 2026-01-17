import express from "express";
const router = express.Router();

router.post("/rewrite", (req, res) => {
  const {
    summary,
    experience,
    projects,
    customSections
  } = req.body;

  const rewritten = {
    summary: summary
      ? "Motivated and detail-oriented professional seeking an entry-level opportunity to apply technical skills, contribute to organizational growth, and continuously enhance expertise."
      : "",

    experience: experience?.map(exp => ({
      ...exp,
      description:
        "Collaborated with team members to develop software solutions using modern technologies while following best coding practices."
    })) || [],

    projects: projects?.map(proj => ({
      ...proj,
      description:
        "Designed and built this project with a focus on scalability, performance, and user experience using industry best practices."
    })) || [],

    customSections: customSections?.map(sec => ({
      ...sec,
      content:
        "Demonstrated strong communication, time management, and problem-solving skills in a collaborative environment."
    })) || []
  };

  res.json({ preview: rewritten });
});

export default router;
