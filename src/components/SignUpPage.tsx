import { useMemo, useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';

const countryOptions = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Ireland',
  'New Zealand',
  'Singapore',
  'Hong Kong',
  'Japan',
  'South Korea'
];

interface SignUpPageProps {
  onNavigateHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToTerms: () => void;
  onNavigateToPrivacy: () => void;
}

const SignUpPage: FC<SignUpPageProps> = ({ onNavigateHome, onNavigateToLogin, onNavigateToTerms, onNavigateToPrivacy }) => {
  const [countryInput, setCountryInput] = useState('');
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);

  const countrySuggestions = useMemo(() => {
    const normalized = countryInput.trim().toLowerCase();

    if (!normalized) {
      return countryOptions.slice(0, 8);
    }

    return countryOptions.filter((country) => country.toLowerCase().includes(normalized)).slice(0, 8);
  }, [countryInput]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountryInput(event.target.value);
    setShowCountrySuggestions(true);
  };

  const handleCountrySelect = (country: string) => {
    setCountryInput(country);
    setShowCountrySuggestions(false);
  };

  const handleCountryFocus = () => {
    setShowCountrySuggestions(true);
  };

  const handleCountryBlur = () => {
    window.setTimeout(() => setShowCountrySuggestions(false), 120);
  };

  return (
    <div className="signup-page">
      <div className="signup-back-wrapper">
        <button type="button" className="signup-back" onClick={onNavigateHome}>
          ← Back to Cryptomatrix
        </button>
      </div>
      <header className="signup-header">
        <h1>Create your account</h1>
        <p className="signup-subtitle">
          Secure API key management, automated execution, and real-time oversight start with a Cryptomatrix profile tailored to you.
        </p>
      </header>

      <main className="signup-card">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-row">
            <div className="signup-field">
              <label htmlFor="signup-first-name">First name</label>
              <input id="signup-first-name" name="firstName" type="text" autoComplete="given-name" required placeholder="Satoshi" />
            </div>
            <div className="signup-field">
              <label htmlFor="signup-last-name">Last name</label>
              <input id="signup-last-name" name="lastName" type="text" autoComplete="family-name" required placeholder="Nakamoto" />
            </div>
          </div>
          <div className="signup-row">
            <div className="signup-field">
              <label htmlFor="signup-email">Email</label>
              <input id="signup-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </div>
            <div className="signup-field">
              <label htmlFor="signup-phone">Phone number</label>
              <input id="signup-phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 415 555 0199" />
            </div>
          </div>
          <div className="signup-row">
            <div className="signup-field">
              <label htmlFor="signup-dob">Date of birth</label>
              <input id="signup-dob" name="dob" type="date" required />
            </div>
            <div className="signup-field signup-country-field">
              <label htmlFor="signup-country">Country</label>
              <input
                id="signup-country"
                name="country"
                type="text"
                autoComplete="country"
                required
                placeholder="United States"
                value={countryInput}
                onChange={handleCountryChange}
                onFocus={handleCountryFocus}
                onBlur={handleCountryBlur}
                aria-autocomplete="list"
                aria-expanded={showCountrySuggestions}
                aria-controls="signup-country-suggestion-list"
              />
              {showCountrySuggestions && countrySuggestions.length > 0 ? (
                <ul className="signup-country-suggestions" id="signup-country-suggestion-list" role="listbox">
                  {countrySuggestions.map((country) => (
                    <li key={country}>
                      <button
                        type="button"
                        className="signup-country-option"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleCountrySelect(country)}
                        role="option"
                      >
                        {country}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="signup-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Choose a strong password"
            />
          </div>
          <div className="signup-field">
            <label htmlFor="signup-confirm-password">Confirm password</label>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Re-enter your password"
            />
          </div>
          <div className="signup-actions">
            <label className="signup-terms">
              <input type="checkbox" name="terms" required />
              <span>
                I agree to the{' '}
                <button type="button" className="signup-inline-link" onClick={onNavigateToTerms}>
                  Terms of Use
                </button>{' '}
                and{' '}
                <button type="button" className="signup-inline-link" onClick={onNavigateToPrivacy}>
                  Privacy Policy
                </button>
                .
              </span>
            </label>
            <button type="submit" className="signup-submit">
              Create account
            </button>
          </div>
        </form>

        <footer className="signup-footer">
          <span>Already have an account?</span>
          <button type="button" className="signup-inline-link" onClick={onNavigateToLogin}>
            Sign in
          </button>
        </footer>
      </main>
    </div>
  );
};

export default SignUpPage;
