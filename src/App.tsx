import ConnectForm from './components/ConnectForm';
import ContactForm from './components/ContactForm';
import ContactInformation from './components/ContactInformation';
import ExchangesShowcase from './components/ExchangesShowcase';
import AlgorithmsShowcase from './components/AlgorithmsShowcase';
import './App.css';

const App = () => {
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
            <span className="brand-mark">cryptomatrix.ai</span>
          </button>
          <p className="brand-tagline">Automated trading that works while you sleep</p>
        </div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#exchanges">Exchanges</a>
          <a href="#algorithms">Algorithms</a>
          <a href="#connect">Connect</a>
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

        <section id="about" className="about-section">
          <h2 className="section-title gradient-text">About Us</h2>
          <p className="section-intro">
            Cryptomatrix is a collective of quants, engineers, and market makers building autonomous strategies that
            outpace the market without sacrificing security.
          </p>
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
          <p>© {new Date().getFullYear()} Cryptomatrix. All rights reserved.</p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#exchanges">Exchanges</a>
            <a href="#algorithms">Algorithms</a>
            <a href="#connect">Connect</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
