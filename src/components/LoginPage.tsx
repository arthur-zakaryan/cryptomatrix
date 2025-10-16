import { useState } from 'react';
import type { FC, FormEvent } from 'react';

interface LoginPageProps {
  onNavigateHome: () => void;
  onNavigateToForgotPassword: () => void;
  onNavigateToSignUp: () => void;
  onLoginSuccess: () => void;
}

const LoginPage: FC<LoginPageProps> = ({
  onNavigateHome,
  onNavigateToForgotPassword,
  onNavigateToSignUp,
  onLoginSuccess
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (email === 'support@cryptomatrix.ai' && password === 'cryptomatrix') {
      setError(null);
      form.reset();
      onLoginSuccess();
      return;
    }

    setError('Those credentials are not recognized. Try the Cryptomatrix support login to view the console.');
  };

  return (
    <div className="login-page">
      <div className="login-back-wrapper">
        <button type="button" className="login-back" onClick={onNavigateHome}>
          ← Back to Cryptomatrix
        </button>
      </div>
      <header className="login-header">
        <h1>Welcome back</h1>
        <p className="login-subtitle">
          <span className="login-subtitle-line">Sign in to manage automations,</span>
          <span className="login-subtitle-line">monitor performance,</span>
          <span className="login-subtitle-line">and control exchange connections.</span>
        </p>
      </header>

      <main className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="login-field">
            <div className="login-field-label">
              <label htmlFor="login-password">Password</label>
              <button type="button" className="login-link" onClick={onNavigateToForgotPassword}>
                Forgot password?
              </button>
            </div>
            <input id="login-password" name="password" type="password" autoComplete="current-password" required placeholder="Enter your password" />
          </div>
          <div className="login-actions">
            <label className="login-remember">
              <input type="checkbox" name="remember" />
              <span>Keep me signed in on this device</span>
            </label>
            <button type="submit" className="login-submit">
              Sign In
            </button>
          </div>
          {error ? (
            <div className="login-error" role="alert">
              {error}
            </div>
          ) : null}
        </form>

        <footer className="login-footer">
          <span>New to Cryptomatrix?</span>
          <button type="button" className="login-link" onClick={onNavigateToSignUp}>
            Create an account
          </button>
        </footer>
      </main>
    </div>
  );
};

export default LoginPage;
