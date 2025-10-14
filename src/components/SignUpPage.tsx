import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';

const MIN_YEAR = 1900;
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const countryOptions = [
  'United States',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo, Democratic Republic of the',
  'Congo, Republic of the',
  'Costa Rica',
  "Cote d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
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
  const [dobValue, setDobValue] = useState('');
  const [dobInputValue, setDobInputValue] = useState('');
  const [isDobOpen, setIsDobOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), 1);
  });

  const dobInputRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const formatDateForInput = (date: Date) => {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const countrySuggestions = useMemo(() => {
    const normalized = countryInput.trim().toLowerCase();

    if (!normalized) {
      return countryOptions;
    }

    return countryOptions.filter((country) => country.toLowerCase().includes(normalized));
  }, [countryInput]);

  const calendarWeeks = useMemo(() => {
    const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
    const lastDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0);
    const startOffset = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const days: Array<Date | null> = [];

    for (let i = 0; i < startOffset; i += 1) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day += 1) {
      days.push(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day));
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    const weeks: Array<Array<Date | null>> = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, [calendarMonth]);

  const today = useMemo(() => {
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    return base;
  }, []);

  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    const list: number[] = [];
    for (let year = currentYear; year >= MIN_YEAR; year -= 1) {
      list.push(year);
    }
    return list;
  }, [today]);

  const isNextMonthDisabled = useMemo(() => {
    const next = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
    next.setHours(0, 0, 0, 0);
    return next > today;
  }, [calendarMonth, today]);

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

  const parseDobDigits = (digits: string) => {
    if (digits.length !== 8) {
      return null;
    }

    const month = Number(digits.slice(0, 2));
    const day = Number(digits.slice(2, 4));
    const year = Number(digits.slice(4, 8));

    if (month < 1 || month > 12 || day < 1 || day > 31 || year < MIN_YEAR) {
      return null;
    }

    const candidate = new Date(year, month - 1, day);
    if (candidate.getFullYear() !== year || candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
      return null;
    }

    if (candidate > today) {
      return null;
    }

    return candidate;
  };

  const handleDobInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 8);

    let formatted = digits;
    if (digits.length <= 2) {
      formatted = digits;
    } else if (digits.length <= 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    }

    setDobInputValue(formatted);

    const parsed = parseDobDigits(digits);
    if (parsed) {
      const iso = `${parsed.getFullYear()}-${`${parsed.getMonth() + 1}`.padStart(2, '0')}-${`${parsed.getDate()}`.padStart(2, '0')}`;
      setDobValue(iso);
      setCalendarMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
    } else {
      setDobValue('');
    }
  };

  const handleDobInputBlur = () => {
    if (!dobInputValue) {
      setDobValue('');
      return;
    }

    const digits = dobInputValue.replace(/\D/g, '');
    const parsed = parseDobDigits(digits);
    if (parsed) {
      const iso = `${parsed.getFullYear()}-${`${parsed.getMonth() + 1}`.padStart(2, '0')}-${`${parsed.getDate()}`.padStart(2, '0')}`;
      setDobValue(iso);
      setDobInputValue(formatDateForInput(parsed));
    }
  };

  const handleDobFocus = () => {
    if (dobValue) {
      const parsed = new Date(dobValue);
      if (!Number.isNaN(parsed.getTime())) {
        setCalendarMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
        setDobInputValue(formatDateForInput(parsed));
      }
    }
    setIsDobOpen(true);
  };

  const handleDobMonthChange = (offset: number) => {
    setCalendarMonth((current) => {
      const next = new Date(current.getFullYear(), current.getMonth() + offset, 1);
      next.setHours(0, 0, 0, 0);
      if (offset > 0 && next > today) {
        return new Date(today.getFullYear(), today.getMonth(), 1);
      }

      if (next.getFullYear() < MIN_YEAR) {
        return new Date(MIN_YEAR, 0, 1);
      }
      return next;
    });
  };

  const handleDobMonthSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = Number(event.target.value);
    if (Number.isNaN(monthIndex)) {
      return;
    }

    setCalendarMonth((current) => {
      const candidate = new Date(current.getFullYear(), monthIndex, 1);
      candidate.setHours(0, 0, 0, 0);
      if (candidate > today) {
        return new Date(today.getFullYear(), today.getMonth(), 1);
      }
      return candidate;
    });
  };

  const handleDobYearSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(event.target.value);
    if (Number.isNaN(newYear)) {
      return;
    }

    setCalendarMonth((current) => {
      let monthIndex = current.getMonth();
      if (newYear === today.getFullYear() && monthIndex > today.getMonth()) {
        monthIndex = today.getMonth();
      }

      const candidate = new Date(newYear, monthIndex, 1);
      candidate.setHours(0, 0, 0, 0);
      if (candidate.getFullYear() < MIN_YEAR) {
        return new Date(MIN_YEAR, 0, 1);
      }

      if (candidate > today) {
        return new Date(today.getFullYear(), today.getMonth(), 1);
      }

      return candidate;
    });
  };

  const handleDobSelect = (date: Date) => {
    if (date > today) {
      return;
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    setDobValue(`${year}-${month}-${day}`);
    setDobInputValue(formatDateForInput(date));
    setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setIsDobOpen(false);
  };

  useEffect(() => {
    if (!isDobOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current?.contains(event.target as Node)) {
        return;
      }

      if (dobInputRef.current?.contains(event.target as Node)) {
        return;
      }

      setIsDobOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDobOpen]);

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
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="signup-row">
            <div className="signup-field signup-dob-field">
              <label htmlFor="signup-dob">Date of birth</label>
              <input
                id="signup-dob"
                type="text"
                placeholder="mm/dd/yyyy"
                value={dobInputValue}
                onFocus={handleDobFocus}
                onChange={handleDobInputChange}
                onBlur={handleDobInputBlur}
                ref={dobInputRef}
                aria-haspopup="dialog"
                aria-expanded={isDobOpen}
                required
              />
              <input type="hidden" name="dob" value={dobValue} />
              {isDobOpen ? (
                <div className="signup-calendar" role="dialog" ref={calendarRef}>
                  <div className="signup-calendar-header">
                    <button type="button" onClick={() => handleDobMonthChange(-1)} aria-label="Previous month">
                      ‹
                    </button>
                    <div className="signup-calendar-selects">
                      <span className="signup-calendar-select-wrapper">
                        <select
                          className="signup-calendar-select signup-calendar-select--month"
                          value={calendarMonth.getMonth()}
                          onChange={handleDobMonthSelectChange}
                          aria-label="Select month"
                        >
                          {monthNames.map((name, index) => (
                            <option
                              key={name}
                              value={index}
                              disabled={calendarMonth.getFullYear() === today.getFullYear() && index > today.getMonth()}
                            >
                              {name}
                            </option>
                          ))}
                        </select>
                      </span>
                      <span className="signup-calendar-select-wrapper">
                        <select
                          className="signup-calendar-select signup-calendar-select--year"
                          value={calendarMonth.getFullYear()}
                          onChange={handleDobYearSelectChange}
                          aria-label="Select year"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDobMonthChange(1)}
                      aria-label="Next month"
                      disabled={isNextMonthDisabled}
                    >
                      ›
                    </button>
                  </div>
                  <div className="signup-calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
                      <span key={weekday}>{weekday}</span>
                    ))}
                  </div>
                  <div className="signup-calendar-grid">
                    {calendarWeeks.map((week, index) => (
                      <div key={`week-${index}`} className="signup-calendar-row">
                        {week.map((day, dayIndex) => {
                          if (!day) {
                            return <span key={`empty-${index}-${dayIndex}`} className="signup-calendar-cell signup-calendar-cell--empty" />;
                          }

                          const isFuture = day > today;
                          const iso = `${day.getFullYear()}-${`${day.getMonth() + 1}`.padStart(2, '0')}-${`${day.getDate()}`.padStart(2, '0')}`;
                          const isSelected = dobValue === iso;
                          const isToday = day.getTime() === today.getTime();

                          return (
                            <button
                              key={iso}
                              type="button"
                              className={`signup-calendar-cell${isSelected ? ' signup-calendar-cell--selected' : ''}${
                                isToday ? ' signup-calendar-cell--today' : ''
                              }`}
                              onClick={() => handleDobSelect(day)}
                              disabled={isFuture}
                              aria-pressed={isSelected}
                            >
                              {day.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
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
              placeholder="At least 8 characters, 1 capital letter, 1 digit, 1 symbol"
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
