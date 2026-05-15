import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  intro,
  appStoreStatus,
  phases,
  vendorTrustStrategy,
  vendorTargets,
  vendorScript,
  foundingStudent,
  remoteSupport,
  channels,
  launchDaySchedule,
  emailSequence,
  metrics,
  keyMessage,
  teamNote,
  coordinationTimeline,
  materialsChecklist,
} from './launchStrategyData';

const PASS = 'utap-nmu-2026';
const KEY = 'utap_internal_auth';

function Badge({ color, children }: { color: 'red'|'orange'|'yellow'|'green'|'blue'|'purple'|'slate'; children: React.ReactNode }) {
  const c = {
    red: 'bg-red-500/15 text-red-300 border-red-500/20',
    orange: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
    yellow: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20',
    green: 'bg-green-500/15 text-green-300 border-green-500/20',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
    slate: 'bg-slate-500/15 text-slate-300 border-slate-500/20',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c[color]}`}>{children}</span>;
}
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/[0.03] border border-white/8 rounded-2xl p-5 md:p-6 ${className}`}>{children}</div>;
}
function SectionTitle({ emoji, title, isOpen, onToggle }: { emoji: string; title: string; isOpen?: boolean; onToggle?: () => void }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 mb-2 ${onToggle ? 'cursor-pointer select-none group' : ''}`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <h2 className={`text-white text-2xl font-bold transition ${onToggle ? 'group-hover:text-brand-400' : ''}`}>{title}</h2>
      </div>
      {onToggle && (
        <div className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
}

function CollapsibleSection({ emoji, title, children, defaultOpen = false, forceOpenCount = 0 }: { emoji: string; title: string; children: React.ReactNode; defaultOpen?: boolean; forceOpenCount?: number }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (forceOpenCount > 0) setIsOpen(true);
    else if (forceOpenCount < 0) setIsOpen(false);
  }, [forceOpenCount]);

  return (
    <section className="mb-14">
      <SectionTitle emoji={emoji} title={title} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
        {children}
      </div>
    </section>
  );
}
function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-white font-semibold text-base mb-2">{children}</h3>;
}
function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-300 text-sm leading-relaxed">{children}</p>;
}
function Callout({ type, children }: { type: 'warning'|'insight'|'key'; children: React.ReactNode }) {
  const styles = {
    warning: 'border-red-500/30 bg-red-500/5 text-red-200',
    insight: 'border-brand-500/30 bg-brand-500/5 text-brand-200',
    key: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-100',
  };
  const icons = { warning: '⚠️', insight: '💡', key: '🔑' };
  return (
    <div className={`border rounded-xl p-4 flex gap-3 text-sm leading-relaxed ${styles[type]}`}>
      <span className="flex-shrink-0 text-base">{icons[type]}</span>
      <span>{children}</span>
    </div>
  );
}
function Divider() { return <div className="border-t border-white/8 my-12" />; }
function CheckItem({ children, done = false }: { children: React.ReactNode; done?: boolean }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-300">
      <span className={`flex-shrink-0 mt-0.5 ${done ? 'text-green-400' : 'text-slate-600'}`}>{done ? '✓' : '☐'}</span>
      {children}
    </li>
  );
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [v, setV] = useState('');
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  function attempt(e: React.FormEvent) {
    e.preventDefault();
    if (v.trim() === PASS) { localStorage.setItem(KEY, '1'); onUnlock(); }
    else { setErr(true); setShake(true); setV(''); setTimeout(() => setShake(false), 600); }
  }
  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center px-4">
      <div className={`w-full max-w-sm ${shake ? 'animate-[shake_0.5s_ease]' : ''}`}>
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600/10 border border-brand-500/20 mb-4">
            <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          </div>
          <h1 className="text-white text-xl font-semibold">uTap Internal</h1>
          <p className="text-slate-400 text-sm mt-1">NMU Alpha Launch Strategy — Team only</p>
        </div>
        <form onSubmit={attempt} className="space-y-3">
          <input type="password" autoFocus placeholder="Passphrase" value={v} onChange={e => { setV(e.target.value); setErr(false); }}
            className={`w-full bg-white/5 border ${err ? 'border-red-500/60' : 'border-white/10'} text-white placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition`} />
          {err && <p className="text-red-400 text-xs">Incorrect passphrase.</p>}
          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl py-3 text-sm transition">Unlock</button>
        </form>
        <p className="text-slate-600 text-xs text-center mt-6">Confidential · Not indexed by search engines</p>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

function PhaseIcon({ status }: { status: 'done'|'active'|'upcoming' }) {
  if (status === 'done') return <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>;
  if (status === 'active') return <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" /></span>;
  return <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-white/20" /></span>;
}

function Content({ onLock }: { onLock: () => void }) {
  const [forceOpenCount, setForceOpenCount] = useState(0);

  const expandAll = () => setForceOpenCount(prev => (prev >= 0 ? prev + 1 : 1));
  const collapseAll = () => setForceOpenCount(prev => (prev <= 0 ? prev - 1 : -1));

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <Helmet>
        <title>NMU Alpha Launch Strategy · uTap Internal</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* topbar */}
      <div className="sticky top-0 z-10 bg-[#0a0c10]/90 backdrop-blur-sm border-b border-white/8 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">uTap Internal</span>
            <Badge color="orange">Confidential · Team only</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
              <button onClick={expandAll} className="text-slate-400 hover:text-white text-xs transition">Expand all</button>
              <span className="text-slate-700">·</span>
              <button onClick={collapseAll} className="text-slate-400 hover:text-white text-xs transition">Collapse all</button>
            </div>
            <button onClick={onLock} className="text-slate-500 hover:text-slate-300 text-xs transition">Lock</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-600/10 border border-brand-500/20 rounded-full px-3 py-1 text-brand-300 text-xs font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Alpha — Closed & Controlled
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">NMU Alpha Launch Plan</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-6">
            We're here to break things and fix them before everyone else sees them. 100 students, 10 vendors, and a few days in PE to prove we can handle the money and the volume.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge color="blue">Phase: Alpha (Closed)</Badge>
            <Badge color="yellow">Vendors: 5–10 founding collaborators</Badge>
            <Badge color="green">Students: 100 alpha testers</Badge>
            <Badge color="purple">Post-trip: 4–6 week remote pilot</Badge>
          </div>
        </div>

        <Divider />

        {/* FRAMING */}
        <CollapsibleSection emoji="📌" title={intro.whatIs.heading} defaultOpen forceOpenCount={forceOpenCount}>
          <div className="space-y-4">
            {intro.whatIs.body.map((p, i) => <Prose key={i}>{p}</Prose>)}
          </div>
        </CollapsibleSection>

        <Divider />

        {/* WHY NMU */}
        <CollapsibleSection emoji="🎯" title={intro.whyNow.heading} defaultOpen forceOpenCount={forceOpenCount}>
          <div className="space-y-4">
            {intro.whyNow.body.map((p, i) => <Prose key={i}>{p}</Prose>)}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { num: '5–10', label: 'Founding Vendor Collaborators', sub: 'Commission waived 6 months' },
              { num: '100', label: 'Alpha student testers', sub: 'Cap — quality over volume' },
              { num: '4–6 wks', label: 'Remote pilot after PE trip', sub: 'Retention is the real metric' },
            ].map(m => (
              <Card key={m.num} className="text-center">
                <div className="text-4xl font-extrabold text-brand-400 mb-1">{m.num}</div>
                <div className="text-white text-sm font-semibold">{m.label}</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider mt-1">{m.sub}</div>
              </Card>
            ))}
          </div>
        </CollapsibleSection>

        <Divider />

        {/* APP STORE STATUS */}
        <CollapsibleSection emoji="📱" title={appStoreStatus.heading} forceOpenCount={forceOpenCount}>
          <div className="space-y-4">
            {appStoreStatus.status.map(s => (
              <Card key={s.platform} className={s.platform === 'Android (Google)' ? 'border-red-500/25' : 'border-green-500/20'}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <SubTitle>{s.platform}</SubTitle>
                  <Badge color={s.platform === 'Android (Google)' ? 'red' : 'green'}>{s.priority}</Badge>
                </div>
                <div className="space-y-2">
                  <Prose><strong className="text-slate-200">Current state:</strong> {s.state}</Prose>
                  <Prose><strong className="text-slate-200">Alpha distribution path:</strong> {s.alphaPath}</Prose>
                  <Prose><strong className="text-slate-200">Action needed:</strong> {s.action}</Prose>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4"><Callout type="warning">{appStoreStatus.note}</Callout></div>
        </CollapsibleSection>

        <Divider />

        {/* MATERIALS CHECKLIST */}
        <CollapsibleSection emoji="🎒" title="Mission-Critical Materials — Ready for Departure" forceOpenCount={forceOpenCount}>
          <Prose>A pilot is as good as the tools we carry. If we arrive on campus and can't show them something physical, we're just strangers with an app. If our digital groups aren't ready, the feedback loop dies.</Prose>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* PHYSICAL MATERIALS */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="font-semibold text-orange-300">Physical Pack</span>
              </div>
              <div className="space-y-4">
                {materialsChecklist.physical.map((m, i) => (
                  <Card key={i} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white font-medium text-sm">{m.item}</span>
                      <Badge color="orange">Min: {m.min}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{m.why}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* DIGITAL MATERIALS */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="font-semibold text-blue-300">Digital Assets</span>
              </div>
              <div className="space-y-4">
                {materialsChecklist.digital.map((m, i) => (
                  <Card key={i} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white font-medium text-sm">{m.item}</span>
                      <Badge color={m.status === 'Ready' || m.status === 'Active' || m.status === 'Live' ? 'green' : 'yellow'}>{m.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed"><span className="text-slate-500 uppercase text-[10px] tracking-wider font-bold mr-1">Action:</span> {m.action}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6"><Callout type="insight">Physical materials like certificates aren't just for show — they create a formal anchor for vendors who don't yet know if they can trust us with their money.</Callout></div>
        </CollapsibleSection>

        <Divider />

        {/* PHASES */}
        <CollapsibleSection emoji="🗺️" title="The Alpha Roadmap — Stage by Stage" forceOpenCount={forceOpenCount}>
          <Prose>Stages have exit conditions. Basically: what needs to be true before we move on? This stops us from burning our best shots before the app is ready.</Prose>
          <div className="space-y-5 mt-8">
            {phases.map(p => (
              <Card key={p.number} className={p.status === 'active' ? 'border-brand-500/25' : ''}>
                <div className="flex gap-4">
                  <PhaseIcon status={p.status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs text-slate-500 font-medium">Stage {p.number}</span>
                      <span className="text-white font-bold text-lg">{p.title}</span>
                      {p.status === 'done' && <Badge color="green">Complete ✓</Badge>}
                      {p.status === 'active' && <Badge color="blue">In progress</Badge>}
                      <span className="text-xs text-slate-500 ml-auto">{p.timeframe}</span>
                    </div>
                    <div className="mb-4">
                      <SubTitle>Why this matters</SubTitle>
                      <Prose>{p.why}</Prose>
                    </div>
                    <div className="mb-4">
                      <SubTitle>Checklist</SubTitle>
                      <ul className="space-y-1.5 mt-2">
                        {p.checklist.map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
                      </ul>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Exit condition: </span>
                      <span className="text-sm text-slate-200">{p.outcome}</span>
                    </div>
                    {p.warning && <div className="mt-4"><Callout type="warning">{p.warning}</Callout></div>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CollapsibleSection>

        <Divider />

        {/* VENDOR TRUST STRATEGY */}
        <CollapsibleSection emoji="🤝" title={vendorTrustStrategy.heading} forceOpenCount={forceOpenCount}>
          <Prose>{vendorTrustStrategy.rootCause}</Prose>
          <div className="space-y-4 mt-6">
            {vendorTrustStrategy.fears.map(f => (
              <Card key={f.fear} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Their fear</div>
                  <Prose>{f.fear}</Prose>
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-2">Our response</div>
                  <Prose>{f.response}</Prose>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <SubTitle>Founding Collaborator perks</SubTitle>
            <ul className="space-y-1.5 mt-2">
              {vendorTrustStrategy.foundingCollaboratorPerks.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-brand-400 mt-0.5 flex-shrink-0">→</span>{p}
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleSection>

        <Divider />

        {/* VENDOR SCRIPT */}
        <CollapsibleSection emoji="🏪" title="Vendor Seeding — The Pitch & The Slots" forceOpenCount={forceOpenCount}>
          <Prose>Vendor seeding must happen before a single student is invited. If a student opens uTap and there is nothing to order, they close the app and never return.</Prose>
          <Card className="border-brand-500/20 mt-6 mb-6">
            <SubTitle>{vendorScript.heading}</SubTitle>
            <blockquote className="text-slate-100 text-base italic leading-relaxed border-l-2 border-brand-400 pl-4 mb-4 mt-3">
              {vendorScript.script}
            </blockquote>
            <Prose>{vendorScript.whyItWorks}</Prose>
            <div className="mt-4"><Callout type="warning">{vendorScript.doNotSay}</Callout></div>
          </Card>
          <SubTitle>The 5 vendor slots to fill</SubTitle>
          <div className="space-y-3 mt-3">
            {vendorTargets.map(v => (
              <Card key={v.slot} className="flex items-start gap-4">
                <Badge color={v.priority === 'Critical' ? 'red' : v.priority === 'High' ? 'orange' : 'yellow'}>{v.priority}</Badge>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">{v.slot}</div>
                  <Prose>{v.desc}</Prose>
                </div>
              </Card>
            ))}
          </div>
        </CollapsibleSection>

        <Divider />

        {/* REMOTE SUPPORT */}
        <CollapsibleSection emoji="📡" title={remoteSupport.heading} forceOpenCount={forceOpenCount}>
          <Prose>{remoteSupport.explanation}</Prose>
          <div className="mt-4 mb-6">
            <Callout type="key">{remoteSupport.owner}</Callout>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <SubTitle>Vendor support (remote)</SubTitle>
              <ul className="space-y-2 mt-2">
                {remoteSupport.vendorSupport.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-brand-400 mt-0.5 flex-shrink-0">→</span>{item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <SubTitle>Student support (remote)</SubTitle>
              <ul className="space-y-2 mt-2">
                {remoteSupport.studentSupport.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-brand-400 mt-0.5 flex-shrink-0">→</span>{item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <div className="mt-4"><Callout type="insight">{remoteSupport.escalation}</Callout></div>
        </CollapsibleSection>

        <Divider />

        {/* FOUNDING STUDENT */}
        <CollapsibleSection emoji="🏅" title={foundingStudent.heading} forceOpenCount={forceOpenCount}>
          <Prose>{foundingStudent.explanation}</Prose>
          <Card className="border-brand-500/20 bg-brand-500/5 mt-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">🎖️</span>
              <div>
                <SubTitle>How it works</SubTitle>
                <ul className="space-y-1.5 mt-2">
                  {foundingStudent.mechanics.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="text-brand-400 mt-0.5 flex-shrink-0">→</span>{m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/8">
              <Badge color="green">Cost: R0</Badge>
              <Badge color="blue">Requires: one dev flag for first 500 sign-ups</Badge>
            </div>
          </Card>
          <div className="mt-4"><Callout type="insight">{foundingStudent.insight}</Callout></div>
        </CollapsibleSection>

        <Divider />

        {/* CHANNELS */}
        <CollapsibleSection emoji="📻" title="Channel Strategy — Owned, Rented, Borrowed" forceOpenCount={forceOpenCount}>
          <Prose>{channels.explanation}</Prose>
          <div className="space-y-6 mt-8">
            {[
              { data: channels.owned, color: 'text-green-300', dot: 'bg-green-400' },
              { data: channels.rented, color: 'text-blue-300', dot: 'bg-blue-400' },
              { data: channels.borrowed, color: 'text-purple-300', dot: 'bg-purple-400' },
            ].map(({ data, color, dot }) => (
              <div key={data.name}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className={`font-semibold ${color}`}>{data.name}</span>
                </div>
                <Prose>{data.explanation}</Prose>
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {data.items.map((item: any) => (
                    <Card key={item.name} className="flex gap-3">
                      {item.priority && (
                        <Badge color={item.priority === 'Critical' ? 'red' : item.priority === 'High' ? 'orange' : 'yellow'}>
                          {item.priority}
                        </Badge>
                      )}
                      <div>
                        <div className="text-white font-semibold text-sm mb-1">{item.name}</div>
                        <Prose>{item.detail}</Prose>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <Divider />

        {/* PE SCHEDULE */}
        <CollapsibleSection emoji="🗓️" title="PE Trip — Day by Day" forceOpenCount={forceOpenCount}>
          <Prose>The PE trip is 4 to 5 days. The order matters — vendor onboarding before student recruitment, every time.</Prose>
          <Card className="mt-6 divide-y divide-white/5">
            {launchDaySchedule.map(item => (
              <div key={item.time} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                <div className="flex-shrink-0 w-32">
                  <span className="text-xs text-brand-400 font-mono font-semibold">{item.time}</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-1">{item.action}</div>
                  <Prose>{item.detail}</Prose>
                </div>
              </div>
            ))}
          </Card>
        </CollapsibleSection>

        <Divider />

        {/* EMAIL SEQUENCE */}
        <CollapsibleSection emoji="📨" title="Email Nurture Sequence — Activates at Beta" forceOpenCount={forceOpenCount}>
          <div className="space-y-3 mb-6">
            <Prose>{emailSequence.explanation}</Prose>
            <Callout type="insight">{emailSequence.why}</Callout>
          </div>
          <div className="space-y-3">
            {emailSequence.emails.map((e, i) => (
              <Card key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-20 pt-0.5">
                  <div className="text-xs text-brand-400 font-mono font-medium">{e.day}</div>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-1.5">"{e.subject}"</div>
                  <Prose>{e.purpose}</Prose>
                </div>
              </Card>
            ))}
          </div>
        </CollapsibleSection>

        <Divider />

        {/* METRICS */}
        <CollapsibleSection emoji="📊" title="How We Know It's Working" forceOpenCount={forceOpenCount}>
          <Prose>Retention is the metric — not installs. A vendor who stops trading after Week 1 is a failed Alpha, regardless of how many students downloaded the app.</Prose>
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 font-medium uppercase tracking-wider px-1">
              <span className="col-span-1">Metric</span>
              <span className="text-center">Week 1</span>
              <span className="text-center">Week 4</span>
              <span className="text-center text-brand-400">Week 8 🎯</span>
            </div>
            {metrics.map(m => (
              <Card key={m.name}>
                <div className="grid grid-cols-4 gap-2 items-center mb-3">
                  <span className="text-white text-sm font-medium col-span-1">{m.name}</span>
                  <span className="text-slate-400 text-sm text-center">{m.w1}</span>
                  <span className="text-slate-400 text-sm text-center">{m.w4}</span>
                  <span className="text-brand-300 text-sm font-semibold text-center">{m.w8}</span>
                </div>
                <Prose>{m.why}</Prose>
              </Card>
            ))}
          </div>
        </CollapsibleSection>


        {/* KEY MESSAGE */}
        <CollapsibleSection emoji="🔑" title={keyMessage.heading} forceOpenCount={forceOpenCount}>
          <Prose>{keyMessage.explanation}</Prose>
          <Card className="border-yellow-500/25 bg-yellow-500/5 mt-6 mb-4">
            <div className="text-yellow-200 text-xl font-bold mb-3">{keyMessage.lead}</div>
            <ul className="space-y-2">
              {keyMessage.reasoning.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-yellow-100/80">
                  <span className="text-yellow-400 flex-shrink-0 mt-0.5">→</span>{r}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="border-brand-500/20 bg-brand-500/5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-2">Talking to students?</div>
                <Prose>Lead with the benefit. <em>"Order lunch before class ends, pick it up without the queue."</em></Prose>
              </div>
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">Talking to vendors?</div>
                <Prose>Lead with the commission waiver. <em>"Keep 100% of your earnings for the first 6 months."</em></Prose>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <Callout type="warning">{keyMessage.rule}</Callout>
            </div>
          </Card>
        </CollapsibleSection>

        <Divider />

        {/* TEAM NOTE */}
        <CollapsibleSection emoji="👥" title={teamNote.heading} forceOpenCount={forceOpenCount}>
          <Prose>{teamNote.body}</Prose>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Card>
              <SubTitle>Open — needs owner assigned</SubTitle>
              <ul className="space-y-3 mt-2">
                {teamNote.openQuestions.map((item, i) => (
                  <li key={i} className="text-sm">
                    <div className="text-slate-300 mb-0.5">{item.q}</div>
                    <div className="text-xs">
                      <span className="text-slate-500">Owner: </span>
                      <span className={item.owner === 'TBD' ? 'text-red-400 font-semibold' : 'text-brand-400 font-semibold'}>{item.owner}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <SubTitle>Already decided</SubTitle>
              <ul className="space-y-1.5 mt-2">
                {teamNote.decided.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>{d}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </CollapsibleSection>

        <Divider />

        {/* COORDINATION TIMELINE */}
        <CollapsibleSection emoji="⏳" title="Master Coordination Timeline" defaultOpen forceOpenCount={forceOpenCount}>
          <Prose>This is how we move in coordination. Vendors first to build the shelf, then students to buy from it. If these fall out of sync, the Alpha fails.</Prose>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/5">Period</th>
                  <th className="py-4 px-3 text-xs font-semibold text-brand-400 uppercase tracking-wider w-1/3">Vendor Track</th>
                  <th className="py-4 px-3 text-xs font-semibold text-blue-400 uppercase tracking-wider w-1/3">Student Track</th>
                  <th className="py-4 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Goal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coordinationTimeline.map((item, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition">
                    <td className="py-5 px-3">
                      <div className="text-white font-bold text-sm">{item.period.split(':')[0]}</div>
                      <div className="text-slate-500 text-[10px] uppercase tracking-wider">{item.period.split(':')[1]}</div>
                    </td>
                    <td className="py-5 px-3">
                      <div className="text-slate-200 text-sm leading-relaxed">{item.vendor}</div>
                    </td>
                    <td className="py-5 px-3">
                      <div className="text-slate-200 text-sm leading-relaxed">{item.student}</div>
                    </td>
                    <td className="py-5 px-3">
                      <Badge color={i === 5 ? 'purple' : 'slate'}>{item.focus}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Callout type="insight">Notice the Day 3 overlap: shadowing vendors during the first rush *after* the first students joined the day before. This is the moment of truth.</Callout>
          </div>
        </CollapsibleSection>

        <div className="text-center text-slate-600 text-xs pb-8">
          uTap Internal · NMU Alpha Launch Strategy · May 2026 · Not for external distribution
          <br />
          <button onClick={onLock} className="text-slate-700 hover:text-slate-500 mt-2 underline transition">Lock this page</button>
        </div>
      </div>
    </div>
  );
}

export default function LaunchStrategy() {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => { if (localStorage.getItem(KEY) === '1') setUnlocked(true); }, []);
  function lock() { localStorage.removeItem(KEY); setUnlocked(false); }
  return unlocked ? <Content onLock={lock} /> : <Gate onUnlock={() => setUnlocked(true)} />;
}
