"use client";
import React from 'react';
import { useState, useMemo, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ATSResume from '@/components/MyCvDocument';
import { type ResumeData } from '@/types';

// -----------------------------------------------------------------------------
// Carga dinámica de los componentes de React-PDF
// -----------------------------------------------------------------------------

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        Loading PDF download...
      </div>
    ),
  }
);

const PDFViewerComponent = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-white/5 rounded-xl border border-white/10">
        <div className="text-center text-white/70">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          Loading PDF viewer...
        </div>
      </div>
    ),
  }
);

export interface CVPreviewProps {
  data: ResumeData;
  locale: string;
  isGenerating: boolean;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, locale, isGenerating}) => {
    const [activeTab, setActiveTab] = useState('form');
    const [showViewer, setShowViewer] = useState(false);
    // Use a ref to track if it's the very first render to avoid
    // showing the spinner before the initial PDF is even created.
    const isInitialRender = React.useRef(true);

    // Memoizando el componente para que solo se re renderice cuando cambia la data
    const MemoizedATSResume = useMemo(() => {
     
      return (
        <ATSResume data={data} locale={locale} />
      );
    }, [data, locale]);

    return (
    <>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6 max-md:flex-col gap-1">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
            </h2>
            
            <div className="flex gap-2">
                <button
                onClick={() => setShowViewer(!showViewer)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                {showViewer ? (
                    <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.5 6.5m3.378 3.378a3 3 0 004.243-4.242M6.5 6.5l5.5 5.5" />
                    </svg>
                    Hide
                    </>
                ) : (
                    <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Show
                    </>
                )}
                </button>
                
                <PDFDownloadLink
                document={<ATSResume data={data} locale={locale} />}
                fileName="cv-forge-resume.pdf"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                {({ blob, url, loading, error }) => (
                    <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {loading ? 'Generating...' : 'Download PDF'}
                    </>
                )}
                </PDFDownloadLink>
            </div>
            </div>
            
            {showViewer ? (
            <div className="rounded-lg overflow-hidden border border-white/10 max-md:w-full max-md:min-w-full">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-96 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-center text-white/70">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                      Updating PDF preview...
                    </div>
                  </div>
                ) : (
                  <PDFViewerComponent 
                  className='border-r-4 '
                  width="100%" 
                  height={600}
                  style={{ border: 'none', minWidth: '100%'}}
                  showToolbar={false}
                  >
                  <ATSResume data={data} locale={locale} />
                  </PDFViewerComponent>
                )}
            </div>
            ) : (
            <div className="h-96 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <div className="text-center text-white/70">
                <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg">Click &quot;Show&quot; to preview your CV</p>
                <p className="text-sm text-white/50 mt-2">Your PDF will be generated locally in your browser</p>
                </div>
            </div>
            )}
        </div>
    </>
    )
}

// Usando memo para no re renderizar el componente cuando no se cambien los datos

const MemoizedATSResume = React.memo(CVPreview);

export default MemoizedATSResume;
