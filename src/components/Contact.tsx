import React, { useState } from 'react';
import { Terminal, Mail, Copy, Check, Send, Sparkles, MapPin, Clock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Contact: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship Opportunity',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a static client build, trigger mailto with encoded parameters & show success
    const subjectEncoded = encodeURIComponent(`[Portfolio Contact] ${formData.subject} - from ${formData.name}`);
    const bodyEncoded = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    // Set UI success confirmation
    setFormSubmitted(true);

    // Open user's default email client as a reliable client-side transport
    window.location.href = `mailto:${personal.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const subjectPills = [
    'Internship Opportunity',
    'AI Collaboration',
    'Web Development',
    'Say Hello'
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 mb-3">
        <Terminal className="w-3.5 h-3.5" />
        <span>SECTOR: 07 // TRANSMISSION NEXUS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Let&apos;s Build Together
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono mt-2">
            Open to engineering internships, AI research collaborations, and creative web projects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Coordinates & Social Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Direct Contact Card */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-sans">
                  Direct Email Channel
                </h3>
                <span className="text-xs font-mono text-emerald-400">
                  Primary Transmission Line
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-void-900 border border-slate-800 mb-4">
              <span className="block text-[11px] font-mono text-slate-400 mb-1">
                CONTACT EMAIL (EDITABLE PLACEHOLDER)
              </span>
              <span className="block text-sm font-mono font-bold text-slate-100 break-all">
                {personal.email}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>EMAIL COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>CLICK TO COPY EMAIL</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-xl p-5 border border-slate-800 hover:border-emerald-500/40 transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-void-850 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:scale-110 transition-transform">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-mono text-slate-400">GITHUB</span>
                <span className="block text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  @{personal.githubUsername}
                </span>
              </div>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-void-850 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-mono text-slate-400">LINKEDIN</span>
                <span className="block text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Krishna Katekhaye
                </span>
              </div>
            </a>
          </div>

          {/* Location & Timezone Details */}
          <div className="glass-panel rounded-xl p-5 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Location: {personal.location}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Timezone: Indian Standard Time (UTC+5:30)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Transmission Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Transmit a Message</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                DIRECT INBOX
              </span>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-void-900 border border-emerald-500/30 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-sans">
                  Message Prepared!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
                  Your mail client has been opened with your inquiry addressed to <span className="font-mono text-emerald-400">{personal.email}</span>. Thank you for reaching out!
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-void-850 hover:bg-void-800 text-slate-300 border border-slate-700"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Subject Selector Pills */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    TRANSMISSION PURPOSE / TOPIC:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjectPills.map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: pill })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          formData.subject === pill
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                            : 'bg-void-850 text-slate-400 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="contact-name">
                      YOUR NAME
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-2.5 rounded-xl bg-void-900 border border-slate-800 focus:border-emerald-500/60 focus:outline-none text-sm text-slate-100 placeholder-slate-600 font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="contact-email">
                      YOUR EMAIL
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-void-900 border border-slate-800 focus:border-emerald-500/60 focus:outline-none text-sm text-slate-100 placeholder-slate-600 font-sans transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="contact-message">
                    MESSAGE / PROJECT BRIEF
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, internship scope, or project details..."
                    className="w-full px-4 py-2.5 rounded-xl bg-void-900 border border-slate-800 focus:border-emerald-500/60 focus:outline-none text-sm text-slate-100 placeholder-slate-600 font-sans transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-void-950 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT INQUIRY VIA MAIL</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
