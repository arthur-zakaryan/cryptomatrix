import type { FC } from 'react';

interface CoinStudioPageProps {
  onNavigateHome: () => void;
  onNavigateToContact: () => void;
}

const deliverables = [
  {
    title: 'Token blueprint & economics',
    description:
      'Co-create a distinctive name, symbol, supply model, and distribution plan that energizes your community while keeping liquidity healthy from day one.'
  },
  {
    title: 'Launch collateral kit',
    description:
      'Get the landing page copy, sales deck modules, and announcement templates that explain your token utility with the same gradients and visuals the Cryptomatrix brand runs.'
  },
  {
    title: 'Compliance-ready documentation',
    description:
      'Risk disclosures, utility positioning, and distribution checklists written with legal review in mind so you can brief partners and marketplaces quickly.'
  }
];

const launchSteps = [
  {
    title: 'Discovery workshop',
    description:
      'We map your vision, audiences, and utility in a 60-minute session, then finalize tokenomics and technical requirements within 48 hours.'
  },
  {
    title: 'Token configuration sprint',
    description:
      'Our engineers configure SPL or ERC-20 parameters, generate issuance instructions, and prepare deployment checklists so you stay in full control.'
  },
  {
    title: 'Branding & collateral',
    description:
      'Design team shapes your hero statements, feature tiles, and launch visuals so your Crypto Studio page, deck, and socials stay on-brand.'
  },
  {
    title: 'Launch rehearsal',
    description:
      'We walk your team through liquidity seeding, community announcements, and post-launch monitoring with a step-by-step command checklist.'
  }
];

const supportHighlights = [
  {
    title: 'Liquidity playbook',
    description:
      'Guidance on pairing, vesting schedules, and treasury management so the market debut feels engineered—not improvised.'
  },
  {
    title: '24/7 engineering standby',
    description:
      'Direct line to the strategists who tuned your configuration. If something shifts, we respond in minutes, not days.'
  },
  {
    title: 'Growth partner network',
    description:
      'Introductions to exchanges, launchpads, influencers, and legal partners who already trust our execution standards.'
  }
];

const CoinStudioPage: FC<CoinStudioPageProps> = ({ onNavigateHome, onNavigateToContact }) => {
  return (
    <div className="coin-studio-page">
      <header className="coin-studio-hero">
        <button type="button" className="coin-studio-back" onClick={onNavigateHome}>
          ← Back to Cryptomatrix
        </button>
        <span className="coin-studio-eyebrow">Crypto Studio · Custom cryptocurrency creation</span>
        <h1>
          Launch a branded <span className="gradient-text">cryptocurrency</span>
        </h1>
        <p>
          Crypto Studio takes you from idea to fully issued token on proven SPL or ERC-20 rails. We architect tokenomics, finalize
          chain configuration, craft the launch story, and hand you everything needed to activate your community with confidence.
        </p>
        <div className="coin-studio-hero-actions">
          <button type="button" className="cta-button" onClick={onNavigateToContact}>
            Start my project
          </button>
          <a className="coin-studio-secondary" href="#crypto-studio-features">
            Explore deliverables
          </a>
        </div>
        <div className="card coin-studio-price">
          <div className="coin-studio-price-tag">
            <span className="coin-studio-price-amount gradient-text">$999</span>
            <span className="coin-studio-price-caption">Flat project fee</span>
          </div>
          <p>
            Everything you need to launch with conviction: collaborative planning, chain configuration kits, branded collateral, and
            a go-live checklist tuned by the team that automates trades for institutions.
          </p>
          <ul>
            <li>SPL or ERC-20 token configuration package with deployment checklist</li>
            <li>Distribution, liquidity, and vesting framework tailored to your goals</li>
            <li>Launch messaging kit matched to Cryptomatrix gradients and typography</li>
          </ul>
          <p className="coin-studio-note">
            Marketing and community promotion remain with your team—we deliver the configured cryptocurrency and launch playbook.
          </p>
        </div>
      </header>

      <main className="coin-studio-content">
        <section id="crypto-studio-features" className="coin-studio-section">
          <h2 className="coin-studio-heading gradient-text">What we deliver</h2>
          <p className="coin-studio-intro">
            Four core workstreams arrive ready to use, so your community sees polish, clarity, and utility from the first
            announcement.
          </p>
          <div className="coin-studio-grid">
            {deliverables.map((item) => (
              <article key={item.title} className="card coin-studio-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="coin-studio-section">
          <h2 className="coin-studio-heading gradient-text">Launch timeline</h2>
          <p className="coin-studio-intro">
            A structured playbook keeps your launch sprint predictable, transparent, and on-brand at every milestone.
          </p>
          <div className="coin-studio-steps">
            {launchSteps.map((step) => (
              <article key={step.title} className="card coin-studio-step">
                <div className="coin-studio-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="coin-studio-section">
          <h2 className="coin-studio-heading gradient-text">Support beyond deployment</h2>
          <p className="coin-studio-intro">
            Your token launch is just the opening move. We stay on-call with strategy, partners, and tooling so momentum keeps
            compounding.
          </p>
          <div className="coin-studio-support">
            {supportHighlights.map((item) => (
              <article key={item.title} className="card coin-studio-support-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="card coin-studio-cta">
            <h3>Ready to mint your signature asset?</h3>
            <p>
              Share your vision and we will align scope, chain preferences, and roadmap on the very first call. Crypto Studio
              handles the heavy lifting—you keep the ownership.
            </p>
            <button type="button" className="cta-button" onClick={onNavigateToContact}>
              Talk to Crypto Studio
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CoinStudioPage;
