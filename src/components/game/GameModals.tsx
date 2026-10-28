import React from 'react';
import { useGame } from '../../game/GameContext';
import { PERSONAL, GAME_PROJECTS, SKILL_GROUPS, ACHIEVEMENTS, ABOUT_PARAGRAPHS } from '../../data/portfolioData';

// ─────────────────────────────────────────────
// Modal overlay wrapper
// ─────────────────────────────────────────────
interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  accentColor: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose, title, accentColor }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
    <div
      className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border bg-[#070d10]/95 shadow-2xl"
      style={{ borderColor: `${accentColor}30` }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 rounded-t-2xl border-b backdrop-blur-sm"
        style={{ borderColor: `${accentColor}20`, background: `${accentColor}08` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
          />
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: accentColor }}>
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-lg"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Origin / About modal
// ─────────────────────────────────────────────
export const OriginModal: React.FC = () => {
  const { closeModal, setGameMode } = useGame();

  return (
    <ModalWrapper onClose={closeModal} title="Zone 1 — The Origin" accentColor="#10b981">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">{PERSONAL.name}</h2>
          <p className="text-emerald-400 font-mono text-sm mt-1">{PERSONAL.headline}</p>
          <p className="text-slate-500 text-xs font-mono mt-1">{PERSONAL.education}</p>
        </div>

        <div className="space-y-3">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i} className="text-slate-300 text-sm leading-relaxed">{p}</p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InfoCard label="Currently" value="BCA First Year" color="#10b981" />
          <InfoCard label="Focus" value="AI & Software Dev" color="#10b981" />
          <InfoCard label="Location" value={PERSONAL.location} color="#10b981" />
          <InfoCard label="Status" value={PERSONAL.availableFor} color="#10b981" />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-600/30 transition-colors">
            LinkedIn ↗
          </a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-slate-700/40 border border-slate-600/30 text-slate-300 text-sm font-medium hover:bg-slate-700/60 transition-colors">
            GitHub ↗
          </a>
          <button onClick={() => { closeModal(); setGameMode('classic'); }}
            className="px-4 py-2 rounded-lg border border-emerald-500/30 text-emerald-300 text-sm font-medium hover:bg-emerald-500/10 transition-colors">
            Classic Portfolio
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// ─────────────────────────────────────────────
// Projects modal
// ─────────────────────────────────────────────
export const ProjectModal: React.FC = () => {
  const { closeModal, activeProjectId, openModal } = useGame();

  const activeProject = activeProjectId
    ? GAME_PROJECTS.find((p) => p.id === activeProjectId)
    : null;

  if (activeProject) {
    return (
      <ModalWrapper onClose={closeModal} title={`Project — ${activeProject.title}`} accentColor={activeProject.color}>
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-white">{activeProject.title}</h2>
            <p className="font-mono text-sm mt-1" style={{ color: activeProject.color }}>{activeProject.tagline}</p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{activeProject.description}</p>

          <div className="flex flex-wrap gap-2">
            {activeProject.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono border"
                style={{ borderColor: `${activeProject.color}40`, color: activeProject.color, background: `${activeProject.color}10` }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap pt-2">
            <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/5 border border-slate-700 transition-colors">
              <GithubIcon /> View Code
            </a>
            {activeProject.demoUrl && (
              <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ background: `${activeProject.color}20`, borderColor: `${activeProject.color}40`, border: '1px solid', color: activeProject.color }}>
                Live Demo ↗
              </a>
            )}
            <button onClick={() => openModal('project', undefined)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 transition-colors">
              ← All Projects
            </button>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={closeModal} title="Zone 2 — Project City" accentColor="#3b82f6">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My Projects</h2>
          <p className="text-slate-400 text-sm">Real repositories from my GitHub account. Click to explore each one.</p>
        </div>

        <div className="grid gap-3">
          {GAME_PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => openModal('project', project.id)}
              className="w-full text-left p-4 rounded-xl border border-slate-800 hover:border-opacity-50 transition-all group"
              style={{ '--accent': project.color } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: project.color }} />
                    <span className="font-semibold text-slate-100 text-sm group-hover:text-white">{project.title}</span>
                  </div>
                  <p className="text-xs font-mono" style={{ color: project.color }}>{project.tagline}</p>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>
                <span className="text-slate-600 group-hover:text-slate-300 transition-colors shrink-0 mt-1">→</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded border"
                    style={{ borderColor: `${project.color}30`, color: `${project.color}cc`, background: `${project.color}08` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="pt-2 text-center">
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline font-mono">
            View all repositories on GitHub ↗
          </a>
        </div>
      </div>
    </ModalWrapper>
  );
};

// ─────────────────────────────────────────────
// Skills modal
// ─────────────────────────────────────────────
export const SkillsModal: React.FC = () => {
  const { closeModal } = useGame();
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <ModalWrapper onClose={closeModal} title="Zone 3 — Skill Lab" accentColor="#8b5cf6">
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Skills & Technologies</h2>
          <p className="text-slate-400 text-sm">Technologies used across coursework, personal projects, and active self-study.</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {SKILL_GROUPS.map((group, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === i
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                  : 'text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              {group.category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div>
          <p className="text-xs text-slate-500 font-mono mb-3">{SKILL_GROUPS[activeTab].description}</p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {SKILL_GROUPS[activeTab].skills.map((skill) => (
              <div key={skill.name}
                className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 hover:border-violet-500/20 hover:bg-violet-500/5 transition-all">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-100">{skill.name}</span>
                  {skill.note && <p className="text-xs text-slate-500 mt-0.5 leading-snug">{skill.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

// ─────────────────────────────────────────────
// Achievements modal
// ─────────────────────────────────────────────
export const AchievementsModal: React.FC = () => {
  const { closeModal } = useGame();

  const TYPE_COLORS: Record<string, string> = {
    badge: '#3b82f6',
    certification: '#8b5cf6',
    competition: '#f59e0b',
    community: '#10b981',
  };

  return (
    <ModalWrapper onClose={closeModal} title="Zone 4 — Achievement Vault" accentColor="#f59e0b">
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Credentials & Achievements</h2>
          <p className="text-slate-400 text-sm">Verified badges and milestones only. No fabricated awards or rankings.</p>
        </div>

        <div className="space-y-4">
          {ACHIEVEMENTS.map((ach) => {
            const color = TYPE_COLORS[ach.type] ?? '#94a3b8';
            return (
              <div key={ach.id} className="p-5 rounded-xl border border-slate-800 hover:border-yellow-500/20 transition-colors bg-slate-900/40">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-slate-100 text-sm leading-snug">{ach.title}</h3>
                  <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                    {ach.type}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500 mb-2">{ach.issuer} · {ach.date}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{ach.description}</p>
                {ach.verificationUrl && (
                  <a href={ach.verificationUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs text-yellow-400 hover:text-yellow-300 transition-colors font-mono">
                    Verify Credential ↗
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="pt-2">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Journey Timeline</p>
          <div className="space-y-3 border-l border-slate-800 ml-2 pl-4">
            {[
              { period: '2024 – Present', title: 'Bachelor of Computer Applications (BCA)', sub: 'First Year, India' },
              { period: '2024', title: 'Google Skills Verified Badge', sub: 'Google Cloud Learning' },
              { period: '2024 – 2025', title: 'Generative AI & Prompt Engineering', sub: 'Independent Research' },
              { period: '2025 →', title: 'Next: RAG, Docker & Cloud Architecture', sub: 'Active Learning' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-5.5 top-1.5 w-2 h-2 rounded-full border border-yellow-500 bg-[#070d10]" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-slate-100">{item.title}</span>
                    <span className="text-xs font-mono text-slate-500">{item.period}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

// ─────────────────────────────────────────────
// Contact modal
// ─────────────────────────────────────────────
export const ContactModal: React.FC = () => {
  const { closeModal } = useGame();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalWrapper onClose={closeModal} title="Zone 5 — Connection Hub" accentColor="#06b6d4">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Let's Connect</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Open to internships, collaborations, and conversations about AI and software development.
          </p>
        </div>

        <div className="space-y-3">
          <ContactLink
            href={PERSONAL.linkedin}
            label="LinkedIn"
            sub="Connect professionally"
            color="#3b82f6"
            icon={<LinkedinIcon />}
          />
          <ContactLink
            href={PERSONAL.github}
            label="GitHub"
            sub={`@${PERSONAL.githubUsername} · View repositories`}
            color="#94a3b8"
            icon={<GithubIcon />}
          />
          <div
            className="flex items-center justify-between px-5 py-4 rounded-xl border border-slate-800 cursor-pointer hover:border-cyan-500/30 transition-colors group"
            onClick={handleCopy}
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                ✉
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-100">Email</div>
                <div className="text-xs text-slate-500 mt-0.5">{PERSONAL.email}</div>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
              {copied ? '✓ Copied!' : 'Click to copy'}
            </span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

// ─────────────────────────────────────────────
// Reusable helpers
// ─────────────────────────────────────────────
const InfoCard: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
    <div className="text-xs font-mono mb-1" style={{ color }}>{label}</div>
    <div className="text-sm font-semibold text-slate-100">{value}</div>
  </div>
);

const ContactLink: React.FC<{ href: string; label: string; sub: string; color: string; icon: React.ReactNode }> = ({ href, label, sub, color, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="flex items-center justify-between px-5 py-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors group">
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-300"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-100">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{sub}</div>
      </div>
    </div>
    <span className="text-slate-500 group-hover:text-slate-300 transition-colors">↗</span>
  </a>
);

const GithubIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
