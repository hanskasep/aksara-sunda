import { useMemo, useState } from 'react'
import './App.css'

type TimelineItem = {
  era: string
  title: string
  body: string
}

const timeline: TimelineItem[] = [
  {
    era: 'Abad ka-14',
    title: 'Mimiti dipaké',
    body: 'Aksara Sunda kuna kapanggih dina prasasti jeung naskah karajaan Sunda.'
  },
  {
    era: 'Abad ka-16',
    title: 'Naskah jeung carita',
    body: 'Dipaké pikeun nyatet ajaran, sajarah, jeung pangaweruh masarakat Sunda.'
  },
  {
    era: 'Kiwari',
    title: 'Hirup deui',
    body: 'Aksara Sunda baku diajarkeun deui di sakola, média digital, jeung karya kreatif.'
  }
]

const aksaraMap: Record<string, string> = {
  a: 'ᮃ', b: 'ᮘ', c: 'ᮎ', d: 'ᮓ', e: 'ᮈ', f: 'ᮖ', g: 'ᮌ', h: 'ᮠ', i: 'ᮄ',
  j: 'ᮏ', k: 'ᮊ', l: 'ᮜ', m: 'ᮙ', n: 'ᮔ', o: 'ᮇ', p: 'ᮕ', q: 'ᮋ', r: 'ᮛ',
  s: 'ᮞ', t: 'ᮒ', u: 'ᮅ', v: 'ᮗ', w: 'ᮝ', x: 'ᮊ᮪ᮞ', y: 'ᮚ', z: 'ᮐ'
}

const sampleGlyphs = ['ᮃ', 'ᮊ', 'ᮞ', 'ᮛ', 'ᮙ', 'ᮔ']

function convertToSundanese(input: string) {
  return input
    .toLowerCase()
    .split('')
    .map((char) => {
      if (char === ' ') return ' '
      return aksaraMap[char] ?? char
    })
    .join('')
}

function App() {
  const [name, setName] = useState('')
  const converted = useMemo(() => convertToSundanese(name), [name])
  const cleanInput = name.trim()

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Diajar Aksara Sunda">
          <span className="brand-mark">ᮞ</span>
          <span>
            <strong>Sunda Aksa</strong>
            <small>Diajar Aksara Sunda</small>
          </span>
        </a>
        <nav aria-label="Navigasi utama">
          <a href="#home">Imah</a>
          <a href="#history">Sajarah</a>
          <a href="#try">Coba</a>
        </nav>
        <a className="nav-cta" href="#try">Coba Aksara</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> Jelajah aksara karuhun Sunda</div>
          <h1>Aksara Sunda téh <em>asik!</em></h1>
          <p>
            Hayu diajar maca jeung nulis aksara Sunda ku cara nu enteng, visual, jeung langsung bisa dicoba.
          </p>
          <div className="actions">
            <a className="primary" href="#history">Mimitian Diajar</a>
            <a className="secondary" href="#try">Coba Ayeuna</a>
          </div>
          <div className="glyph-row" aria-label="Conto aksara Sunda">
            {sampleGlyphs.map((glyph) => <span key={glyph}>{glyph}</span>)}
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="sun-disc"></div>
          <div className="manuscript">
            <div className="paper-lines"></div>
            <strong>ᮃ ᮊ ᮞ</strong>
            <span>ᮞᮥᮔ᮪ᮓ</span>
          </div>
          <div className="kujang-shape"></div>
          <div className="floating-glyph glyph-one">ᮙ</div>
          <div className="floating-glyph glyph-two">ᮛ</div>
          <div className="orbit"></div>
        </div>
      </section>

      <section className="history" id="history">
        <div className="section-copy">
          <span className="section-kicker">Sajarahna</span>
          <h2>Aksara Sunda boga <em>carita panjang.</em></h2>
          <p>
            Ti prasasti, naskah lontar, nepi ka papan ngaran jaman ayeuna, aksara Sunda jadi salah sahiji tanda kuat identitas budaya Jawa Barat.
          </p>
          <a href="#try">Diajar langkung jauh</a>
        </div>
        <div className="woven-panel" aria-hidden="true">
          <div></div>
          <div></div>
          <div></div>
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

      <section className="try" id="try">
        <div className="try-card intro-card">
          <span className="section-kicker">Interaktif</span>
          <h2>Tulis ngaran maneh dina Aksara Sunda.</h2>
          <p>
            Ketik hurup latin, terus tingali hasilna dina aksara Sunda. Cocok keur latihan mimiti jeung nyieun rasa panasaran.
          </p>
          <div className="chips">
            <span>Real-time</span>
            <span>Basajan</span>
            <span>Tanpa login</span>
          </div>
        </div>
        <div className="try-card converter-card">
          <label htmlFor="name-input">Ngaran atawa kecap pondok</label>
          <input
            id="name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Conto: Dadan"
            maxLength={24}
          />
          <div className="output" aria-live="polite">
            {cleanInput ? converted : 'ᮃᮊᮞᮛ ᮞᮥᮔ᮪ᮓ'}
          </div>
          <ul>
            <li>Hadéna paké hurup latin biasa.</li>
            <li>Spasi masih bisa dipaké keur dua kecap.</li>
            <li>Ieu transliterasi basajan keur latihan awal.</li>
          </ul>
        </div>
      </section>

      <section className="final-cta">
        <h2>Diajar Aksara Sunda tiasa <em>sarame kieu!</em></h2>
        <p>Ti hiji kecap, bisa jadi jalan pikeun kenal deui kana basa, budaya, jeung carita Sunda.</p>
        <div className="actions center">
          <a className="primary" href="#try">Coba Deui</a>
          <a className="secondary light" href="#history">Tingali Sajarah</a>
        </div>
      </section>

      <footer>
        <span>© 2026 Sunda Aksa.</span>
        <span>Website diajar Aksara Sunda.</span>
      </footer>
    </main>
  )
}

export default App
