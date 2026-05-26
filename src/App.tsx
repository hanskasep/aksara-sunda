import { useMemo, useState } from 'react'
import './App.css'

type TimelineItem = {
  era: string
  title: string
  body: string
}

type GlyphBubble = {
  glyph: string
  className: string
}

const timeline: TimelineItem[] = [
  {
    era: 'Abad ka-14',
    title: 'Ngambah prasasti',
    body: 'Aksara Sunda kuna nyatet tapak karajaan, piagem, jeung tanda pangaweruh karuhun di Tatar Sunda.'
  },
  {
    era: 'Abad ka-16',
    title: 'Hirup dina naskah',
    body: 'Rupa-rupa carita, ajaran, jeung élmu ditulis dina daun lontar, daluang, jeung catetan para bujangga.'
  },
  {
    era: 'Kiwari',
    title: 'Hudang deui',
    body: 'Aksara Sunda baku dipaké deui di sakola, papan ngaran, karya digital, jeung gerakan budaya ngora.'
  }
]

const aksaraMap: Record<string, string> = {
  a: 'ᮃ', b: 'ᮘ', c: 'ᮎ', d: 'ᮓ', e: 'ᮈ', f: 'ᮖ', g: 'ᮌ', h: 'ᮠ', i: 'ᮄ',
  j: 'ᮏ', k: 'ᮊ', l: 'ᮜ', m: 'ᮙ', n: 'ᮔ', o: 'ᮇ', p: 'ᮕ', q: 'ᮋ', r: 'ᮛ',
  s: 'ᮞ', t: 'ᮒ', u: 'ᮅ', v: 'ᮗ', w: 'ᮝ', x: 'ᮊ᮪ᮞ', y: 'ᮚ', z: 'ᮐ'
}

const heroGlyphs = ['ᮃ', 'ᮊ', 'ᮞ']
const sampleGlyphs = ['ᮞ', 'ᮥ', 'ᮔ', '᮪', 'ᮓ', 'ᮃ']
const floatingGlyphs: GlyphBubble[] = [
  { glyph: 'ᮙ', className: 'float-one' },
  { glyph: 'ᮛ', className: 'float-two' },
  { glyph: 'ᮊ', className: 'float-three' },
  { glyph: 'ᮚ', className: 'float-four' }
]

function convertToSundanese(input: string) {
  return input
    .toLowerCase()
    .split('')
    .map((char) => {
      if (char === ' ') return '  '
      return aksaraMap[char] ?? char
    })
    .join('')
}

function KujangSvg() {
  return (
    <svg className="kujang-svg" viewBox="0 0 168 286" role="img" aria-label="Rarancang kujang Sunda">
      <path className="kujang-shadow" d="M80 8c38 24 61 59 59 94-2 44-39 61-34 96 4 28 31 37 31 37s-35 32-72 26c-26-4-43-23-45-50-3-34 25-49 27-82C49 83 16 55 16 55S47 30 80 8Z" />
      <path className="kujang-main" d="M86 7c32 20 54 50 57 80 5 49-40 67-33 105 5 27 32 42 32 42-21 24-53 37-82 29-28-8-43-31-39-58 4-32 31-45 29-77C47 83 18 55 18 55 39 31 61 15 86 7Z" />
      <path className="kujang-cut" d="M88 57c14 15 21 34 18 51-3 19-18 30-30 42-15 15-20 31-14 55-14-15-18-34-10-54 7-18 24-30 31-49 5-14 3-29 5-45Z" />
      <circle cx="90" cy="91" r="9" fill="#fff7e8" opacity="0.82" />
      <path className="kujang-line" d="M73 247c-18-16-20-39-9-62 10-20 29-33 37-57 7-21 2-44-10-65" />
    </svg>
  )
}

function MegaMendungSvg() {
  return (
    <svg className="mega-svg" viewBox="0 0 640 260" aria-hidden="true">
      <path d="M28 172c36-74 118-73 148-28 23-53 101-68 141-18 29-56 116-57 151-2 48-12 101 16 125 67" />
      <path d="M12 206c44-52 113-50 153-20 45-46 112-45 153-7 46-40 112-39 164 5 44-19 96-7 136 30" />
      <path d="M70 117c27-32 80-37 112-6 29-39 95-47 134-8 34-31 88-29 123 6" />
      <path d="M132 68c31-27 86-27 117 5 41-26 93-19 121 17" />
    </svg>
  )
}

function WayangOrnament() {
  return (
    <svg className="wayang-svg" viewBox="0 0 360 420" aria-hidden="true">
      <path d="M180 22c46 34 78 78 82 126 3 37-12 67-34 95l72 88-43 47-77-100-77 100-43-47 72-88c-22-28-37-58-34-95 4-48 36-92 82-126Z" />
      <path d="M180 72c24 20 39 47 39 75 0 33-20 58-39 79-19-21-39-46-39-79 0-28 15-55 39-75Z" />
      <circle cx="180" cy="150" r="15" />
      <path d="M180 247v138" />
      <path d="M118 331c38-10 86-10 124 0" />
    </svg>
  )
}

function App() {
  const [name, setName] = useState('')
  const converted = useMemo(() => convertToSundanese(name), [name])
  const cleanInput = name.trim()

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sunda Aksa">
          <span className="brand-mark">ᮞ</span>
          <span className="brand-text">
            <strong>Sunda Aksa</strong>
            <small>ᮃᮊᮞᮛ ᮞᮥᮔ᮪ᮓ</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Navigasi utama">
          <a href="#home">Beranda</a>
          <a href="#history">Sajarah</a>
          <a href="#about">Tentang</a>
        </nav>

        <div className="nav-actions">
          <button className="language" type="button" aria-label="Basa Sunda">SU</button>
          <a className="nav-cta" href="#try">Coba Aksara</a>
        </div>
      </header>

      <section className="hero section-reveal" id="home">
        <MegaMendungSvg />
        <div className="hero-copy">
          <div className="eyebrow"><span></span> Jelajah Aksara Sunda</div>
          <h1>Aksara Sunda téh <em>Asik!</em></h1>
          <p>
            Hayu wanoh deui kana aksara karuhun Tatar Sunda. Diajarna enteng, visualna rame,
            jeung bisa langsung nyoba nulis ngaran sorangan.
          </p>
          <div className="actions">
            <a className="primary" href="#try">Tulis Ngaran</a>
            <a className="secondary" href="#history">Tingali Carita</a>
          </div>
          <div className="glyph-row" aria-label="Conto aksara Sunda">
            {sampleGlyphs.map((glyph, index) => <span key={`${glyph}-${index}`}>{glyph}</span>)}
          </div>
        </div>

        <div className="hero-art" aria-label="Ilustrasi budaya Sunda jeung aksara Sunda">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="hero-glow"></div>
          <WayangOrnament />
          <KujangSvg />
          <div className="glyph-center" aria-hidden="true">
            {heroGlyphs.map((glyph) => <span key={glyph}>{glyph}</span>)}
          </div>
          <div className="label-card manuscript-card">
            <strong>ᮞᮥᮔ᮪ᮓ</strong>
            <span>Aksara Sunda Baku</span>
          </div>
          {floatingGlyphs.map((item) => (
            <span className={`floating-glyph ${item.className}`} key={item.className}>{item.glyph}</span>
          ))}
        </div>
      </section>

      <section className="history section-reveal" id="history">
        <div className="history-watermark" aria-hidden="true">ᮃᮊᮞᮛ</div>
        <div className="section-copy">
          <span className="section-kicker">Sajarahna</span>
          <h2>Aksara Sunda <em>Boga Carita!</em></h2>
          <p>
            Ti prasasti, naskah buhun, nepi ka média kiwari, aksara Sunda jadi bukti yén basa jeung budaya Sunda boga akar jero jeung masa depan caang.
          </p>
          <a href="#try">Cobaan ayeuna</a>
        </div>
        <div className="woven-panel" aria-hidden="true">
          <div className="woven-card"></div>
          <div className="woven-card accent"></div>
          <div className="woven-card"></div>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article key={item.era}>
              <span>{item.era}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="try section-reveal" id="try">
        <div className="try-card intro-card" id="about">
          <span className="section-kicker">Konverter ngaran</span>
          <h2>Tulis ngaran anjeun dina Aksara Sunda!</h2>
          <p>
            Ketik hurup latin, hasilna langsung robah jadi aksara Sunda. Fitur ieu keur latihan awal, nyieun poster, atawa saukur ulin bari diajar.
          </p>
          <div className="chips" aria-label="Kaunggulan fitur">
            <span>Interaktif</span>
            <span>Real-time</span>
            <span>Basajan</span>
          </div>
          <div className="ai-note">
            <span>✦</span>
            <p>Transliterasi basajan, merenah keur mimiti wanoh kana wangun aksara.</p>
          </div>
        </div>

        <div className="try-card converter-card">
          <label htmlFor="name-input"><span>✦</span> Lebetkeun ngaran atawa kecap pondok</label>
          <input
            id="name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Conto: Dadang Suryana"
            maxLength={28}
          />
          <div className="output" aria-live="polite">
            {cleanInput ? converted : 'ᮃᮊᮞᮛ ᮞᮥᮔ᮪ᮓ'}
          </div>
          <ul className="rules">
            <li><span>✓</span> Hadéna paké hurup latin biasa.</li>
            <li><span>✓</span> Spasi tiasa dipaké keur dua kecap.</li>
            <li><span>✓</span> Hasil ieu latihan awal, lain ejaan akademik lengkep.</li>
          </ul>
        </div>
      </section>

      <section className="final-cta section-reveal">
        <div className="cta-pattern" aria-hidden="true"></div>
        <h2>Diajar Aksara Sunda tiasa <em>SARAME KIEU!</em></h2>
        <p>
          Mimitian tina hiji ngaran, tuluy teruskeun kana kecap, carita, jeung rasa reueus kana warisan Sunda.
        </p>
        <div className="actions center">
          <a className="primary" href="#try">Coba Deui</a>
          <a className="secondary light" href="#home">Balik ka Luhur</a>
        </div>
      </section>

      <footer>
        <span>© 2026 Sunda Aksa.</span>
        <span>Rarancang diajar Aksara Sunda keur balaréa.</span>
      </footer>
    </main>
  )
}

export default App
