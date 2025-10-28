import { ChangeEvent, FormEvent, useState } from 'react';

type ConnectFormState = {
  apiKey: string;
  apiSecret: string;
};

const initialConnectState: ConnectFormState = {
  apiKey: '',
  apiSecret: ''
};

type ConnectFormProps = {
  onConnectionLog?: (entry: { status: 'success' | 'error'; message: string; details?: unknown }) => void;
};

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path
      d="M12 3 19 6v4.8c0 4.6-2.9 8.8-7 9.7-4.1-.9-7-5.1-7-9.7V6l7-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m9.5 12.5 2 2 3-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NodesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="5" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="5.5" cy="17" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="18.5" cy="17" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.2v4.3m-4.3 3.2 2.7-3.2m9 3.2-2.7-3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const PulseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path
      d="M3.5 12h4l2-6 3 12 2.5-6h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M3 3l18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6 10.65a2.4 2.4 0 013.05 3.05M7.4 7.5C4.8 9.3 3 12 3 12s3.5 6 9.5 6a10.5 10.5 0 005.1-1.3m2.9-4.7S16 6 12 6a9 9 0 00-2.05.24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const connectHighlights = [
  {
    title: 'Bank-grade encryption',
    copy: 'API keys are stored with hardware-backed encryption and never leave your custody.',
    Icon: ShieldIcon
  },
  {
    title: 'Multi-exchange ready',
    copy: 'One setup unlocks Binance, Coinbase, Kraken, and 20+ venues with subaccount support.',
    Icon: NodesIcon
  },
  {
    title: '24/7 credential health',
    copy: 'We monitor permissions and expirations continuously so bots stay authenticated.',
    Icon: PulseIcon
  }
];

const ConnectForm = ({ onConnectionLog }: ConnectFormProps) => {
  const [formState, setFormState] = useState(initialConnectState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState({ apiKey: false, apiSecret: false });

  const handleChange = (field: keyof ConnectFormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [field]: event.target.value });
  };

  const toggleVisibility = (field: keyof ConnectFormState) => () => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.apiKey || !formState.apiSecret) {
      const message = 'API key and secret are required.';
      setStatus({ type: 'error', message });
      onConnectionLog?.({ status: 'error', message });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/kraken/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey: formState.apiKey,
          apiSecret: formState.apiSecret,
          validateOnly: true
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        const message =
          data?.message ||
          (Array.isArray(data?.error) ? data.error.join(' | ') : null) ||
          'Unable to validate credentials with Kraken.';
        onConnectionLog?.({ status: 'error', message, details: data });
        throw new Error(message);
      }

      const message = data?.message || 'Credentials validated with Kraken (no order executed).';
      setStatus({
        type: 'success',
        message
      });
      onConnectionLog?.({ status: 'success', message, details: data?.result ?? null });
      setFormState(initialConnectState);
      setVisibility({ apiKey: false, apiSecret: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error contacting Kraken.';
      setStatus({ type: 'error', message });
      onConnectionLog?.({ status: 'error', message, details: error instanceof Error ? error.stack : error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card connect-card" tabIndex={0}>
      <h3>Connect Your Exchange</h3>
      <p className="card-intro">Enter your API credentials to link an exchange account</p>
      <ul className="connect-highlights">
        {connectHighlights.map(({ title, copy, Icon }) => (
          <li key={title} className="connect-highlight" tabIndex={0}>
            <span className="connect-highlight-icon" aria-hidden="true">
              <Icon />
            </span>
            <div className="connect-highlight-copy">
              <h4>{title}</h4>
              <p>{copy}</p>
            </div>
          </li>
        ))}
      </ul>
      <form className="connect-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="apiKey">API Key</label>
          <div className="input-with-toggle">
            <input
              id="apiKey"
              name="apiKey"
              type={visibility.apiKey ? 'text' : 'password'}
              value={formState.apiKey}
              onChange={handleChange('apiKey')}
              placeholder="Paste your API key"
              required
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={toggleVisibility('apiKey')}
              aria-label={visibility.apiKey ? 'Hide API key' : 'Show API key'}
            >
              {visibility.apiKey ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="apiSecret">API Secret</label>
          <div className="input-with-toggle">
            <input
              id="apiSecret"
              name="apiSecret"
              type={visibility.apiSecret ? 'text' : 'password'}
              value={formState.apiSecret}
              onChange={handleChange('apiSecret')}
              placeholder="Paste your API secret"
              required
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={toggleVisibility('apiSecret')}
              aria-label={visibility.apiSecret ? 'Hide API secret' : 'Show API secret'}
            >
              {visibility.apiSecret ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <button className="cta-button" type="submit">
          {loading ? 'Connecting…' : 'Secure Connect'}
        </button>
        {status.type !== 'idle' && (
          <p className={`form-confirmation${status.type === 'error' ? ' error' : ''}`} role="status">
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ConnectForm;
