import { useEffect, useRef, useMemo, useState } from 'react'
import gsap from 'gsap'

/* ─── types ─── */
type TimelineItem = { era: string; title: string; body: string }

/* ─── data ─── */
const timeline: TimelineItem[] = [
  {
    era: 'Abad ka-14',
    title: 'Ngambah prasasti',
    body: 'Aksara Sunda kuna nyatet tapak karajaan, piagem, jeung tanda pangaweruh karuhun di Tatar Sunda.',
  },
  {
    era: 'Abad ka-16',
    title: 'Hirup dina naskah',
    body: 'Rupa-rupa carita, ajaran, jeung élmu ditulis dina daun lontar, daluang, jeung catetan para bujangga.',
  },
  {
    era: 'Kiwari',
    title: 'Hudang deui',
    body: 'Aksara Sunda baku dipaké deui di sakola, papan ngaran, karya digital, jeung gerakan budaya ngora.',
  },
]

const aksaraMap: Record<string, string> = {
  a: 'ᮃ', b: 'ᮘ', c: 'ᮎ', d: 'ᮓ', e: 'ᮈ', f: 'ᮖ', g: 'ᮌ', h: 'ᮠ', i: 'ᮄ',
  j: 'ᮏ', k: 'ᮊ', l: 'ᮜ', m: 'ᮙ', n: 'ᮔ', o: 'ᮇ', p: 'ᮕ', q: 'ᮋ', r: 'ᮛ',
  s: 'ᮞ', t: 'ᮒ', u: 'ᮅ', v: 'ᮗ', w: 'ᮝ', x: 'ᮊ᮪ᮞ', y: 'ᮚ', z: 'ᮐ',
}

const sampleGlyphs = ['ᮞ', 'ᮥ', 'ᮔ', '᮪', 'ᮓ', 'ᮃ']
const heroBigGlyphs = ['ᮃ', 'ᮊ', 'ᮞ', 'ᮛ']
const floatingData = [
  { glyph: 'ᮙ', cls: 'left-[8%] top-[18%]', delay: '0s' },
  { glyph: 'ᮛ', cls: 'right-[10%] bottom-[22%]', delay: '0.6s' },
  { glyph: 'ᮊ', cls: 'left-[12%] bottom-[14%]', delay: '1.2s' },
  { glyph: 'ᮚ', cls: 'right-[8%] top-[16%]', delay: '1.8s' },
]

function convertToSundanese(input: string) {
  return input
    .toLowerCase()
    .split('')
    .map((c) => (c === ' ' ? '  ' : (aksaraMap[c] ?? c)))
    .join('')
}

/* ─── SVG decorative components ─── */
function KujangSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 168 286" role="img" aria-label="Rarancang kujang Sunda">
      <path fill="currentColor" opacity={0.08} d="M80 8c38 24 61 59 59 94-2 44-39 61-34 96 4 28 31 37 31 37s-35 32-72 26c-26-4-43-23-45-50-3-34 25-49 27-82C49 83 16 55 16 55S47 30 80 8Z" />
      <path fill="currentColor" opacity={0.18} d="M86 7c32 20 54 50 57 80 5 49-40 67-33 105 5 27 32 42 32 42-21 24-53 37-82 29-28-8-43-31-39-58 4-32 31-45 29-77C47 83 18 55 18 55 39 31 61 15 86 7Z" />
      <path fill="#fdf8f0" opacity={0.85} d="M88 57c14 15 21 34 18 51-3 19-18 30-30 42-15 15-20 31-14 55-14-15-18-34-10-54 7-18 24-30 31-49 5-14 3-29 5-45Z" />
      <circle cx="90" cy="91" r="9" fill="#fff7e8" opacity={0.82} />
    </svg>
  )
}

function OrbitRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      <div className="orbit-ring w-[520px] h-[520px] lg:w-[700px] lg:h-[700px] rounded-full border-[1.5px] border-dashed border-indigo-300/20" />
      <div className="orbit-ring absolute w-[380px] h-[380px] lg:w-[520px] lg:h-[520px] rounded-full border border-dotted border-indigo-300/10" />
      <div className="orbit-ring absolute w-[240px] h-[240px] lg:w-[340px] lg:h-[340px] rounded-full border border-dashed border-violet-300/10" />
    </div>
  )
}

/* ─── main app ─── */
function App() {
  const [name, setName] = useState('')
  const converted = useMemo(() => convertToSundanese(name), [name])
  const cleanInput = name.trim()

  const heroRef = useRef<HTMLElement>(null)
  const historyRef = useRef<HTMLElement>(null)
  const converterRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  /* GSAP entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content stagger reveal
      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
      // Hero big glyphs pop in
      gsap.fromTo(
        '.hero-glyph',
        { opacity: 0, scale: 0.7, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.8 }
      )
      // Floating bob animation
      gsap.to('.float-glyph', {
        y: -10,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4 },
      })
      // Orbit slow spin
      gsap.to('.orbit-ring', { rotation: 360, duration: 80, repeat: -1, ease: 'none' })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* Scroll-triggered reveals */
  useEffect(() => {
    const targets = [historyRef.current, converterRef.current, ctaRef.current].filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll('.scroll-reveal'),
              { opacity: 0, y: 32 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            )
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    targets.forEach((t) => observer.observe(t!))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 sm:px-8 lg:px-12 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <a className="flex items-center gap-3 shrink-0" href="#home" aria-label="Sunda Aksa">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-indigo-500 text-white text-xl font-bold font-sunda">ᮞ</span>
          <span className="flex flex-col gap-px">
            <strong className="text-[15px] tracking-wide text-gray-900">Sunda Aksa</strong>
            <small className="text-[11px] text-gray-400 font-sunda">ᮃᮊᮞᮛ ᮞᮥᮔ᮪ᮓ</small>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi utama">
          {[
            { label: 'Imah', href: '#home' },
            { label: 'Sajarah', href: '#history' },
            { label: 'Tentang', href: '#about' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="bg-indigo-500 text-white px-5 py-2 rounded-full text-[13px] font-bold shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:bg-indigo-600 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(99,102,241,0.35)] transition shrink-0"
          href="#try"
        >
          Coba Aksara
        </a>
      </header>

      {/* ── HERO ── centered poster layout ── */}
      <section
        ref={heroRef}
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen lg:min-h-[920px] px-6 pt-28 pb-20 overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white"
      >
        {/* Background decorative orbit rings */}
        <OrbitRings />

        {/* Kujang weapon — top left */}
        <KujangSvg className="absolute left-[4%] top-[12%] w-[60px] lg:w-[80px] h-auto text-indigo-900 opacity-40 -rotate-12 pointer-events-none hidden sm:block" />

        {/* Kujang weapon — bottom right */}
        <KujangSvg className="absolute right-[6%] bottom-[10%] w-[50px] lg:w-[65px] h-auto text-indigo-900 opacity-25 rotate-[160deg] pointer-events-none hidden sm:block" />

        {/* Floating aksara glyphs */}
        {floatingData.map((item) => (
          <span
            key={item.glyph}
            className={`float-glyph absolute ${item.cls} z-[2] w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white border border-gray-200 grid place-items-center font-sunda text-lg lg:text-xl text-indigo-500 shadow-sm pointer-events-none`}
            style={{ animationDelay: item.delay }}
          >
            {item.glyph}
          </span>
        ))}

        {/* Subtle glow behind headline */}
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-indigo-100/40 blur-[80px] pointer-events-none" aria-hidden="true" />

        {/* ── Center content ── */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="hero-reveal opacity-0 inline-flex items-center gap-2 text-xs font-bold tracking-wide bg-white border border-gray-200 px-4 py-1.5 rounded-full text-gray-500 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Jelajah Aksara Sunda
          </div>

          {/* Headline */}
          <h1 className="hero-reveal opacity-0 text-5xl sm:text-6xl lg:text-[80px] font-black leading-[1.02] tracking-tight text-gray-900 mb-5">
            Aksara Sunda téh{' '}
            <em className="not-italic bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              Asik!
            </em>
          </h1>

          {/* Subtitle */}
          <p className="hero-reveal opacity-0 text-base sm:text-lg text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            Hayu wanoh deui kana aksara karuhun Tatar Sunda. Diajarna enteng, visualna rame,
            jeung bisa langsung nyoba nulis ngaran sorangan.
          </p>

          {/* CTA buttons */}
          <div className="hero-reveal opacity-0 flex gap-3.5 flex-wrap justify-center mb-10">
            <a
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-indigo-500 shadow-[0_8px_28px_rgba(99,102,241,0.3)] hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(99,102,241,0.35)] transition"
              href="#try"
            >
              Mulai Belajar
            </a>
            <a
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-gray-800 bg-white border-[1.5px] border-gray-300 hover:border-indigo-400 hover:text-indigo-600 transition"
              href="#history"
            >
              Coba Ayeuna
            </a>
          </div>

          {/* Big hero aksara glyphs — like reference's 3 big aksara characters */}
          <div className="hero-reveal opacity-0 flex gap-3 sm:gap-4" aria-label="Conto aksara Sunda">
            {heroBigGlyphs.map((glyph) => (
              <span
                key={glyph}
                className="hero-glyph grid place-items-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white border-[1.5px] border-gray-200 font-sunda text-3xl sm:text-4xl lg:text-5xl text-indigo-500 shadow-lg hover:-translate-y-1.5 hover:shadow-xl transition"
              >
                {glyph}
              </span>
            ))}
          </div>

          {/* Small glyph row */}
          <div className="hero-reveal opacity-0 flex gap-2 mt-5" aria-hidden="true">
            {sampleGlyphs.map((glyph, i) => (
              <span
                key={`${glyph}-${i}`}
                className="grid place-items-center w-8 h-8 rounded-lg bg-white/60 border border-gray-100 font-sunda text-sm text-gray-400"
              >
                {glyph}
              </span>
            ))}
          </div>
        </div>

        {/* Manuscript info card — bottom left */}
        <div className="absolute left-6 lg:left-12 bottom-8 z-10 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-lg hidden md:block">
          <strong className="block font-sunda text-2xl text-indigo-500 mb-0.5">ᮞᮥᮔ᮪ᮓ</strong>
          <span className="text-xs font-semibold text-gray-400 tracking-wide">Aksara Sunda Baku</span>
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section ref={historyRef} className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 px-6 sm:px-12 lg:px-14 py-16 lg:py-20 bg-navy text-gray-300 overflow-hidden" id="history">
        <div className="absolute inset-0 grid place-items-center font-sunda text-[120px] lg:text-[220px] font-black text-white/[0.016] tracking-[20px] pointer-events-none select-none" aria-hidden="true">ᮃᮊᮞᮛ</div>

        <div className="scroll-reveal opacity-0">
          <span className="inline-block text-xs font-bold tracking-[0.8px] uppercase text-indigo-400 mb-4">Sajarahna</span>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-white leading-tight mb-4 tracking-tight">
            Aksara Sunda{' '}
            <em className="not-italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Boga Carita!
            </em>
          </h2>
          <p className="text-[15px] lg:text-base text-gray-400 max-w-[540px] mb-5">
            Ti prasasti, naskah buhun, nepi ka média kiwari, aksara Sunda jadi bukti yén basa jeung budaya Sunda boga akar jero jeung masa depan caang.
          </p>
          <a className="font-bold text-sm text-indigo-400 border-b-2 border-indigo-400 pb-0.5 hover:text-indigo-300 hover:border-indigo-300 transition" href="#try">Cobaan ayeuna</a>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-3 self-center" aria-hidden="true">
          {['', 'accent', ''].map((cls, i) => (
            <div
              key={i}
              className={`h-[150px] rounded-[14px] border border-white/[0.06] scroll-reveal opacity-0 ${
                cls === 'accent'
                  ? 'bg-[repeating-linear-gradient(60deg,transparent,transparent_8px,rgba(99,102,241,0.12)_8px,rgba(99,102,241,0.12)_16px),repeating-linear-gradient(-30deg,transparent,transparent_12px,rgba(139,92,246,0.06)_12px,rgba(139,92,246,0.06)_24px),linear-gradient(145deg,#1e2f4a,#2a4162)]'
                  : 'bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(99,102,241,0.07)_10px,rgba(99,102,241,0.07)_20px),repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(255,255,255,0.03)_10px,rgba(255,255,255,0.03)_20px),linear-gradient(145deg,#1a2840,#223752)]'
              }`}
            />
          ))}
        </div>

        <div className="col-span-full grid sm:grid-cols-3 gap-5 mt-2">
          {timeline.map((item) => (
            <article key={item.era} className="scroll-reveal opacity-0 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-6 py-6 hover:bg-white/[0.08] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition">
              <span className="inline-block text-[11px] font-bold text-indigo-400 tracking-[0.5px] uppercase mb-2.5">{item.era}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CONVERTER ── */}
      <section ref={converterRef} className="grid lg:grid-cols-2 gap-7 lg:gap-8 px-6 sm:px-12 lg:px-14 py-16 lg:py-20 items-start" id="try">
        <div className="scroll-reveal opacity-0 bg-navy text-gray-300 border border-white/[0.06] rounded-2xl px-7 lg:px-8 py-8 lg:py-9 shadow-lg" id="about">
          <span className="inline-block text-xs font-bold tracking-[0.8px] text-indigo-400 mb-4 uppercase">Konverter ngaran</span>
          <h2 className="text-[26px] lg:text-[32px] font-extrabold text-white leading-tight mb-3">Tulis ngaran anjeun dina Aksara Sunda!</h2>
          <p className="text-[15px] text-gray-400 mb-5">
            Ketik hurup latin, hasilna langsung robah jadi aksara Sunda. Fitur ieu keur latihan awal, nyieun poster, atawa saukur ulin bari diajar.
          </p>
          <div className="flex gap-2 flex-wrap mb-5" aria-label="Kaunggulan fitur">
            {['Interaktif', 'Real-time', 'Basajan'].map((chip, i) => (
              <span
                key={chip}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  i === 0
                    ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                    : 'bg-white/[0.06] text-gray-300 border-white/10'
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex gap-2.5 items-start p-4 rounded-[14px] bg-white/[0.04] border border-white/[0.07]">
            <span className="text-base text-amber-300">✦</span>
            <p className="text-[13px] text-gray-500 m-0">Transliterasi basajan, merenah keur mimiti wanoh kana wangun aksara.</p>
          </div>
        </div>

        <div className="scroll-reveal opacity-0 bg-white border border-gray-200 rounded-2xl px-7 lg:px-8 py-8 lg:py-9 shadow-lg">
          <label className="flex items-center gap-1.5 text-sm font-bold text-gray-800 mb-2.5" htmlFor="name-input">
            <span className="text-indigo-500">✦</span> Lebetkeun ngaran atawa kecap pondok
          </label>
          <input
            id="name-input"
            className="w-full px-5 py-3.5 text-base border-[1.5px] border-gray-200 rounded-[14px] bg-gray-50 text-gray-900 outline-none focus:border-indigo-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition placeholder:text-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Conto: Dadang Suryana"
            maxLength={28}
          />
          <div className="mt-5 px-5 py-8 bg-navy text-white rounded-2xl text-center font-sunda text-3xl sm:text-[44px] font-bold tracking-[4px] sm:tracking-[8px] border border-white/[0.06] shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]" style={{ overflowWrap: 'anywhere' }} aria-live="polite">
            {cleanInput ? converted : 'ᮃᮊᮞᮛ ᮞᮥᮔ᮪ᮓ'}
          </div>
          <ul className="list-none mt-4 space-y-1">
            {[
              'Hadéna paké hurup latin biasa.',
              'Spasi tiasa dipaké keur dua kecap.',
              'Hasil ieu latihan awal, lain ejaan akademik lengkep.',
            ].map((rule) => (
              <li key={rule} className="flex items-center gap-2 text-[13px] text-gray-500 leading-relaxed">
                <span className="text-emerald-500 font-bold">✓</span> {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative px-6 sm:px-7 py-16 lg:py-20 bg-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_80%,rgba(99,102,241,0.12)_0%,transparent_45%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.08)_0%,transparent_40%)]" aria-hidden="true" />
        <h2 className="scroll-reveal opacity-0 relative z-10 text-3xl lg:text-[40px] font-extrabold mb-3.5 tracking-tight">
          Diajar Aksara Sunda tiasa{' '}
          <em className="not-italic bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">SARAME KIEU!</em>
        </h2>
        <p className="scroll-reveal opacity-0 relative z-10 text-base text-gray-400 max-w-[540px] mx-auto mb-7">
          Mimitian tina hiji ngaran, tuluy teruskeun kana kecap, carita, jeung rasa reueus kana warisan Sunda.
        </p>
        <div className="scroll-reveal opacity-0 relative z-10 flex gap-3.5 flex-wrap justify-center">
          <a
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-indigo-500 shadow-[0_8px_28px_rgba(99,102,241,0.3)] hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(99,102,241,0.35)] transition"
            href="#try"
          >
            Coba Deui
          </a>
          <a className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-white/10 border border-white/20 hover:bg-white/15 transition" href="#home">Balik ka Luhur</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-1.5 px-6 sm:px-14 py-6 bg-[#080c16] text-gray-500 text-[13px] border-t border-white/[0.06]">
        <span>© 2026 Sunda Aksa.</span>
        <span>Rarancang diajar Aksara Sunda keur balaréa.</span>
      </footer>
    </main>
  )
}

export default App
