"use client";
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { type ResumeData, type CvTitles } from '@/types';

// -----------------------------------------------------------------------------
// Estilos del PDF
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 36, 
    fontFamily: 'Helvetica', 
    fontSize: 11,
    lineHeight: 1.3,
  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 8,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  companyInfo: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 12,
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
  educationItem: {
    marginBottom: 8,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textbold:{
    fontWeight: 'bold',
  },
  dates: {
    textTransform: 'capitalize',
  },
  educationDetails: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  skillsContainer: {
    flexDirection: 'column',
  },
  skillCategory: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  skillLabel: {
    fontWeight: 'bold',
    width: 80,
  },
  skillList: {
    flex: 1,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectHeader: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectDescription: {
    marginBottom: 2,
  },
  projectTech: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  referenceItem: {
    marginBottom: 8,
  },
  referenceName: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  referencePosition: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  referenceContactInfo: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    marginBottom: 2,
  },
  referenceSummary: {
    fontSize: 10,
  },
});

// -----------------------------------------------------------------------------
// Props de ATSResume
// -----------------------------------------------------------------------------
interface ATSResumeProps {
  data: ResumeData;
  titles: CvTitles;
}


const ATSResume: React.FC<ATSResumeProps> = ({ data, titles}) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && (
            <>
              <Text style={styles.contactItem}>•</Text>
              <Text style={styles.contactItem}>
                {data.personalInfo.linkedin}
              </Text>
            </>
          )}
          {data.personalInfo.website && (
            <>
              <Text style={styles.contactItem}>•</Text>
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            </>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.sumary}</Text>
          <Text>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{titles.experience}</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.dates}>
                {job.startDate} - {job.endDate}
              </Text>
            </View>
            <Text style={styles.companyInfo}>
              {job.company}, {job.location}
            </Text>
            {job.bullets.map((bullet, bulletIndex) => (
              <View key={bulletIndex} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{titles.education}</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <View style={styles.educationHeader}>
              <Text style={styles.textbold} >{edu.degree}</Text>
              <Text>{edu.graduationDate}</Text>
            </View>
            <Text style={styles.educationDetails}>
              {edu.school}, {edu.location}
              {edu.gpa && ` • GPA: ${edu.gpa}`}
              {edu.honors && ` • ${edu.honors}`}
            </Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{titles.skills}</Text>
        <View style={styles.skillsContainer}>
          {data.skills.technical && data.skills.technical.length > 0 && (
            <View style={styles.skillCategory}>
              <Text style={styles.skillLabel}>{titles.stechnical}:</Text>
              <Text style={styles.skillList}>
                {data.skills.technical.join(', ')}
              </Text>
            </View>
          )}
          {data.skills.languages && data.skills.languages.length > 0 && (
            <View style={styles.skillCategory}>
              <Text style={styles.skillLabel}>{titles.slanguages}:</Text>
              <Text style={styles.skillList}>
                {data.skills.languages.join(', ')}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      {/* Certificates */}
      {data.certifications && data.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.certificates}</Text>
          {data.certifications.map((certification, index) => (
            <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{certification.name} - {certification.institution} ({certification.date})</Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.projects}</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text style={styles.projectHeader}>{project.name}</Text>
              <Text style={styles.projectDescription}>
                {project.description}
              </Text>
              <Text style={styles.projectTech}>
                {titles.ptechnologies}: {project.technologies.join(', ')}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* References */}
      {data.references && data.references.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.references}</Text>
          {data.references.map((ref, index) => (
            <View key={index} style={styles.referenceItem}>
              <Text style={styles.referenceName}>{ref.name}</Text>
              <Text style={styles.referencePosition}>{ref.position}</Text>
              <View style={styles.referenceContactInfo}>
                {ref.email && (
                  <Text style={styles.contactItem}>{ref.email}</Text>
                )}
                {ref.email && (ref.phone || ref.linkedin || ref.website) && (
                  <Text style={styles.contactItem}>•</Text>
                )}
                {ref.phone && (
                  <Text style={styles.contactItem}>{ref.phone}</Text>
                )}
                {ref.phone && (ref.linkedin || ref.website) && (
                  <Text style={styles.contactItem}>•</Text>
                )}
                {ref.linkedin && (
                  <Text style={styles.contactItem}>{ref.linkedin}</Text>
                )}
                {ref.linkedin && ref.website && (
                  <Text style={styles.contactItem}>•</Text>
                )}
                {ref.website && (
                  <Text style={styles.contactItem}>{ref.website}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ATSResume;