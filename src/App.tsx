import { useEffect, useRef, useMemo, useState } from 'react'
import gsap from 'gsap'
import './App.css'

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

const heroGlyphs = ['ᮃ', 'ᮊ', 'ᮞ']
const sampleGlyphs = ['ᮞ', 'ᮥ', 'ᮔ', '᮪', 'ᮓ', 'ᮃ']
const floatingData = [
  { glyph: 'ᮙ', pos: 'left-3 top-2.5', delay: '0s' },
  { glyph: 'ᮛ', pos: 'right-4 bottom-14', delay: '0.6s' },
  { glyph: 'ᮊ', pos: 'left-16 bottom-1.5', delay: '1.2s' },
  { glyph: 'ᮚ', pos: 'right-14 top-1.5', delay: '1.8s' },
]

function convertToSundanese(input: string) {
  return input
    .toLowerCase()
    .split('')
    .map((c) => (c === ' ' ? '  ' : (aksaraMap[c] ?? c)))
    .join('')
}

/* ─── SVG components ─── */
function KujangSvg() {
  return (
    <svg className="absolute z-[1] right-6 top-6 w-[70px] h-[128px] -rotate-8 opacity-55" viewBox="0 0 168 286" role="img" aria-label="Rarancang kujang Sunda">
      <path className="fill-navy opacity-[0.06]" d="M80 8c38 24 61 59 59 94-2 44-39 61-34 96 4 28 31 37 31 37s-35 32-72 26c-26-4-43-23-45-50-3-34 25-49 27-82C49 83 16 55 16 55S47 30 80 8Z" />
      <path className="fill-red opacity-[0.22]" d="M86 7c32 20 54 50 57 80 5 49-40 67-33 105 5 27 32 42 32 42-21 24-53 37-82 29-28-8-43-31-39-58 4-32 31-45 29-77C47 83 18 55 18 55 39 31 61 15 86 7Z" />
      <path className="fill-cream opacity-[0.85]" d="M88 57c14 15 21 34 18 51-3 19-18 30-30 42-15 15-20 31-14 55-14-15-18-34-10-54 7-18 24-30 31-49 5-14 3-29 5-45Z" />
      <circle cx="90" cy="91" r="9" fill="#fff7e8" opacity="0.82" />
      <path className="fill-none stroke-red stroke-[1.8] opacity-[0.35]" d="M73 247c-18-16-20-39-9-62 10-20 29-33 37-57 7-21 2-44-10-65" />
    </svg>
  )
}

function MegaMendungSvg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none" viewBox="0 0 640 260" aria-hidden="true">
      <path className="fill-none stroke-red stroke-2 stroke-linecap-round" strokeDasharray="8 6" opacity="0.45" d="M28 172c36-74 118-73 148-28 23-53 101-68 141-18 29-56 116-57 151-2 48-12 101 16 125 67" />
      <path className="fill-none stroke-red stroke-2 stroke-linecap-round" strokeDasharray="8 6" opacity="0.45" d="M12 206c44-52 113-50 153-20 45-46 112-45 153-7 46-40 112-39 164 5 44-19 96-7 136 30" />
      <path className="fill-none stroke-red stroke-2 stroke-linecap-round" strokeDasharray="8 6" opacity="0.45" d="M70 117c27-32 80-37 112-6 29-39 95-47 134-8 34-31 88-29 123 6" />
      <path className="fill-none stroke-red stroke-2 stroke-linecap-round" strokeDasharray="8 6" opacity="0.45" d="M132 68c31-27 86-27 117 5 41-26 93-19 121 17" />
    </svg>
  )
}

function WayangOrnament() {
  return (
    <svg className="absolute z-0 w-[220px] h-[260px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.055] pointer-events-none" viewBox="0 0 360 420" aria-hidden="true">
      <path className="fill-none stroke-navy stroke-[2.2]" d="M180 22c46 34 78 78 82 126 3 37-12 67-34 95l72 88-43 47-77-100-77 100-43-47 72-88c-22-28-37-58-34-95 4-48 36-92 82-126Z" />
      <path className="fill-none stroke-navy stroke-[2.2]" d="M180 72c24 20 39 47 39 75 0 33-20 58-39 79-19-21-39-46-39-79 0-28 15-55 39-75Z" />
      <circle className="fill-none stroke-navy stroke-[2.2]" cx="180" cy="150" r="15" />
      <path className="fill-none stroke-navy stroke-[2.2]" d="M180 247v138" />
      <path className="fill-none stroke-navy stroke-[2.2]" d="M118 331c38-10 86-10 124 0" />
    </svg>
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
      // Hero copy stagger
      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
      // Hero art
      gsap.fromTo(
        '.hero-art-reveal',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
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
      gsap.to('.orbit-ring', { rotation: 360, duration: 60, repeat: -1, ease: 'none' })
    })

    return () => ctx.revert()
  }, [])

  /* Scroll-triggered reveals via IntersectionObserver */
  useEffect(() => {
    const targets = [historyRef.current, converterRef.current, ctaRef.current].filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll('.scroll-reveal'),
              { opacity: 0, y: 36 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            )
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    targets.forEach((t) => observer.observe(t!))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3.5 bg-cream/80 backdrop-blur-xl backdrop-saturate-130 border-b border-cream-dark/60">
        <a className="flex items-center gap-3" href="#home" aria-label="Sunda Aksa">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-red to-red-dark text-white text-2xl font-bold font-sunda shadow-[0_4px_16px_rgba(230,57,70,0.28)]">ᮞ</span>
          <span className="flex flex-col gap-px">
            <strong className="text-[15px] tracking-[0.6px]">Sunda Aksa</strong>
            <small className="text-xs text-muted font-sunda">ᮃᮊᮞᮛ ᮞᮥᮔ᮪ᮓ</small>
          </span>
        </a>

        <nav className="hidden md:flex gap-6" aria-label="Navigasi utama">
          {['Beranda', 'Sajarah', 'Tentang'].map((label) => (
            <a
              key={label}
              href={`#${label === 'Beranda' ? 'home' : label === 'Sajarah' ? 'history' : 'about'}`}
              className="text-sm font-semibold text-body relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-0 after:h-0.5 after:bg-red after:transition-[width] after:duration-250 hover:text-red hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full border-[1.5px] border-cream-dark font-extrabold text-xs text-body grid place-items-center hover:border-red hover:bg-red/5 transition" type="button" aria-label="Basa Sunda">SU</button>
          <a className="bg-gradient-to-br from-red to-red-dark text-white px-5 py-2.5 rounded-full text-[13px] font-bold tracking-[0.3px] shadow-[0_6px_20px_rgba(230,57,70,0.3)] hover:-translate-y-px hover:shadow-[0_10px_30px_rgba(230,57,70,0.35)] transition" href="#try">Coba Aksara</a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative grid lg:grid-cols-2 items-center gap-10 lg:gap-12 px-6 sm:px-12 lg:px-14 py-16 lg:py-20 bg-gradient-to-br from-pink-soft/80 via-pink-soft/40 to-cream to-80% min-h-[520px] overflow-hidden"
        id="home"
      >
        <MegaMendungSvg />

        <div className="relative z-10">
          <div className="hero-reveal opacity-0 inline-flex items-center gap-2 text-xs font-bold tracking-[0.5px] bg-white border border-cream-dark px-4 py-1.5 rounded-full text-muted mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Jelajah Aksara Sunda
          </div>
          <h1 className="hero-reveal opacity-0 text-4xl sm:text-5xl lg:text-[58px] font-black leading-[1.03] text-ink tracking-tight mb-4">
            Aksara Sunda téh{' '}
            <em className="not-italic bg-gradient-to-br from-red via-[#ff6b8a] to-pink bg-clip-text text-transparent">Asik!</em>
          </h1>
          <p className="hero-reveal opacity-0 text-base sm:text-[17px] max-w-[470px] text-gray-600 mb-7">
            Hayu wanoh deui kana aksara karuhun Tatar Sunda. Diajarna enteng, visualna rame,
            jeung bisa langsung nyoba nulis ngaran sorangan.
          </p>
          <div className="hero-reveal opacity-0 flex gap-3.5 flex-wrap mb-7">
            <a className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-[14px] font-bold text-sm text-white bg-gradient-to-br from-red to-red-dark shadow-[0_8px_28px_rgba(230,57,70,0.28)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(230,57,70,0.34)] transition" href="#try">Tulis Ngaran</a>
            <a className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-[14px] font-bold text-sm text-ink bg-white border-[1.5px] border-cream-dark hover:border-red hover:text-red transition" href="#history">Tingali Carita</a>
          </div>
          <div className="hero-reveal opacity-0 flex gap-2" aria-label="Conto aksara Sunda">
            {sampleGlyphs.map((glyph, i) => (
              <span key={`${glyph}-${i}`} className="grid place-items-center w-[46px] h-[46px] rounded-[13px] bg-white border border-cream-dark font-sunda text-[23px] text-ink shadow-sm hover:-translate-y-1 hover:shadow-md transition">{glyph}</span>
            ))}
          </div>
        </div>

        {/* Hero Art */}
        <div className="hero-art-reveal opacity-0 relative flex items-center justify-center min-h-[300px] lg:min-h-[400px]" aria-label="Ilustrasi budaya Sunda jeung aksara Sunda">
          <div className="orbit-ring absolute rounded-full border-[1.5px] border-dashed border-red/15 w-[260px] h-[260px] lg:w-[360px] lg:h-[360px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="orbit-ring absolute rounded-full border-dotted border-red/10 border w-[190px] h-[190px] lg:w-[260px] lg:h-[260px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
          <div className="absolute w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] rounded-full bg-gradient-to-br from-pink-soft via-gold-light to-gold opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[38px]" />
          <WayangOrnament />
          <KujangSvg />
          <div className="relative z-10 flex gap-3" aria-hidden="true">
            {heroGlyphs.map((glyph) => (
              <span key={glyph} className="grid place-items-center w-[68px] h-[68px] lg:w-[88px] lg:h-[88px] rounded-[18px] lg:rounded-[22px] bg-white border-[1.5px] border-cream-dark font-sunda text-3xl lg:text-[44px] font-bold text-red shadow-lg hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl transition">{glyph}</span>
            ))}
          </div>
          <div className="absolute z-[4] bg-white border border-cream-dark rounded-[14px] px-5 py-4 shadow-lg left-3 bottom-3">
            <strong className="block font-sunda text-[28px] lg:text-[32px] text-red mb-0.5">ᮞᮥᮔ᮪ᮓ</strong>
            <span className="text-xs font-semibold text-muted tracking-[0.3px]">Aksara Sunda Baku</span>
          </div>
          {floatingData.map((item) => (
            <span
              key={item.glyph}
              className={`float-glyph absolute z-[2] w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-cream-dark grid place-items-center font-sunda text-xl lg:text-[26px] text-red shadow-md ${item.pos}`}
              style={{ animationDelay: item.delay }}
            >
              {item.glyph}
            </span>
          ))}
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section ref={historyRef} className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 px-6 sm:px-12 lg:px-14 py-16 lg:py-20 bg-navy text-gray-300 overflow-hidden" id="history">
        <div className="absolute inset-0 grid place-items-center font-sunda text-[120px] lg:text-[220px] font-black text-white/[0.016] tracking-[20px] pointer-events-none select-none" aria-hidden="true">ᮃᮊᮞᮛ</div>

        <div className="scroll-reveal opacity-0">
          <span className="inline-block text-xs font-bold tracking-[0.8px] uppercase text-pink mb-4">Sajarahna</span>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-white leading-tight mb-4 tracking-tight">
            Aksara Sunda <em className="not-italic bg-gradient-to-br from-red via-[#ff6b8a] to-pink bg-clip-text text-transparent">Boga Carita!</em>
          </h2>
          <p className="text-[15px] lg:text-base text-gray-400 max-w-[540px] mb-5">
            Ti prasasti, naskah buhun, nepi ka média kiwari, aksara Sunda jadi bukti yén basa jeung budaya Sunda boga akar jero jeung masa depan caang.
          </p>
          <a className="font-bold text-sm text-red border-b-2 border-red pb-0.5 hover:text-pink hover:border-pink transition" href="#try">Cobaan ayeuna</a>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-3 self-center" aria-hidden="true">
          {['', 'accent', ''].map((cls, i) => (
            <div
              key={i}
              className={`h-[150px] rounded-[14px] border border-white/[0.06] scroll-reveal opacity-0 ${
                cls === 'accent'
                  ? 'bg-[repeating-linear-gradient(60deg,transparent,transparent_8px,rgba(230,57,70,0.12)_8px,rgba(230,57,70,0.12)_16px),repeating-linear-gradient(-30deg,transparent,transparent_12px,rgba(251,191,36,0.06)_12px,rgba(251,191,36,0.06)_24px),linear-gradient(145deg,#1e2f4a,#2a4162)]'
                  : 'bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(230,57,70,0.07)_10px,rgba(230,57,70,0.07)_20px),repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(255,255,255,0.03)_10px,rgba(255,255,255,0.03)_20px),linear-gradient(145deg,#1a2840,#223752)]'
              }`}
            />
          ))}
        </div>

        <div className="col-span-full grid sm:grid-cols-3 gap-5 mt-2">
          {timeline.map((item) => (
            <article key={item.era} className="scroll-reveal opacity-0 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-6 py-6 hover:bg-white/[0.08] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition">
              <span className="inline-block text-[11px] font-bold text-red tracking-[0.5px] uppercase mb-2.5">{item.era}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CONVERTER ── */}
      <section ref={converterRef} className="grid lg:grid-cols-2 gap-7 lg:gap-8 px-6 sm:px-12 lg:px-14 py-16 lg:py-20 items-start" id="try">
        <div className="scroll-reveal opacity-0 bg-navy text-gray-300 border border-white/[0.06] rounded-2xl px-7 lg:px-8 py-8 lg:py-9 shadow-lg" id="about">
          <span className="inline-block text-xs font-bold tracking-[0.8px] text-red mb-4 uppercase">Konverter ngaran</span>
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
                    ? 'bg-red/15 text-red border-red/30'
                    : 'bg-white/[0.06] text-gray-300 border-white/10'
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex gap-2.5 items-start p-4 rounded-[14px] bg-white/[0.04] border border-white/[0.07]">
            <span className="text-base text-gold-light">✦</span>
            <p className="text-[13px] text-gray-500 m-0">Transliterasi basajan, merenah keur mimiti wanoh kana wangun aksara.</p>
          </div>
        </div>

        <div className="scroll-reveal opacity-0 bg-white border border-cream-dark rounded-2xl px-7 lg:px-8 py-8 lg:py-9 shadow-lg">
          <label className="flex items-center gap-1.5 text-sm font-bold text-body mb-2.5" htmlFor="name-input">
            <span className="text-gold">✦</span> Lebetkeun ngaran atawa kecap pondok
          </label>
          <input
            id="name-input"
            className="w-full px-5 py-3.5 text-base border-[1.5px] border-cream-dark rounded-[14px] bg-cream text-ink outline-none focus:border-red focus:shadow-[0_0_0_3px_rgba(230,57,70,0.1)] transition placeholder:text-[#b9b4a8]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Conto: Dadang Suryana"
            maxLength={28}
          />
          <div className="mt-5 px-5 py-8 bg-navy text-white rounded-2xl text-center font-sunda text-3xl sm:text-[44px] font-bold tracking-[4px] sm:tracking-[8px] border border-white/[0.06] shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)] overflow-wrap-anywhere" aria-live="polite">
            {cleanInput ? converted : 'ᮃᮊᮞᮛ ᮞᮥᮔ᮪ᮓ'}
          </div>
          <ul className="list-none mt-4 space-y-1">
            {[
              'Hadéna paké hurup latin biasa.',
              'Spasi tiasa dipaké keur dua kecap.',
              'Hasil ieu latihan awal, lain ejaan akademik lengkep.',
            ].map((rule) => (
              <li key={rule} className="flex items-center gap-2 text-[13px] text-muted leading-relaxed">
                <span className="text-green-500 font-bold">✓</span> {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative px-6 sm:px-7 py-16 lg:py-20 bg-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_80%,rgba(230,57,70,0.12)_0%,transparent_45%),radial-gradient(circle_at_85%_20%,rgba(251,191,36,0.08)_0%,transparent_40%)]" aria-hidden="true" />
        <h2 className="scroll-reveal opacity-0 relative z-10 text-3xl lg:text-[40px] font-extrabold mb-3.5 tracking-tight">
          Diajar Aksara Sunda tiasa <em className="not-italic bg-gradient-to-br from-red via-[#ff6b8a] to-pink bg-clip-text text-transparent">SARAME KIEU!</em>
        </h2>
        <p className="scroll-reveal opacity-0 relative z-10 text-base text-gray-400 max-w-[540px] mx-auto mb-7">
          Mimitian tina hiji ngaran, tuluy teruskeun kana kecap, carita, jeung rasa reueus kana warisan Sunda.
        </p>
        <div className="scroll-reveal opacity-0 relative z-10 flex gap-3.5 flex-wrap justify-center">
          <a className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-[14px] font-bold text-sm text-white bg-gradient-to-br from-red to-red-dark shadow-[0_8px_28px_rgba(230,57,70,0.28)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(230,57,70,0.34)] transition" href="#try">Coba Deui</a>
          <a className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-[14px] font-bold text-sm text-white bg-white/10 border border-white/20 hover:bg-white/15 transition" href="#home">Balik ka Luhur</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-1.5 px-6 sm:px-14 py-6 bg-[#080c16] text-muted text-[13px] border-t border-white/[0.06]">
        <span>© 2026 Sunda Aksa.</span>
        <span>Rarancang diajar Aksara Sunda keur balaréa.</span>
      </footer>
    </main>
  )
}

export default App
