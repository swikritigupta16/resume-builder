import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0d6efd",
    textAlign: "center",
    marginBottom: 15,
    letterSpacing: 1,
  },
  headerLine: {
    textAlign: "center",
    marginBottom: 4,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0d6efd",
    marginBottom: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#0d6efd",
    marginBottom: 4,
  },
  text: {
    textAlign: "justify",
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});

/* ================== COMPONENT ================== */
const AtsTemplatePDF = ({ resume }) => {    //functional component for ats pdf generation
  if (!resume) return null;

  const {                          //extract resume fields, provide default values to avoid crashes
    name = "",              
    title = "",
    phone = "",
    email = "",
    address = "",
    profiles = {},
    summary = "",
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    customSections = [],
  } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <Text style={styles.name}>{name}</Text>
        {title && <Text style={styles.headerLine}>{title}</Text>}   {/* job title */}

        {(address || phone || email) && (
          <Text style={styles.headerLine}>
            {address ? `${address}    ` : ""}
            {phone ? `Phone: ${phone}    ` : ""}
            {email ? `Email: ${email}` : ""}
          </Text>
        )}

        {(profiles.linkedin || profiles.github) && (
          <Text style={styles.headerLine}>
            {profiles.linkedin ? `LinkedIn: ${profiles.linkedin}    ` : ""}
            {profiles.github ? `GitHub: ${profiles.github}` : ""}
          </Text>
        )}

        {/* SUMMARY */}
        {summary.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.divider} />
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

       {/* EDUCATION */}
{education.length > 0 && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Education</Text>
    <View style={styles.divider} />
    {education.map((edu, i) => (
      <View key={i} style={{ marginBottom: 6 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.bold}>• {edu.degree}</Text>
          {edu.year && <Text style={styles.bold}>{edu.year}</Text>}
        </View>
        <Text>{edu.institute}</Text>
        {edu.grade && (
          <Text>
            <Text style={styles.bold}>Grade:</Text> {edu.grade}
          </Text>
        )}
      </View>
    ))}
  </View>
)}

        {/* SKILLS */}
{skills.length > 0 && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Key Skills</Text>
    <View style={styles.divider} />
    {skills.map((skill, i) => {
      const [label, value] = skill.split(":");
      return (
        <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
          {/* Bullet */}
          <Text style={{ width: 10 }}>•</Text>
          {/* Text */}
          <Text style={{ flex: 1 }}>
            {value ? (
              <>
                <Text style={styles.bold}>{label}:</Text>
                <Text> {value}</Text>
              </>
            ) : (
              label
            )}
          </Text>
        </View>
      );
    })}
  </View>
)}

       {/* PROJECTS */}
{projects.length > 0 && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Projects</Text>
    <View style={styles.divider} />
    {projects.map((proj, i) => (
      <View key={i} style={{ marginBottom: 6 }}>
        <View style={{ flexDirection: "row", marginBottom: 2 }}>
          {/* Bullet */}
          <Text style={{ width: 10 }}>•</Text>
          {/* Project title in bold, tech in normal */}
          <Text style={{ flex: 1 }}>
            <Text style={styles.bold}>{proj.title}</Text>
            {proj.technology ? ` | ${proj.technology}` : ""}
          </Text>
        </View>
        {proj.description && <Text style={styles.text}>{proj.description}</Text>}
      </View>
    ))}
  </View>
)}


      {/* CERTIFICATIONS */}
{certifications.length > 0 && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Certifications & Achievements</Text>
    <View style={styles.divider} />

    {certifications
      .filter(cert => cert.name || cert.organization || cert.year)
      .map((cert, i) => (
        <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
          <Text style={{ width: 10 }}>•</Text>

          <Text style={{ flex: 1 }}>
            {cert.name && (
              <Text style={styles.bold}>{cert.name}</Text>
            )}
            {cert.organization && `, ${cert.organization}`}
            {cert.year && ` (${cert.year})`}
          </Text>
        </View>
      ))}
  </View>
)}




      {/* CUSTOM SECTIONS */}
{customSections.length > 0 &&
  customSections
    .filter(sec => sec.title?.trim() || sec.content?.trim()) // only non-empty sections
    .map((sec, i) => (
      <View key={i} style={styles.section}>
        <Text style={styles.sectionTitle}>{sec.title}</Text>
        <View style={styles.divider} />
        {sec.content
          .split("\n")
          .filter(line => line.trim()) // only non-empty lines
          .map((line, idx) => {
            const [label, value] = line.split(":");
            if (!label && !value) return null; // skip empty
            return (
              <View key={idx} style={{ flexDirection: "row", marginBottom: 2 }}>
                <Text style={{ width: 10 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  {value ? (
                    <>
                      <Text style={styles.bold}>{label}:</Text>
                      <Text> {value}</Text>
                    </>
                  ) : (
                    label
                  )}
                </Text>
              </View>
            );
          })}
      </View>
    ))}

      </Page>
    </Document>
  );
};

export default AtsTemplatePDF;
