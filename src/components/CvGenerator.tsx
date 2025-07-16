"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ATSResume from '@/components/MyCvDocument';
import { type ResumeData, type CvTitles, es_titles, en_titles } from '@/types';

const PDFDownloadLink  = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading PDF download link...</p>,
  }
);
const PDFViewerComponent = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading PDF viewer...</p>,
  }
);


const sampleData: ResumeData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'Boston, MA',
    linkedin: 'linkedin.com/in/johndoe',
  },
  summary:
    'Results-driven software engineer with 5+ years of experience in full-stack development...',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      location: 'Boston, MA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      bullets: [
        'Developed and maintained React applications serving 100K+ users',
        'Improved application performance by 40% through code optimization',
        'Led a team of 3 junior developers on key product features',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      location: 'Boston, MA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      bullets: [
        'Developed and maintained React applications serving 100K+ users',
        'Improved application performance by 40% through code optimization',
        'Led a team of 3 junior developers on key product features',
      ],
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Harvard University',
      location: 'Cambridge, MA',
      graduationDate: 'May 2019',
      gpa: '3.8',
    },
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
    languages: ['English (Native)', 'Spanish (Conversational)'],
  },
  projects: [
    {
      name: 'Project 1',
      description: 'This is a sample project description.',
      technologies: ['React', 'Node.js', 'TypeScript'],
      link: 'https://example.com/project1',
    },
  ],
  references: [
    {
      name: 'John Doe',
      position: 'Software Engineer',
      phone: '(555) 123-4567',
      email: 'john.doe@email.com',
      linkedin: 'linkedin.com/in/johndoe',
      summary: 'John Doe is a software engineer with 10 years of experience in full-stack development.',
    },],
    certifications: [
      {
        name: 'Certification Name',
        institution: 'Institution Name',
        date: '2022-01-01',
      }
    ]
};
const date = new Date(2025, 5, 1);

const engform = new Intl.DateTimeFormat("es-ES", 
  { month: "short"}
)
const res = engform.format(date);

const App: React.FC = () => {
  const [showViewer, setShowViewer] = useState(false);
  const [locale, setLocale] = useState('es');
  let titles: CvTitles;
    switch (locale) {
      case 'es':
        titles = es_titles;
        break;
      case 'en':
        titles = en_titles;
        break;
      default:
        titles = en_titles;
        break;
    }

  
  const getMonthOptons = () => {
    const months = [];
    for (let i = 0; i<=11; i++) {
      const date = new Date(2025, i, 1);
      months.push({
          value: (i+1).toString(),
          label: engform.format(date)
        });
    }
    return months;
  }

  const currentMonths = getMonthOptons();


  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ATS-Friendly Resume Generator</h1>
      <select

      >
        <option value="">Select Month</option>
        {currentMonths.map((month) => (
          <option style={{textTransform: 'capitalize'}} key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      <div className="mb-4">
        <button
          onClick={() => setShowViewer(!showViewer)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          {showViewer ? 'Hide' : 'Show'} PDF Preview
        </button>
        
        <PDFDownloadLink
          document={<ATSResume data={sampleData} titles={titles} />}
          fileName="resume.pdf"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </div>
      
      {showViewer && 
      <PDFViewerComponent width={500} height={600}>
        <ATSResume data={sampleData} titles={titles} />
      </PDFViewerComponent>
      }
    </div>
  );
};

export default App;