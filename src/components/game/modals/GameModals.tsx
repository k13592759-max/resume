import React, { useState } from 'react';
import { X, Sparkles, Terminal, CheckCircle2, ExternalLink, Mail, Copy, Check, Send, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGame, ZONES } from '../../../game/GameContext';
import { PORTFOLIO_DATA, type Project, type SkillItem, type Achievement } from '../../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../../SocialIcons';

export const GameModals: React.FC = () => {
  const { activeModal, activeProjectId, closeModal, setGameMode, teleportTo, openModal } = useGame();
  const { personal, projects, skillsUsed, skillsLearning, achievements } = PORTFOLIO_DATA;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState<'used' | 'learning'>('used');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship Opportunity',
    message: ''
  });

  if (!activeModal) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectEncoded = encodeURIComponent(`[Portfolio Transmission] ${formData.subject} - from ${formData.name}`);
    const bodyEncoded = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    setFormSubmitted(true);
    window.location.href = `mailto:${personal.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  // Find currently active project or default to first
  const currentProjectIndex = projects.findIndex(p => p.id === activeProjectId);
  const currentProject: Project = currentProjectIndex >= 0 ? projects[currentProjectIndex] : projects[0];

  const cycleProject = (direction: 'next' | 'prev') => {
    const nextIdx = direction === 'next'
      ? (currentProjectIndex + 1) % projects.length
      : (currentProjectIndex - 1 + projects.length) % projects.length;
    openModal('project', projects[nextIdx].id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-void-950 border border-emerald-500/30 shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-void-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              {activeModal === 'origin' && 'ZONE 01 // THE ORIGIN'}
              {activeModal === 'project' && `ZONE 02 // PROJECT TERMINAL: ${currentProject.title.toUpperCase()}`}
              {activeModal === 'skills' && 'ZONE 03 // SKILL LAB KNOWLEDGE MATRIX'}
              {activeModal === 'vault' && 'ZONE 04 // ACHIEVEMENT VAULT'}
              {activeModal === 'hub' && 'ZONE 05 // CONNECTION TRANSMISSION HUB'}
            </span>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg bg-void-850 text-slate-400 hover:text-white border border-slate-700 hover:border-emerald-500/40 cursor-pointer transition-colors"
            title="Close Terminal [ESC]"
            aria-label="Close Terminal [ESC]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 font-sans text-slate-200 space-y-6">
          {/* ======================================================== */}
          {/* 1. ORIGIN MODAL                                          */}
          {/* ======================================================== */}
          {activeModal === 'origin' && (
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{personal.education}</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  {personal.name}
                </h2>
                <p className="text-sm font-mono text-cyan-400 mt-1">
                  {personal.title} &bull; {personal.location}
                </p>
                <p className="text-base text-slate-300 font-sans leading-relaxed mt-4">
                  &ldquo;Building intelligent experiences with AI, code, and creativity.&rdquo;
                </p>
              </div>

              <div className="glass-panel rounded-xl p-5 border border-emerald-500/20 text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  Welcome to my 3D Digital Universe! I am a first-year Bachelor of Computer Applications (BCA) student in India, building practical applications with modern web technologies, Generative AI models, and cloud systems.
                </p>
                <p>
                  You can explore this universe by walking to different stations:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-emerald-300 pt-2">
                  <li className="flex items-center gap-1.5">&bull; Zone 2: Project City (5 Projects)</li>
                  <li className="flex items-center gap-1.5">&bull; Zone 3: Skill Lab (Tech Matrix)</li>
                  <li className="flex items-center gap-1.5">&bull; Zone 4: Achievement Vault</li>
                  <li className="flex items-center gap-1.5">&bull; Zone 5: Connection Hub</li>
                </ul>
              </div>

              {/* Fast Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    closeModal();
                    setGameMode('classic');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer"
                >
                  VIEW CLASSIC PORTFOLIO OVERVIEW
                </button>

                <button
                  onClick={() => {
                    closeModal();
                    teleportTo(ZONES.projects.position, 'projects');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-void-950 transition-all cursor-pointer"
                >
                  TELEPORT TO PROJECT CITY &rarr;
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. PROJECT MODAL                                         */}
          {/* ======================================================== */}
          {activeModal === 'project' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-void-850 border border-slate-700 text-slate-300">
                      {currentProject.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {currentProject.status}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {currentProject.title}
                  </h2>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    {currentProject.tagline}
                  </p>
                </div>

                {/* Project carousel switchers */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => cycleProject('prev')}
                    className="p-2 rounded-lg bg-void-850 hover:bg-void-800 border border-slate-700 text-slate-300"
                    title="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => cycleProject('next')}
                    className="p-2 rounded-lg bg-void-850 hover:bg-void-800 border border-slate-700 text-slate-300"
                    title="Next Project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {currentProject.description}
              </p>

              {/* Architecture Layer */}
              {currentProject.architecture && (
                <div className="p-4 rounded-xl bg-void-900 border border-slate-800">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SYSTEM ARCHITECTURE</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                    {currentProject.architecture.map((layer, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400">&bull;</span>
                        <span>{layer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                  CORE HIGHLIGHTS &amp; OUTCOMES
                </h4>
                <div className="space-y-2">
                  {currentProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tags & Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-void-900 border border-slate-800 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-void-950 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GITHUB REPO</span>
                  </a>
                  {currentProject.demoUrl && (
                    <a
                      href={currentProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. SKILLS MODAL                                          */}
          {/* ======================================================== */}
          {activeModal === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">
                    Skill Lab Taxonomy
                  </h2>
                  <p className="text-xs font-mono text-emerald-400 mt-1">
                    Strict separation: Active Hands-On Tools vs. Next-Gen Frontier
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-void-900 border border-slate-800">
                  <button
                    onClick={() => setActiveSkillTab('used')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeSkillTab === 'used'
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                        : 'text-slate-400'
                    }`}
                  >
                    Technologies Used ({skillsUsed.length})
                  </button>
                  <button
                    onClick={() => setActiveSkillTab('learning')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeSkillTab === 'learning'
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'text-slate-400'
                    }`}
                  >
                    Currently Learning ({skillsLearning.length})
                  </button>
                </div>
              </div>

              {activeSkillTab === 'used' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {skillsUsed.map((skill: SkillItem) => (
                    <div
                      key={skill.name}
                      className="glass-panel rounded-xl p-4 border border-emerald-500/20"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-bold text-white font-sans">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {skill.level}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">
                        {skill.category}
                      </span>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {skillsLearning.map((skill: SkillItem) => (
                    <div
                      key={skill.name}
                      className="glass-panel-cyan rounded-xl p-4 border border-cyan-500/20"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-bold text-white font-sans">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {skill.level}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">
                        {skill.category}
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. VAULT MODAL                                           */}
          {/* ======================================================== */}
          {activeModal === 'vault' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  Achievement Vault
                </h2>
                <p className="text-xs font-mono text-amber-400 mt-1">
                  Verified Cloud Credentials &amp; Public Milestones
                </p>
              </div>

              {/* Verified Google Cloud Milestone */}
              <div className="p-5 rounded-2xl bg-void-900 border border-amber-500/30 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        VERIFIED BADGE #25567268
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        Google Skills Verified Milestone
                      </h3>
                      <p className="text-xs font-mono text-slate-400">
                        Google Cloud / Google Learning Platform
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-all font-bold"
                  >
                    <span>OPEN OFFICIAL VERIFICATION</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-2">
                  Publicly verified technical achievement credential earned through the Google Skills cloud computing and foundational architecture curriculum.
                </p>
              </div>

              {/* Other milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.slice(1).map((ach: Achievement) => (
                  <div
                    key={ach.id}
                    className="p-4 rounded-xl bg-void-900/60 border border-slate-800"
                  >
                    <h4 className="text-sm font-bold text-white mb-1">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 block mb-2">
                      {ach.issuer} &bull; {ach.issueDate}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. CONNECTION HUB MODAL                                  */}
          {/* ======================================================== */}
          {activeModal === 'hub' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  &ldquo;Have an interesting idea? Let&apos;s build it.&rdquo;
                </h2>
                <p className="text-xs font-mono text-cyan-400 mt-1">
                  Transmitting from Connection Hub &bull; India (UTC+5:30)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Copy Card */}
                <div className="p-4 rounded-xl bg-void-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>PRIMARY EMAIL</span>
                  </div>
                  <span className="block text-sm font-mono font-bold text-white break-all">
                    {personal.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-void-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <GithubIcon className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono">GITHUB PROFILE</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-emerald-400">
                      @{personal.githubUsername} &rarr;
                    </span>
                  </a>

                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-void-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono">LINKEDIN PROFILE</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400">
                      Krishna Katekhaye &rarr;
                    </span>
                  </a>
                </div>
              </div>

              {/* Message form */}
              <div className="p-5 rounded-2xl bg-void-900 border border-slate-800">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TRANSMIT INQUIRY</span>
                </h4>

                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs font-mono text-emerald-300">
                    Mail client opened with your inquiry addressed to {personal.email}!
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-void-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:border-emerald-500/60 focus:outline-none"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-void-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:border-emerald-500/60 focus:outline-none"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Your message or project scope..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-void-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:border-emerald-500/60 focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-void-950 transition-all cursor-pointer"
                    >
                      SEND TRANSMISSION VIA EMAIL
                    </button>
                  </form>
                )}
              </div>

              {/* Teleport back to Origin */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    closeModal();
                    teleportTo([0, 0, 0], 'origin');
                  }}
                  className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  &larr; Teleport back to Spawn (The Origin)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
