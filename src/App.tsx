import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import ConnectForm from './components/ConnectForm';
import ContactForm from './components/ContactForm';
import ContactInformation from './components/ContactInformation';
import ExchangesShowcase from './components/ExchangesShowcase';
import AlgorithmsShowcase from './components/AlgorithmsShowcase';
import './App.css';

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8.2" r="1.6" fill="currentColor" />
    <path d="M6.9 10.9h2.2v8.1H6.9z" fill="currentColor" />
    <path
      d="M11.4 10.9h2.1v1.2h.05c.42-.82 1.34-1.37 2.4-1.37 2.38 0 3 1.58 3 3.82v4.35h-2.2v-3.84c0-1.05-.02-2.39-1.45-2.39-1.45 0-1.67 1.13-1.67 2.31v3.92h-2.23z"
      fill="currentColor"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M16.75 3.5h-1.95a3.8 3.8 0 0 0-3.8 3.8v2.4H8.1v3.05h2.9V20.5h3.2v-7.75h2.65l.45-3.05h-3.1V7.6c0-.5.41-.9.9-.9h2.55z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M21.4 8.3a2.5 2.5 0 0 0-1.78-1.76C17.8 6 12 6 12 6s-5.8 0-7.62.54A2.5 2.5 0 0 0 2.6 8.3 26.4 26.4 0 0 0 2 12a26.4 26.4 0 0 0 .6 3.7 2.5 2.5 0 0 0 1.78 1.76C6.2 18 12 18 12 18s5.8 0 7.62-.54a2.5 2.5 0 0 0 1.78-1.76c.39-1.2.6-2.45.6-3.7a26.4 26.4 0 0 0-.6-3.7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="m10.4 9.75 4.5 2.25-4.5 2.25z" fill="currentColor" />
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M14.5 4.5c.48 1.6 1.8 2.78 3.45 3.02v2.28c-1.02-.05-2-.31-2.91-.75v5.6a4.65 4.65 0 1 1-4.65-4.64c.28 0 .55.03.82.08v2.38a2.4 2.4 0 1 0 1.6 2.27V4.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const socialLinks = [
  { name: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { name: 'Facebook', href: '#', Icon: FacebookIcon },
  { name: 'Instagram', href: '#', Icon: InstagramIcon },
  { name: 'YouTube', href: '#', Icon: YouTubeIcon },
  { name: 'TikTok', href: '#', Icon: TikTokIcon }
];

const marqueeCoins = [
  'BTC',
  'ETH',
  'USDT',
  'USDC',
  'BNB',
  'XRP',
  'ADA',
  'DOGE',
  'SOL',
  'TRX',
  'DOT',
  'MATIC',
  'LTC',
  'SHIB',
  'AVAX',
  'UNI',
  'LINK',
  'XLM',
  'BCH',
  'ETC',
  'XMR',
  'ALGO',
  'VET',
  'ATOM',
  'FIL',
  'ICP',
  'APE',
  'SAND',
  'AXS',
  'THETA',
  'HBAR',
  'EGLD',
  'XTZ',
  'NEAR',
  'FLOW',
  'CHZ',
  'MANA',
  'AAVE',
  'COMP',
  'SNX',
  'CRV',
  'KSM',
  'GRT',
  '1INCH',
  'BAT',
  'ZIL',
  'ENJ',
  'KNC',
  'RUNE',
  'CAKE',
  'FTM',
  'MINA',
  'ZRX',
  'CELR',
  'ANKR',
  'QTUM',
  'KAVA',
  'AR',
  'LRC',
  'OMG',
  'HOT',
  'NANO',
  'DASH',
  'WAVES',
  'TFUEL',
  'RVN',
  'IOST',
  'BTT',
  'ZEN',
  'SC',
  'STX',
  'ONE',
  'ROSE',
  'CELO',
  'BAL',
  'YFI',
  'SUSHI',
  'GALA',
  'ILV',
  'LDO',
  'DYDX',
  'ARPA',
  'MASK',
  'OP',
  'ARB',
  'IMX',
  'GNO',
  'ENS',
  'XDC',
  'KAS',
  'PEPE',
  'FLOKI',
  'BABYDOGE',
  'WIF',
  'BONK',
  'TURBO',
  'HOGE',
  'AIDOGE',
  'MEME',
  'POPCAT'
];

const App = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [activeCustomers, setActiveCustomers] = useState(12000);
  const aboutMantra = [
    'Behind every mystery lies another',
    'Where everything is explained, nothing is remembered',
    'Curious... The mind follows what it can’t see'
  ];

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      return;
    }

    setNewsletterSubmitted(true);
    setNewsletterEmail('');
    window.setTimeout(() => {
      setNewsletterSubmitted(false);
    }, 4000);
  };

  useEffect(() => {
    const MIN_CUSTOMERS = 7000;
    const MAX_CUSTOMERS = 18000;

    const targetForCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours() + now.getMinutes() / 60;
      const phase = ((hours - 12) / 24) * Math.PI * 2;
      const normalized = (Math.cos(phase) + 1) / 2; // 0 at midnight, 1 at midday
      return MIN_CUSTOMERS + normalized * (MAX_CUSTOMERS - MIN_CUSTOMERS);
    };

    const intervalId = window.setInterval(() => {
      setActiveCustomers((current) => {
        const target = targetForCurrentTime();
        const directionalDrift = (target - current) * 0.35;
        const randomJitter = Math.floor(Math.random() * 501) - 250; // [-250, 250]
        let nextValue = current + directionalDrift + randomJitter;
        nextValue = Math.min(MAX_CUSTOMERS, Math.max(MIN_CUSTOMERS, nextValue));
        return Math.round(nextValue);
      });
    }, 14000);

    return () => window.clearInterval(intervalId);
  }, []);

  const formatActiveCustomers = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const handleScrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <button
            type="button"
            className="brand-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <span className="brand-logo-wrapper">
              <span className="brand-logo" role="img" aria-label="CaliOps logo" />
            </span>
            <span className="brand-text">
              <span className="brand-mark">cryptomatrix.ai</span>
              <span className="brand-tagline">Automated trading that works while you sleep</span>
            </span>
          </button>
        </div>
        <nav className="nav">
          <a href="#home" onClick={handleScrollToTop}>
            Home
          </a>
          <a href="#exchanges">Exchanges</a>
          <a href="#algorithms">Algorithms</a>
          <a href="#connect">Connect</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <h1>
              Intelligent <span className="gradient-text">crypto trading</span> for modern investors
            </h1>
            <p>
              Connect your exchange accounts securely with API keys and let our bots execute strategies 24/7. You keep
              full control while we handle the trades.
            </p>
            <a className="cta-button" href="#contact">
              Get Started
            </a>
          </div>
          <div className="hero-visual">
            <div className="orbital" aria-hidden="true">
              <div className="orbital-ring orbital-ring--one">
                <span className="orbital-planet" />
              </div>
              <div className="orbital-ring orbital-ring--two">
                <span className="orbital-planet" />
              </div>
              <div className="orbital-ring orbital-ring--three">
                <span className="orbital-planet" />
              </div>
            </div>
            <div className="orbital-stat">
              <span className="orbital-stat-value">{formatActiveCustomers(activeCustomers)}</span>
              <p className="orbital-stat-caption">Earners siphoning a fortune from crypto volatility inside Cryptomatrix right now</p>
            </div>
          </div>
          <div className="orbital-marquee" aria-label="Top cryptocurrencies and memecoins">
            <div className="orbital-marquee-track">
              {marqueeCoins.concat(marqueeCoins).map((coin, index) => (
                <span key={`orbital-coin-${index}`} className="orbital-marquee-coin">
                  {coin}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="exchanges" className="exchanges-section">
          <h2 className="section-title gradient-text">Supported Exchanges</h2>
          <p className="section-intro">Trade on top exchanges through a single secure interface where API keys stay encrypted and under your control</p>
          <ExchangesShowcase />
        </section>

        <section id="algorithms" className="algorithms-section">
          <h2 className="section-title gradient-text">Algorithm Playbook</h2>
          <p className="section-intro">Deploy proven technical, quantitative, and execution strategies tailored for 24/7 crypto markets</p>
          <AlgorithmsShowcase />
        </section>

        <section id="connect" className="connect-section">
          <h2 className="section-title gradient-text">Exchange Connection</h2>
          <p className="section-intro">Link exchange accounts with read and trade permissions to enable automated strategies</p>
          <ConnectForm />
        </section>

        <section id="pricing" className="pricing-section">
          <h2 className="section-title gradient-text">Grow With Confidence</h2>
          <p className="section-intro">
            One flat subscription unlocks the automation stack hedge funds spend six figures building&mdash;signal engines,
            execution algos, and 24/7 oversight tuned for crypto volatility.
          </p>
          <div className="pricing-card card">
            <div className="pricing-card-header">
              <span className="pricing-label">AI Plan</span>
              <p className="pricing-value">
                $99<span>/month</span>
              </p>
            </div>
            <p className="pricing-promise">
              Capture more fills, slash manual grind, and scale strategies without hiring a quant desk. If you can capture a single
              extra basis point per day, the subscription pays for itself many times over.
            </p>
            <ul className="pricing-features">
              <li>Unlimited exchange connections with hardware-backed API key storage</li>
              <li>Pre-tuned strategy library plus custom signal uploads</li>
              <li>Real-time risk guardrails, alerts, and incident response</li>
              <li>Concierge onboarding to map bots to your liquidity footprint</li>
            </ul>
            <a className="cta-button pricing-cta" href="#contact">
              Dive Into The Matrix
            </a>
            <p className="pricing-guarantee">No lock-in. If we do not earn multiples on $99 in your first cycle, cancel instantly.</p>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2 className="section-title gradient-text">About Us</h2>
          <p className="section-intro">
            Cryptomatrix is a collective of quants, engineers, and market makers building autonomous strategies that
            outpace the market without sacrificing security.
          </p>
          <div className="about-marquee" aria-label="Cryptomatrix guiding principles">
            <div className="about-marquee-track">
              {aboutMantra.concat(aboutMantra).map((phrase, index) => (
                <span key={`mantra-${index}`} className="about-marquee-phrase">
                  “{phrase}”
                </span>
              ))}
            </div>
          </div>
          <div className="about-grid">
            <div className="card about-card">
              <h3>We build with conviction</h3>
              <p>
                Our trading stack blends advanced signal engines with real-time risk controls, letting us deploy
                institutional-grade strategies across every major exchange.
              </p>
            </div>
            <div className="card about-card">
              <h3>We scale together</h3>
              <p>
                From hacker house prototypes to fully automated trading desks, we turn ideas into products alongside
                partners who want to move fast and win bigger.
              </p>
            </div>
            <div className="card about-card">
              <h3>We’re looking for co-creators</h3>
              <p>
                If you thrive on shipping, obsess over markets, and want to shape the next wave of crypto automation,
                we want you on the team.
              </p>
            </div>
          </div>
          <a className="cta-button about-cta" href="#contact">
            Join the Mission
          </a>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="section-title gradient-text">Contact</h2>
          <p className="section-intro">Reach out and our specialists will help you integrate Cryptomatrix with your preferred exchanges</p>
          <div className="contact-grid">
            <ContactForm />
            <ContactInformation />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-summary">
              <span className="footer-logo">cryptomatrix.ai</span>
              <p className="footer-summary-copy">
                Automation playbooks, exchange readiness checklists, and custody best practices shipped straight to your desk.
              </p>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#home">Home</a>
              <a href="#exchanges">Exchanges</a>
              <a href="#algorithms">Algorithms</a>
              <a href="#connect">Connect</a>
              <a href="#pricing">Pricing</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="footer-social">
              <h4>Connect</h4>
              <div className="footer-social-icons">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a key={name} className="footer-social-icon" href={href} aria-label={name}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <label className="footer-newsletter-label" htmlFor="newsletter-email">
                Newsletter
              </label>
              <div className="footer-newsletter-fields">
                <input
                  id="newsletter-email"
                  name="newsletter-email"
                  type="email"
                  placeholder="you@desk.com"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
              <p className="footer-newsletter-copy">Weekly dispatch covering crypto execution alpha and infrastructure releases.</p>
              {newsletterSubmitted && (
                <p className="footer-newsletter-message" role="status">
                  Thanks for subscribing. Check your inbox for a confirmation link.
                </p>
              )}
            </form>
          </div>

          <div className="footer-legal">
            <div className="footer-legal-item">
              <h4>Privacy Policy</h4>
              <p>
                We encrypt every API credential, restrict data retention, and only monitor markets on your behalf.{' '}
                <a href="/privacy">Review our data practices</a>.
              </p>
            </div>
            <div className="footer-legal-item">
              <h4>Terms of Use</h4>
              <p>
                Trading automation is provided for professional operators. Know your jurisdiction, manage risk, and confirm exchange compliance.{' '}
                <a href="/terms">See full terms</a>.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Cryptomatrix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
