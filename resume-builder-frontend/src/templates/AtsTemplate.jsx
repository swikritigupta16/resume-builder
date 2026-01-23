function AtsTemplate({ resume, sections = [] }) {

  const SectionHeader = ({ title }) => ( 
    <div className="section-header mt-4 mb-1">
      <h5 className="text-primary fw-bold mb-1">{title}</h5>
      <hr className="mt-0 mb-1 text-primary border-1 opacity-100" />
    </div>
  );

  const renderBullets = (items) => (
    <div className="row">
      {items.map((item, index) => {
        const colonIndex = item.indexOf(":");
        return (
          <div
            key={index}
            className="col-12 mb-1"
            style={{ lineHeight: "1.3" }}
          >
            • {colonIndex !== -1 ? (
              <>
                <strong>{item.slice(0, colonIndex)}:</strong>
                {item.slice(colonIndex + 1)}
              </>
            ) : (
              item
            )}
          </div>
        );
      })}
    </div>
  );

  const renderSection = (section) => {
    switch (section) {

      /* SUMMARY (paragraph only) */
      case "summary":
        return resume.summary && (
          <div className="resume-section">
            <SectionHeader title="Summary" />
            <p align="justify">{resume.summary}</p>
          </div>
        );

      /* EXPERIENCE */
      case "experience":
        return resume.experience?.some(
          exp => exp.company || exp.role || exp.duration || exp.description
        ) && (
          <div className="resume-section">
            <SectionHeader title="Work Experience" />
            {renderBullets(
              resume.experience.map(exp => {
                let line = "";
                if (exp.role) line += `${exp.role}`;
                if (exp.company) line += line ? ` – ${exp.company}` : exp.company;
                if (exp.duration) line += line ? ` (${exp.duration})` : exp.duration;
                if (exp.description) line += `: ${exp.description}`;
                return line;
              })
            )}
          </div>
        );

      /* EDUCATION */
      case "education":
        return resume.education?.some(
          edu => edu.degree || edu.institute || edu.year || edu.grade
        ) && (
          <div className="resume-section">
            <SectionHeader title="Education" />
            {renderBullets(
              resume.education.map(edu => {
                let line = "";
                if (edu.degree) line += edu.degree;
                if (edu.institute) line += line ? ` – ${edu.institute}` : edu.institute;
                if (edu.year) line += line ? ` (${edu.year})` : edu.year;
                if (edu.grade) line += `: Grade ${edu.grade}`;
                return line;
              })
            )}
          </div>
        );

      /* SKILLS */
      case "skills":
        return resume.skills?.length > 0 && (
          <div className="resume-section">
            <SectionHeader title="Key Skills" />
            {renderBullets(resume.skills)}
          </div>
        );

      /* PROJECTS */
      case "projects":
        return resume.projects?.some(proj => proj.title || proj.description) && (
          <div className="resume-section">
            <SectionHeader title="Projects" />
            {renderBullets(
              resume.projects.map(proj => {
                let line = proj.title || "";
                if (proj.technology) line += line ? ` – ${proj.technology}` : proj.technology;
                if (proj.description) line += `: ${proj.description}`;
                return line;
              })
            )}
          </div>
        );

      /* CERTIFICATIONS */
      case "certifications":
        return resume.certifications?.length > 0 && (
          <div className="resume-section">
            <SectionHeader title="Certifications & Achievements" />
            {renderBullets(
              resume.certifications
                .filter(cert => cert.name || cert.organization)
                .map(cert => {
                  let line = cert.name || "";
                  if (cert.organization) line += line ? ` | ${cert.organization}` : cert.organization;
                  if (cert.year) line += ` (${cert.year})`;
                  return line;
                })
            )}
          </div>
        );

      /* CUSTOM SECTIONS */
      case "custom":
        return resume.customSections?.some(
          sec => sec.title?.trim() || sec.content?.trim()
        ) && (
          <div className="resume-section">
            {resume.customSections
              .filter(sec => sec.title?.trim() || sec.content?.trim())
              .map(sec => (
                <div key={sec.id} className="mb-2">
                  <SectionHeader title={sec.title} />
                  {renderBullets(
                    sec.content
                      .split("\n")
                      .filter(line => line.trim())
                  )}
                </div>
              ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="border p-4 text-left"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "14px",
        lineHeight: "1.6"
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-3">
        <h2 className="fw-bold text-primary mb-1" style={{ letterSpacing: "1px" }}>
          {resume.name || "YOUR NAME"}
        </h2>

        {resume.title && <div className="mb-2">{resume.title}</div>}

        <div className="mb-1">
          {resume.address && <span>{resume.address}</span>}
          {resume.phone && <span> | Phone: {resume.phone}</span>}
          {resume.email && <span> | Email: {resume.email}</span>}
        </div>

        <div>
          {resume.profiles?.linkedin && <span>LinkedIn: {resume.profiles.linkedin}</span>}
          {resume.profiles?.github && <span> | GitHub: {resume.profiles.github}</span>}
        </div>
      </div>

      {/* REORDERABLE SECTIONS */}
      {sections.map(section => (
        <div key={section}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}

export default AtsTemplate;
