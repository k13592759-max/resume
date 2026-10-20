import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  X, 
  FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { personal, projects, achievements } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const plainTextResume = `
KRISHNA KATEKHAYE
Location: India | Email: ${personal.email}
GitHub: ${personal.github} | LinkedIn: ${personal.linkedin}

OBJECTIVE & SUMMARY
First-year Bachelor of Computer Applications (BCA) student focused on Generative AI, prompt engineering, and modern web development. Passionate about AI-assisted development (vibe coding) and building practical, user-centric software solutions. Seeking internship and early-stage developer collaborations.

EDUCATION
Bachelor of Computer Applications (BCA) — First Year
Location: India | Status: Active Student
Key Focus: Computer science fundamentals, algorithmic problem solving, modern web practices.

TECHNICAL SKILLS
- AI & Next-Gen Dev: Generative AI Exploration, Prompt Engineering (system prompts, few-shot reasoning), AI-Assisted Development / Vibe Coding.
- Web Development: HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Responsive Design.
- Tools & Workflow: Git, GitHub, VS Code, Google Antigravity.
- Programming Fundamentals: C, Python (actively developing coursework).

FEATURED PROJECTS & CONCEPTS
- EcoMind: Eco-focused digital platform examining AI-driven spatial data and mapping technologies.
- VotePath India: Civic information project simplifying voter registration pathways and democratic literacy.
- StadiumGPT360: Sports-focused AI concept uniting real-time match context with interactive conversational assistants.
- CoffeeMind & Climatora: Precision brew ratio calculator and climate monitoring dashboards.

VERIFIED MILESTONES
- Google Skills Verified Badge (ID: 25567268) — Verified milestone on Google Cloud/Learning platform.
Verification URL: https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268
`.trim();

  const handleCopyPlainText = () => {
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0D101E] rounded-3xl border border-slate-300 dark:border-white/10 shadow-2xl overflow-hidden print:border-none print:shadow-none print:rounded-none print:bg-white print:text-black my-8"
        >
          
          {/* Top Control Bar (Hidden when printing) */}
          <div className="sticky top-0 z-30 flex items-center justify-between p-4 sm:p-5 bg-slate-100/90 dark:bg-[#12162A]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 print:hidden">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-sky-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Official Resume / CV
                </h3>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  ATS-Formatted • Printable & Exportable
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Print / Save PDF */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-300 dark:border-white/10 shadow-sm transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-indigo-500 dark:text-sky-400" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              {/* Download Resume PDF */}
              <a
                href={personal.resumePath}
                download="Krishna_Katekhaye_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all"
                title="Download PDF File"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              {/* Copy Plain Text for ATS */}
              <button
                onClick={handleCopyPlainText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                title="Copy plain-text formatted resume for ATS portals"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{copied ? 'Copied ATS Text' : 'Copy ATS Text'}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors ml-1"
                aria-label="Close resume view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div className="p-6 sm:p-10 text-slate-800 dark:text-slate-200 print:text-black print:p-0 space-y-6">
            
            {/* Header */}
            <div className="border-b border-slate-300 dark:border-white/10 pb-6 print:border-black print:pb-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white print:text-black tracking-tight">
                  {personal.name}
                </h1>
                <p className="text-sm font-semibold text-indigo-600 dark:text-sky-400 print:text-black mt-1">
                  {personal.role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 print:text-gray-700 mt-1">
                  {personal.education} • {personal.location}
                </p>
              </div>

              {/* Contact Pills */}
              <div className="flex flex-col sm:items-end text-xs font-mono text-slate-600 dark:text-slate-300 print:text-black space-y-1">
                <span>Email: {personal.email}</span>
                <span>GitHub: {personal.github}</span>
                <span>LinkedIn: {personal.linkedin}</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-sky-400 print:text-black font-bold mb-2">
                01 // Professional Summary
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-black">
                {personal.bio} Currently pursuing first-year Bachelor of Computer Applications with an active focus on hands-on software development, generative AI tools, and prompt architectures. Committed to honest skill progression and collaborative engineering.
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-sky-400 print:text-black font-bold mb-2">
                02 // Education
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white print:text-black">
                    Bachelor of Computer Applications (BCA)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 print:text-gray-700">
                    First Year Undergraduate • India
                  </p>
                </div>
                <span className="text-xs font-mono text-indigo-600 dark:text-sky-400 print:text-black font-semibold mt-1 sm:mt-0">
                  2026 – Present
                </span>
              </div>
            </div>

            {/* Technical Core Skills */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-sky-400 print:text-black font-bold mb-3">
                03 // Technical Competencies
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 print:border-gray-300">
                  <strong className="block text-slate-900 dark:text-white print:text-black mb-1">
                    AI & Modern Tooling:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 print:text-black">
                    Generative AI Exploration, Prompt Engineering, AI-Assisted Coding (Vibe Coding), Google Antigravity.
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 print:border-gray-300">
                  <strong className="block text-slate-900 dark:text-white print:text-black mb-1">
                    Web Development:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 print:text-black">
                    HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Responsive & Mobile UI.
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 print:border-gray-300">
                  <strong className="block text-slate-900 dark:text-white print:text-black mb-1">
                    Workflow & Environment:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 print:text-black">
                    Git, GitHub, VS Code, Linux/Windows CLI, Vite.
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 print:border-gray-300">
                  <strong className="block text-slate-900 dark:text-white print:text-black mb-1">
                    Programming Fundamentals (Developing):
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 print:text-black">
                    C Programming, Python (foundational coursework in progress).
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-sky-400 print:text-black font-bold mb-3">
                04 // Projects & Concepts (Candidate Builds)
              </h2>

              <div className="space-y-3.5 text-xs">
                {projects.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 print:border-gray-300"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 dark:text-white print:text-black font-semibold text-sm">
                        {p.title} — {p.tagline}
                      </strong>
                      <span className="font-mono text-[11px] text-slate-500 print:text-black">
                        [{p.status}]
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 print:text-black leading-relaxed mb-2">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 print:border print:border-gray-400 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Achievements */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-sky-400 print:text-black font-bold mb-2">
                05 // Verified Credentials
              </h2>
              {achievements.map((ach) => (
                <div key={ach.id} className="flex items-start justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white print:text-black">
                      {ach.title}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 print:text-gray-700 block">
                      Issuer: {ach.issuer} ({ach.credentialId})
                    </span>
                  </div>
                  <a
                    href={ach.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-sky-400 print:text-black underline font-mono text-[11px]"
                  >
                    Verify Profile →
                  </a>
                </div>
              ))}
            </div>

          </div>

          {/* Modal Footer Note */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0D101E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 print:hidden">
            <span>Tip: Click "Print / Save PDF" to generate a clean ATS resume file.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-all font-semibold"
            >
              Done Viewing
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
