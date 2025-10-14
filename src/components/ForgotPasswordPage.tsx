import { FormEvent, useState } from 'react';
import type { FC } from 'react';

interface ForgotPasswordPageProps {
  onNavigateHome: () => void;
  onNavigateBackToLogin: () => void;
}

const ForgotPasswordPage: FC<ForgotPasswordPageProps> = ({ onNavigateHome, onNavigateBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    // TODO: wire real reset endpoint
    window.setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-back-wrapper">
        <button type="button" className="forgot-back" onClick={onNavigateBackToLogin}>
          ← Back to Login
        </button>
      </div>
      <header className="forgot-header">
        <h1>Forgot your password?</h1>
        <p className="forgot-subtitle">
          Enter the email connected to your Cryptomatrix account and we&apos;ll send a secure link to reset your password.
        </p>
      </header>

      <main className="forgot-card">
        <form className="forgot-form" onSubmit={handleSubmit}>
          <label className="forgot-field" htmlFor="forgot-email">
            <span>Email address</span>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitted}
            />
          </label>
          <button type="submit" className="forgot-submit" disabled={submitted}>
            {submitted ? 'Check your inbox' : 'Send reset link'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
