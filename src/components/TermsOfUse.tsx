import type { FC } from 'react';

interface TermsOfUseProps {
  onNavigateHome: () => void;
  onNavigateToPrivacy: () => void;
}

const termsPrinciples = [
  {
    title: 'Operator Responsibilities',
    paragraphs: [
      'You remain the account owner for every connected exchange. Crypto Matrix executes automation according to your explicit configuration and never trades discretionary positions on your behalf.',
      'It is your obligation to confirm that API keys are scoped to the minimum permissions required, and that automated trading is lawful within your jurisdiction.'
    ],
    bullets: [
      'Maintain accurate, active exchange credentials and update them when venues rotate keys.',
      'Retain sufficient balance to support open positions, required margin, and exchange fees.',
      'Monitor automated activity regularly to validate strategy performance and risk posture.',
      'Inform us immediately if you detect unauthorized access or suspect credential compromise.'
    ]
  },
  {
    title: 'Platform Commitments',
    paragraphs: [
      'Crypto Matrix delivers execution tooling, risk automation, and infrastructure reliability. We manage platform uptime targets of 99.9% and provide 24/7 incident response for critical outages.',
      'We reserve the right to pause or disable automations that violate exchange policies, AML directives, or threaten platform stability.'
    ],
    bullets: [
      'Advance notice for scheduled maintenance windows whenever feasible.',
      'Real-time alerts for degraded connectivity, API bans, or strategy faults.',
      'Hardware-backed key management that prevents staff from viewing raw secrets.',
      'Versioned change logs for strategies, connectors, and risk guardrails.'
    ]
  },
  {
    title: 'Acceptable Use',
    paragraphs: [
      'You may not employ Crypto Matrix to manipulate markets, launder funds, breach exchange TOS, or violate sanctions. We suspend accounts that trigger compliance investigations or ignore risk advisories.',
      'If regulators, exchanges, or law enforcement require cooperation, we comply within legal boundaries and notify you when permissible.'
    ]
  },
  {
    title: 'Fees & Billing',
    paragraphs: [
      'Subscriptions renew monthly. Fees are non-refundable except where required by law. Cancellation takes effect at the end of the current billing cycle.',
      'Late or failed payments may cause automation pauses. Reactivation requires settling outstanding invoices and confirming payment details.'
    ]
  },
  {
    title: 'Liability',
    paragraphs: [
      'Trading digital assets carries risk. Crypto Matrix supplies tools; execution outcomes remain your responsibility. We are not liable for trading losses, market halts, or exchange-specific downtime.',
      'Our liability for service defects is limited to the fees paid for the current subscription term.'
    ]
  }
];

const escalationChannels = [
  {
    title: 'Urgent Trade Impact',
    description: 'Page us at support@cryptomatrix.ai for round-the-clock incident triage. Provide exchange, markets, and affected strategies.'
  },
  {
    title: 'Compliance Matters',
    description: 'Email compliance@cryptomatrix.ai with subpoena, regulator request, or venue inquiry details and we will coordinate secure handling.'
  },
  {
    title: 'General Support',
    description: 'Start a ticket in the control center or message support@cryptomatrix.ai for configuration help, feature feedback, or account updates.'
  }
];

const TermsOfUse: FC<TermsOfUseProps> = ({ onNavigateHome, onNavigateToPrivacy }) => {
  return (
    <div className="privacy-page terms-page">
      <header className="privacy-hero">
        <button type="button" className="privacy-back" onClick={onNavigateHome}>
          ← Back to Cryptomatrix
        </button>
        <span className="privacy-eyebrow">Terms of Use</span>
        <h1>Automation power with institutional guardrails</h1>
        <p>
          These terms define how Crypto Matrix operates, what you can expect from our automation platform, and the responsibilities you accept when you
          connect trading accounts. Read them carefully before enabling strategies.
        </p>
      </header>

      <main className="privacy-content">
        {termsPrinciples.map((section) => (
          <section key={section.title} className="privacy-section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.title}-paragraph-${index}`}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((item, idx) => (
                  <li key={`${section.title}-bullet-${idx}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="privacy-section">
          <h2>Escalation Channels</h2>
          <div className="privacy-commitments">
            {escalationChannels.map((channel) => (
              <article key={channel.title} className="privacy-commitment">
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="privacy-footer">
        <div className="privacy-contact">
          <h3>Need a tailored contract or enterprise SLA?</h3>
          <p>
            Contact our legal desk to formalize custom language, review procurement requirements, or align third-party risk questionnaires with your governance program.
          </p>
          <a className="privacy-email" href="mailto:legal@cryptomatrix.ai">
            legal@cryptomatrix.ai
          </a>
        </div>
        <div className="privacy-actions">
          <button type="button" className="privacy-return" onClick={onNavigateHome}>
            Return to the trading homepage
          </button>
          <button type="button" className="privacy-secondary" onClick={onNavigateToPrivacy}>
            Review our privacy practices
          </button>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfUse;
