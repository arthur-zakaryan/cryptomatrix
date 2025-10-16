import type { FC } from 'react';
import ConnectForm from './ConnectForm';

type UserAccountPageProps = {
  onNavigateHome: () => void;
  onLogout: () => void;
};

type Metric = {
  label: string;
  value: string;
  change: string;
  tone: 'positive' | 'neutral' | 'negative';
};

type Bot = {
  name: string;
  status: 'Running' | 'Paused';
  exchange: string;
  pair: string;
  allocation: string;
  runtime: string;
  pnl: string;
  pnlTone: 'positive' | 'negative';
};

type ChecklistItem = {
  label: string;
  completed: boolean;
};

const accountMetrics: Metric[] = [
  { label: 'Total Equity', value: '$125,430', change: '+4.7% 24h', tone: 'positive' },
  { label: 'Available Balance', value: '$38,200', change: 'Ready to deploy', tone: 'neutral' },
  { label: 'Bots Online', value: '6 / 8', change: '2 paused for review', tone: 'neutral' },
  { label: 'Risk Score', value: 'Moderate', change: '70% guardrails active', tone: 'neutral' }
];

const runningBots: Bot[] = [
  { name: 'Gamma Scalper', status: 'Running', exchange: 'Binance', pair: 'BTC/USDT', allocation: '$35k', runtime: 'Live 14h', pnl: '+$4,320', pnlTone: 'positive' },
  { name: 'Arb Matrix', status: 'Running', exchange: 'Kraken', pair: 'ETH/EUR', allocation: '$20k', runtime: 'Live 3d 2h', pnl: '+$9,780', pnlTone: 'positive' },
  { name: 'Momentum Stack', status: 'Paused', exchange: 'Coinbase', pair: 'SOL/USD', allocation: '$12k', runtime: 'Paused 1h', pnl: '+$1,260', pnlTone: 'positive' }
];

const checklist: ChecklistItem[] = [
  { label: 'Verify identity documents', completed: true },
  { label: 'Enable withdrawal whitelist', completed: true },
  { label: 'Configure multi-sig approvals', completed: false },
  { label: 'Set portfolio drawdown alerts', completed: false }
];

const notifications = [
  {
    title: 'Execution update',
    detail: 'Gamma Scalper filled 18 trades in the last hour with 92% hit rate.'
  },
  {
    title: 'Risk guardrail',
    detail: 'Momentum Stack paused after reaching daily loss threshold of 2.5%.'
  },
  {
    title: 'Credential reminder',
    detail: 'Kraken trading key expires in 6 days. Rotate credentials to avoid downtime.'
  }
];

const UserAccountPage: FC<UserAccountPageProps> = ({ onNavigateHome, onLogout }) => {
  return (
    <div className="user-account-page">
      <header className="user-account-header">
        <div className="user-brand">
          <button type="button" className="user-brand-link" onClick={onNavigateHome}>
            ← Cryptomatrix
          </button>
          <div className="user-brand-copy">
            <h1>Control Center</h1>
            <p>Connect exchanges, monitor automations, and respond to market signals in real time.</p>
          </div>
        </div>
        <div className="user-session">
          <div className="user-session-details">
            <span className="user-session-name">support@cryptomatrix.ai</span>
            <span className="user-session-role">AI Plan</span>
          </div>
          <button type="button" className="user-session-logout" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="user-account-content">
        <section className="user-metrics">
          {accountMetrics.map(({ label, value, change, tone }) => (
            <article key={label} className="user-metric-card" tabIndex={0}>
              <span className="user-metric-label">{label}</span>
              <span className="user-metric-value">{value}</span>
              <span className={`user-metric-change user-metric-change--${tone}`}>{change}</span>
            </article>
          ))}
        </section>

        <section className="user-grid">
          <div className="user-grid-main">
            <div className="user-panel card" tabIndex={0}>
              <header className="user-panel-header">
                <h2>Automation snapshot</h2>
                <span className="user-panel-subtitle">Live performance, uptime, and guardrails per bot</span>
              </header>
              <ul className="user-bot-list">
                {runningBots.map(({ name, status, exchange, pair, allocation, runtime, pnl, pnlTone }) => (
                  <li key={name} className="user-bot-row">
                    <div className="user-bot-main">
                      <span className="user-bot-name">{name}</span>
                      <div className="user-bot-main-meta">
                        <span className={`user-bot-pnl user-bot-pnl--${pnlTone}`}>{pnl}</span>
                        <span className={`user-bot-status user-bot-status--${status.toLowerCase()}`}>{status}</span>
                      </div>
                    </div>
                    <div className="user-bot-meta">
                      <span>{exchange}</span>
                      <span>{pair}</span>
                      <span>{allocation}</span>
                      <span className="user-bot-runtime">{runtime}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="user-panel card" tabIndex={0}>
              <header className="user-panel-header">
                <h2>Operational checklist</h2>
                <span className="user-panel-subtitle">Guard your infrastructure and capital</span>
              </header>
              <ul className="user-checklist">
                {checklist.map(({ label, completed }) => (
                  <li key={label} className="user-checklist-item">
                    <span className={`user-checklist-status ${completed ? 'user-checklist-status--done' : 'user-checklist-status--todo'}`} aria-hidden="true">
                      {completed ? '✓' : '•'}
                    </span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="user-grid-sidebar">
              <div className="user-panel card" tabIndex={0}>
                <header className="user-panel-header">
                  <h2>Latest activity</h2>
                  <span className="user-panel-subtitle">Monitor signals, fills, and security notices</span>
                </header>
                <ul className="user-notifications">
                  {notifications.map(({ title, detail }) => (
                    <li key={title} className="user-notification">
                      <strong>{title}</strong>
                      <p>{detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <aside className="user-grid-sidebar">
            <div className="user-panel user-panel--sticky card" tabIndex={0}>
              <header className="user-panel-header">
                <h2>Connect an exchange</h2>
                <span className="user-panel-subtitle">
                  Activate read + trade APIs to deploy bots. Keys stay encrypted client-side.
                </span>
              </header>
              <ConnectForm />
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default UserAccountPage;
