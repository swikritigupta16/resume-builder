//frontend helper function
export const buildAIPayload = (resume) => ({                           //this file - tells what to send to ai
  summary: resume.summary?.trim() || "",                       

  experience: Array.isArray(resume.experience)
    ? resume.experience.map(exp => ({
        ...exp,
        ...(exp.description?.trim()
          ? { description: exp.description.trim() } // rewrite only if written
          : {}) // else don't send description at all
      }))
    : [],

  projects: Array.isArray(resume.projects)
    ? resume.projects.map(proj => ({
        ...proj,
        ...(proj.description?.trim()
          ? { description: proj.description.trim() }
          : {})
      }))
    : [],

  customSections: Array.isArray(resume.customSections)
    ? resume.customSections.map(sec => ({
        ...sec,
        ...(sec.content?.trim()
          ? { content: sec.content.trim() }
          : {})
      }))
    : []
});
