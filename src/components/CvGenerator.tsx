// components/CvGenerator.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { type ResumeData } from '@/types';
import Dropdown from '@/components/ui/Dropdown';
import { useTranslations } from 'next-intl';
import CVPreview from '@/components/CVPreview';
import { useDebounce } from 'use-debounce';
import { useLocale } from 'next-intl';


const sampleData: ResumeData = {
  personalInfo: {
    name: 'John Does',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'Boston, MA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
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

const App: React.FC = () => {
  const [lang, setLang] = useState(useLocale());
  const [activeTab, setActiveTab] = useState('form');
  const locales = [{value: 'es', label: 'Español'}, {value: 'en', label: 'English'}];
  const [formData, setFormData] = useState<ResumeData>(sampleData);
  // Para colocar un loading spinner mientras se genera el PDF
  const [isGenerating, setIsGenerating] = useState(true);

  // --- Debounce formData for the PDF preview ---
  // The 'data' prop to CVPreview will now be debouncedFormData
  const [debouncedFormData] = useDebounce(formData, 500); // Debounce by 500ms (adjust as needed)
  
  useEffect(()=> {
    if (JSON.stringify(formData) !== JSON.stringify(debouncedFormData)) {
      setIsGenerating(true);
    }
    else {
      setIsGenerating(false);
    }
  }, [formData, debouncedFormData]);
  
  // --- End Debounce ---


  
  const t  = useTranslations('cvGenerator');
  const getMonthOptions = () => {
    const months = [];
    const formatter = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', { month: 'short' });
    
    for (let i = 0; i <= 11; i++) {
      const date = new Date(2025, i, 1);
      months.push({
        value: (i + 1).toString(),
        label: formatter.format(date)
      });
    }
    return months;
  };

  const currentMonths = getMonthOptions();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'personal', title: 'Personal Information' },
    { id: 'experience', title: 'Experience' },
    { id: 'education', title: 'Education' },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  // Cambiar el idioma del PDF
  const changeLang = (input: string) => {
    const foundLocale = locales.find((l) => l.label === input);
    setLang(foundLocale ? foundLocale.value : 'en');
  };

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <label className="text-white/70 text-sm font-medium">Language:</label>
            <Dropdown 
              options={locales.map((l) => l.label)} 
              onChange={changeLang}
              initialValue={locales.find((l) => l.value === lang)?.label}
            />
          </div>

          {/* Tab Navigation */}
          <div className="min-lg:hidden flex bg-white/5 rounded-lg p-1 ml-auto justify-center items-center">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'form' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Edit CV
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'preview' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className={`${activeTab === 'form' ? 'block' : 'hidden lg:block'} 
                          overflow-x-hidden overflow-y-auto`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              
              <div className="flex items-center justify-between mb-6 max-sm:flex-col gap-3">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Your CV
                </h2>
                {/* Progress Indicator */}
                <div className="flex items-center space-x-2">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center justify-center">
                      <div className={`w-5 h-5 max-sm:w-3 max-sm:h-3  rounded-full 
                                      flex items-center justify-center text-sm font-medium
                                      max-sm:text-xs ${
                        index <= currentStep 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/10 text-white/50'
                      }`}>
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-5 max-sm:w-3 h-px mx-2 ${
                          index < currentStep ? 'bg-purple-500' : 'bg-white/20'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
                </div>
              {/* Sample Form Fields - You'll expand this */}
              <div className="space-y-6">
                <div className="space-y-6">

                {/* Form Content */}
                <div className="min-h-[300px]">
                  {/* Personal Information Step */}
                  {currentStep === 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="John Doe"
                            value={formData.personalInfo.name}
                            onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, name: e.target.value}})}
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">Email</label>
                          <input 
                            type="email" 
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="john@example.com"
                            value={formData.personalInfo.email}
                            onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, email: e.target.value}})}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Experience Step */}
                  {currentStep === 1 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Experience
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">Start Month</label>
                          <Dropdown
                            options={currentMonths.map((month)=> month.label)}
                            onChange={(value)=>{console.log(value)}}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end pt-6 gap-2
                                max-sm:pt-0">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      currentStep === 0
                        ? 'bg-white/10 text-white/30 cursor-not-allowed'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={nextStep}
                      className="px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <CVPreview locale={lang} data={debouncedFormData} isGenerating={isGenerating} />
          </div>
          
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-medium">Your Privacy is Protected</span>
          </div>
          <p className="text-green-300/80 text-sm mt-1">
            All CV generation happens locally in your browser. Your personal information never leaves your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;