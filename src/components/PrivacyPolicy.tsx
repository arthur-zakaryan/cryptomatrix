import type { FC } from 'react';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
  onNavigateToTerms: () => void;
}

const policySections = [
  {
    title: 'What We Collect',
    paragraphs: [
      'Cryptomatrix captures only the signals required to automate your trading safely. We store account identifiers, API permission scopes, workflow metadata, and platform usage analytics. We never ingest raw balance history without explicit consent.',
      'Payment information is processed through certified partners and is never persisted on Cryptomatrix infrastructure.'
    ],
    bullets: [
      'API keys and secrets supplied by you or your team',
      'Exchange account aliases and operational metadata',
      'Strategy configuration, deployment timestamps, and execution logs',
      'Essential telemetry that helps us secure sessions and detect anomalies'
    ]
  },
  {
    title: 'How We Protect Exchange Credentials',
    paragraphs: [
      'Hardware-backed HSMs encrypt every credential the moment it reaches our edge. Secrets are segmented by tenant and rotated with automated key ceremonies. Operators can never retrieve raw API material; all usage occurs via ephemeral signing inside the secure enclave.',
      'All infrastructure touching credentials is locked behind zero-trust controls, short-lived workload identities, and mandatory audit review.'
    ],
    bullets: [
      'AES-256 encryption at rest with unique keys per exchange profile',
      'In-flight protection via TLS 1.3+ with forward secrecy',
      'Privileged access requires hardware tokens, biometric verification, and session recording',
      'Continuous intrusion detection with automated revocation when drift is detected'
    ]
  },
  {
    title: 'Usage & Retention',
    paragraphs: [
      'We process data solely to deliver automation, monitor risk, and keep your workspace operational. Trading signals and execution metadata are retained for 12 months to power compliance reviews and performance analytics, then cryptographically shredded.',
      'If you disconnect an exchange, credentials are purged instantly and replicated backups are overwritten during the next scheduled sweep.'
    ]
  },
  {
    title: 'Your Controls',
    paragraphs: [
      'You own every credential, dataset, and automation we operate on your behalf. You can download audit trails, request deletion, or restrict processing for specific venues at any time from the control center or by contacting us directly.',
      'We respond to access or deletion requests within one business day and complete verified removals within ten.'
    ],
    bullets: [
      'Revoke API scopes or entire accounts with one click',
      'Request encrypted exports of execution history',
      'Nominate additional compliance contacts for shared notifications',
      'Escalate any concern to our trust desk and receive human follow up'
    ]
  }
];

const commitments = [
  {
    title: 'Zero Custody',
    description: 'Bots trade on your accounts without relocating assets. Funds stay on the exchange you already trust.'
  },
  {
    title: 'Security First',
    description: 'Independent penetration testing, 24/7 monitoring, and third-party attestations keep attack surfaces hardened.'
  },
  {
    title: 'Transparency',
    description: 'Every action is logged, replayable, and attributable so your compliance team always has the complete picture.'
  }
];

const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ onNavigateHome, onNavigateToTerms }) => {
  return (
    <div className="privacy-page">
      <header className="privacy-hero">
        <button type="button" className="privacy-back" onClick={onNavigateHome}>
          ← Back to Cryptomatrix
        </button>
        <span className="privacy-eyebrow">Privacy Policy &amp; Data Practices</span>
        <h1>Trust is engineered into every automation cycle</h1>
        <p>
          Crypto Matrix is built for institutional desks that demand uncompromising custody controls. The following policy details how we
          collect, safeguard, and use your data while our strategies work on your behalf.
        </p>
      </header>

      <main className="privacy-content">
        {policySections.map((section) => (
          <section key={section.title} className="privacy-section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.title}-paragraph-${index}`}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((item) => (
                  <li key={`${section.title}-bullet-${item}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="privacy-section">
          <h2>Our Standing Commitments</h2>
          <div className="privacy-commitments">
            {commitments.map((commitment) => (
              <article key={commitment.title} className="privacy-commitment">
                <h3>{commitment.title}</h3>
                <p>{commitment.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="privacy-footer">
        <div className="privacy-contact">
          <h3>Need a data export or custom agreement?</h3>
          <p>
            Reach our trust desk and we will coordinate the verification steps, encrypted delivery, or bespoke documentation your team needs.
          </p>
          <a className="privacy-email" href="mailto:support@cryptomatrix.ai">
            support@cryptomatrix.ai
          </a>
        </div>
        <div className="privacy-actions">
          <button type="button" className="privacy-return" onClick={onNavigateHome}>
            Return to the trading homepage
          </button>
          <button type="button" className="privacy-secondary" onClick={onNavigateToTerms}>
            Review our Terms of Use
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
