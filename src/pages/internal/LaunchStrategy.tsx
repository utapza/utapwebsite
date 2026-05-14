import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  intro, phases, vendorTargets, vendorScript, foundingStudent,
  channels, emailSequence, launchDaySchedule, metrics, keyMessage, teamNote,
} from './launchStrategyData';

const PASS = 'utap-nmu-2026';
const KEY = 'utap_internal_auth';

/* ── tiny design primitives ── */
function Badge({ color, children }: { color: 'red'|'orange'|'yellow'|'green'|'blue'; children: React.ReactNode }) {
  const c = { red:'bg-red-500/15 text-red-300 border-red-500/20', orange:'bg-orange-500/15 text-orange-300 border-orange-500/20', yellow:'bg-yellow-500/15 text-yellow-300 border-yellow-500/20', green:'bg-green-500/15 text-green-300 border-green-500/20', blue:'bg-blue-500/15 text-blue-300 border-blue-500/20' };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c[color]}`}>{children}</span>;
}
function Card({ children, className='' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/[0.03] border border-white/8 rounded-2xl p-5 md:p-6 ${className}`}>{children}</div>;
}
function SectionTitle({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{emoji}</span>
      <h2 className="text-white text-2xl font-bold">{title}</h2>
    </div>
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

/* ── gate ── */
function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [v, setV] = useState('');
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  function attempt(e: React.FormEvent) {
    e.preventDefault();
    if (v.trim() === PASS) { localStorage.setItem(KEY,'1'); onUnlock(); }
    else { setErr(true); setShake(true); setV(''); setTimeout(()=>setShake(false),600); }
  }
  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center px-4">
      <div className={`w-full max-w-sm ${shake ? 'animate-[shake_0.5s_ease]' : ''}`}>
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600/10 border border-brand-500/20 mb-4">
            <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
          </div>
          <h1 className="text-white text-xl font-semibold">uTap Internal</h1>
          <p className="text-slate-400 text-sm mt-1">NMU Launch Strategy — Team only</p>
        </div>
        <form onSubmit={attempt} className="space-y-3">
          <input type="password" autoFocus placeholder="Passphrase" value={v} onChange={e=>{setV(e.target.value);setErr(false);}}
            className={`w-full bg-white/5 border ${err?'border-red-500/60':'border-white/10'} text-white placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition`}/>
          {err && <p className="text-red-400 text-xs">Incorrect passphrase.</p>}
          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl py-3 text-sm transition">Unlock</button>
        </form>
        <p className="text-slate-600 text-xs text-center mt-6">Confidential · Not indexed by search engines</p>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

/* ── phase status icon ── */
function PhaseIcon({ status }: { status: 'done'|'active'|'upcoming' }) {
  if (status==='done') return <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></span>;
  if (status==='active') return <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"/></span>;
  return <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-white/20"/></span>;
}

/* ── main content ── */
function Content({ onLock }: { onLock: () => void }) {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <Helmet>
        <title>NMU Launch Strategy · uTap Internal</title>
        <meta name="robots" content="noindex,nofollow"/>
      </Helmet>

      {/* topbar */}
      <div className="sticky top-0 z-10 bg-[#0a0c10]/90 backdrop-blur-sm border-b border-white/8 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">uTap Internal</span>
            <Badge color="orange">Confidential · Proposal for discussion</Badge>
          </div>
          <button onClick={onLock} className="text-slate-500 hover:text-slate-300 text-xs transition">Lock</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-0">

        {/* hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-600/10 border border-brand-500/20 rounded-full px-3 py-1 text-brand-300 text-xs font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"/>
            Proposal — for team discussion
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">NMU Launch Strategy</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-6">A full plan for how uTap gets its first 500 students and 5 vendors at Nelson Mandela University. Written for team alignment — not final until we discuss it together.</p>
          <div className="flex flex-wrap gap-3">
            <Badge color="blue">Phase: Pre-launch → Full campus launch</Badge>
            <Badge color="yellow">Goal: 500 installs in 60 days</Badge>
            <Badge color="green">First campus: NMU</Badge>
          </div>
        </div>

        <Divider/>

        {/* WHAT IS A LAUNCH STRATEGY */}
        <section className="mb-14">
          <SectionTitle emoji="📌" title={intro.whatIs.heading}/>
          <div className="space-y-4 mt-4">
            {intro.whatIs.body.map((p,i)=><Prose key={i}>{p}</Prose>)}
          </div>
          <div className="mt-6">
            <Callout type="key">This document is a proposal, not a final plan. Read it before our discussion. Come with questions, additions, and disagreements. We build the final version together.</Callout>
          </div>
        </section>

        <Divider/>

        {/* WHY NMU */}
        <section className="mb-14">
          <SectionTitle emoji="🎯" title={intro.whyNow.heading}/>
          <div className="space-y-4 mt-4">
            {intro.whyNow.body.map((p,i)=><Prose key={i}>{p}</Prose>)}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { num:'500+', label:'Student installs', sub:'Target within 60 days of launch' },
              { num:'5+', label:'Live campus vendors', sub:'On uShop before we open to students' },
              { num:'1,000+', label:'Orders processed', sub:'The case study number that unlocks Campus #2' },
            ].map(m=>(
              <Card key={m.num} className="text-center">
                <div className="text-4xl font-extrabold text-brand-400 mb-1">{m.num}</div>
                <div className="text-white text-sm font-semibold">{m.label}</div>
                <div className="text-slate-400 text-xs mt-1">{m.sub}</div>
              </Card>
            ))}
          </div>
        </section>

        <Divider/>

        {/* 5-PHASE PLAN */}
        <section className="mb-14">
          <SectionTitle emoji="🗺️" title="The 5-Phase Launch Plan"/>
          <Prose>We structure the launch in phases rather than doing everything at once. Each phase has a specific purpose and a specific exit condition — a thing that must be true before we move to the next phase. This prevents us from burning our best opportunities before we are ready.</Prose>
          <div className="space-y-5 mt-8">
            {phases.map(p=>(
              <Card key={p.number} className={p.status==='active' ? 'border-brand-500/25' : ''}>
                <div className="flex gap-4">
                  <PhaseIcon status={p.status}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs text-slate-500 font-medium">Phase {p.number}</span>
                      <span className="text-white font-bold text-lg">{p.title}</span>
                      {p.status==='done' && <Badge color="green">Complete ✓</Badge>}
                      {p.status==='active' && <Badge color="blue">In progress</Badge>}
                      <span className="text-xs text-slate-500 ml-auto">{p.timeframe}</span>
                    </div>
                    <div className="mb-3">
                      <SubTitle>Why this phase matters</SubTitle>
                      <Prose>{p.why}</Prose>
                    </div>
                    <div className="mb-3">
                      <SubTitle>What we do</SubTitle>
                      <ul className="space-y-1.5 mt-1">
                        {p.what.map((w,i)=>(
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="text-brand-400 mt-0.5 flex-shrink-0">→</span>{w}
                          </li>
                        ))}
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
        </section>

        <Divider/>

        {/* VENDOR SEEDING */}
        <section className="mb-14">
          <SectionTitle emoji="🏪" title="Vendor Seeding — The Most Important Phase"/>
          <Prose>Vendor seeding is Phase 2 and it is the phase most teams skip. It is also the reason most marketplace apps fail at launch. The logic is simple: if a student opens uTap and there is nothing to order, they close the app and never return. We must have real vendors live and tested before we invite a single student.</Prose>
          <div className="mt-6 mb-6">
            <SubTitle>The in-person pitch — use this word for word</SubTitle>
            <Card className="border-brand-500/20 mt-3">
              <blockquote className="text-slate-100 text-base italic leading-relaxed border-l-2 border-brand-400 pl-4 mb-4">
                {vendorScript.script}
              </blockquote>
              <Prose>{vendorScript.whyItWorks}</Prose>
            </Card>
          </div>
          <SubTitle>The 5 vendor slots we need to fill</SubTitle>
          <div className="space-y-3 mt-3">
            {vendorTargets.map(v=>(
              <Card key={v.slot} className="flex items-start gap-4">
                <Badge color={v.priority==='Critical'?'red':v.priority==='High'?'orange':'yellow'}>{v.priority}</Badge>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">{v.slot}</div>
                  <Prose>{v.desc}</Prose>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-5"><Callout type="warning">We do not announce to students until all 5 vendor slots are filled and each vendor has successfully processed at least one test order. No exceptions.</Callout></div>
        </section>

        <Divider/>

        {/* FOUNDING STUDENT */}
        <section className="mb-14">
          <SectionTitle emoji="🏅" title={foundingStudent.heading}/>
          <Prose>{foundingStudent.explanation}</Prose>
          <Card className="border-brand-500/20 bg-brand-500/5 mt-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">🎖️</span>
              <div>
                <SubTitle>How it works</SubTitle>
                <ul className="space-y-1.5 mt-2">
                  {foundingStudent.mechanics.map((m,i)=>(
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="text-brand-400 mt-0.5 flex-shrink-0">→</span>{m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/8">
              <Badge color="green">Cost: R0</Badge>
              <Badge color="blue">Requires: one dev flag tracking first 500 sign-ups</Badge>
            </div>
          </Card>
          <div className="mt-4"><Callout type="insight">{foundingStudent.insight}</Callout></div>
        </section>

        <Divider/>

        {/* ORB CHANNELS */}
        <section className="mb-14">
          <SectionTitle emoji="📡" title="Our Channel Strategy — Owned, Rented, Borrowed"/>
          <Prose>{channels.explanation}</Prose>
          <div className="space-y-6 mt-8">
            {/* Owned */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400"/>
                <span className="text-green-300 font-semibold">{channels.owned.name}</span>
              </div>
              <Prose>{channels.owned.explanation}</Prose>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {channels.owned.items.map(item=>(
                  <Card key={item.name}>
                    <SubTitle>{item.name}</SubTitle>
                    <Prose>{item.detail}</Prose>
                  </Card>
                ))}
              </div>
            </div>
            {/* Rented */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-400"/>
                <span className="text-blue-300 font-semibold">{channels.rented.name}</span>
              </div>
              <Prose>{channels.rented.explanation}</Prose>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {channels.rented.items.map(item=>(
                  <Card key={item.name}>
                    <SubTitle>{item.name}</SubTitle>
                    <Prose>{item.detail}</Prose>
                  </Card>
                ))}
              </div>
            </div>
            {/* Borrowed */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-purple-400"/>
                <span className="text-purple-300 font-semibold">{channels.borrowed.name}</span>
              </div>
              <Prose>{channels.borrowed.explanation}</Prose>
              <div className="space-y-3 mt-4">
                {channels.borrowed.items.map(item=>(
                  <Card key={item.name} className="flex gap-4">
                    <Badge color={item.priority==='Critical'?'red':item.priority==='High'?'orange':'yellow'}>{item.priority}</Badge>
                    <div>
                      <SubTitle>{item.name}</SubTitle>
                      <Prose>{item.detail}</Prose>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider/>

        {/* EMAIL SEQUENCE */}
        <section className="mb-14">
          <SectionTitle emoji="📨" title="The Email Nurture Sequence"/>
          <div className="space-y-3 mb-6">
            <Prose>{emailSequence.explanation}</Prose>
            <Callout type="insight">{emailSequence.why}</Callout>
          </div>
          <div className="space-y-3">
            {emailSequence.emails.map((e,i)=>(
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
        </section>

        <Divider/>

        {/* LAUNCH DAY */}
        <section className="mb-14">
          <SectionTitle emoji="🚀" title="Launch Day — Hour by Hour"/>
          <Prose>Launch day is an all-day event. The order of actions is deliberate — we build visibility in layers, starting with owned channels and growing outward. The most important thing on launch day is not posting the right content. It is responding to every single person who engages, personally, the same day.</Prose>
          <Card className="mt-6 divide-y divide-white/5">
            {launchDaySchedule.map(item=>(
              <div key={item.time} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                <div className="flex-shrink-0 w-14">
                  <span className="text-xs text-brand-400 font-mono font-semibold">{item.time}</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-1">{item.action}</div>
                  <Prose>{item.detail}</Prose>
                </div>
              </div>
            ))}
          </Card>
        </section>

        <Divider/>

        {/* METRICS */}
        <section className="mb-14">
          <SectionTitle emoji="📊" title="How We Know It's Working"/>
          <Prose>These targets are not arbitrary. Each one was chosen because it represents something specific about whether the product is providing real value, not just downloads.</Prose>
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 font-medium uppercase tracking-wider px-1">
              <span className="col-span-1">Metric</span>
              <span className="text-center">Week 1</span>
              <span className="text-center">Week 4</span>
              <span className="text-center text-brand-400">Week 8 🎯</span>
            </div>
            {metrics.map(m=>(
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
        </section>

        <Divider/>

        {/* KEY MESSAGE */}
        <section className="mb-14">
          <SectionTitle emoji="🔑" title={keyMessage.heading}/>
          <Prose>{keyMessage.explanation}</Prose>
          <Card className="border-yellow-500/25 bg-yellow-500/5 mt-6 mb-4">
            <div className="text-yellow-200 text-xl font-bold mb-3">{keyMessage.lead}</div>
            <ul className="space-y-2">
              {keyMessage.reasoning.map((r,i)=>(
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
                <Prose>Lead with the card. <em>"Your student card lives on your phone now."</em> The food ordering is the second sentence, not the first.</Prose>
              </div>
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">Talking to vendors?</div>
                <Prose>Lead with the commission. <em>"We charge zero commission. You keep ~R97 on every R100 order."</em> The card story is irrelevant to them.</Prose>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <Callout type="warning">{keyMessage.rule}</Callout>
            </div>
          </Card>
        </section>

        <Divider/>

        {/* TEAM NOTE */}
        <section className="mb-14">
          <SectionTitle emoji="👥" title={teamNote.heading}/>
          <Prose>{teamNote.body}</Prose>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Card>
              <SubTitle>Questions to answer in our discussion</SubTitle>
              <ul className="space-y-1.5 mt-2">
                {['Which 5 vendors do we approach first — and who owns those relationships?','Who is responsible for the SRC relationship?','Who is printing and putting up the physical posters?','What is our realistic launch date given the vendor seeding timeline?','Who writes the press release and sends it to tech media?','Who monitors and responds to social on launch day?'].map((q,i)=>(
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-slate-500 flex-shrink-0">·</span>{q}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <SubTitle>What is already decided</SubTitle>
              <ul className="space-y-1.5 mt-2">
                {['The product is built and internally tested','NMU is the first campus','The passphrase for this page is utap-nmu-2026','We do not launch to students before vendors are live','The Founding Student badge costs nothing to implement','The blog post announcing the launch is written and waiting — we publish it on launch day'].map((d,i)=>(
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>{d}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        <div className="text-center text-slate-600 text-xs pb-8">
          uTap Internal · NMU Launch Strategy · May 2026 · Not for external distribution
          <br/>
          <button onClick={onLock} className="text-slate-700 hover:text-slate-500 mt-2 underline transition">Lock this page</button>
        </div>
      </div>
    </div>
  );
}

export default function LaunchStrategy() {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(()=>{ if(localStorage.getItem(KEY)==='1') setUnlocked(true); },[]);
  function lock(){ localStorage.removeItem(KEY); setUnlocked(false); }
  return unlocked ? <Content onLock={lock}/> : <Gate onUnlock={()=>setUnlocked(true)}/>;
}
