import { FormEvent, useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState({ ...formState, [field]: event.target.value });
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState(initialState);
  };

  return (
    <div className="card contact-form-card">
      <h3>Send us a Message</h3>
      <p className="card-intro">Fill out the form and our team will get back to you shortly</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" value={formState.name} onChange={handleChange('name')} required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange('email')}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formState.phone}
              onChange={handleChange('phone')}
              placeholder="(xxx) xxx-xxxx"
            />
          </div>
          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formState.subject}
              onChange={handleChange('subject')}
              placeholder="Trading goals or exchange preference"
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formState.message}
            onChange={handleChange('message')}
            placeholder="Share timelines, strategies, or questions..."
          />
        </div>
        <button type="submit" className="cta-button">
          Submit
        </button>
        {submitted && <p className="form-confirmation">Thank you! We will contact you within 24 hours.</p>}
      </form>
    </div>
  );
};

export default ContactForm;
