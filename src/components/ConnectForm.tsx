import { FormEvent, useState } from 'react';

type ConnectFormState = {
  apiKey: string;
  apiSecret: string;
};

const initialConnectState: ConnectFormState = {
  apiKey: '',
  apiSecret: ''
};

const ConnectForm = () => {
  const [formState, setFormState] = useState(initialConnectState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof ConnectFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, [field]: event.target.value });
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState(initialConnectState);
  };

  return (
    <div className="card connect-card">
      <h3>Connect Your Exchange</h3>
      <p className="card-intro">Enter your API credentials to link an exchange account</p>
      <form className="connect-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="apiKey">API Key</label>
          <input
            id="apiKey"
            name="apiKey"
            type="text"
            value={formState.apiKey}
            onChange={handleChange('apiKey')}
            placeholder="Paste your API key"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="apiSecret">API Secret</label>
          <input
            id="apiSecret"
            name="apiSecret"
            type="password"
            value={formState.apiSecret}
            onChange={handleChange('apiSecret')}
            placeholder="Paste your API secret"
            required
          />
        </div>
        <button className="cta-button" type="submit">
          Connect
        </button>
        {submitted && <p className="form-confirmation">Credentials received. We will guide you through the secure setup.</p>}
      </form>
    </div>
  );
};

export default ConnectForm;
