const ContactInformation = () => (
  <div className="card contact-info-card">
    <h3>Contact Information</h3>
    <p className="card-intro">Connect with us any time. Our desk monitors markets 24/7.</p>
    <div className="info-list">
      <div className="info-item">
        <h4>Phone</h4>
        <p className="info-subtitle">Call us for immediate assistance</p>
        <a href="tel:+18184747074">+1 (818) 474-7074</a>
      </div>
      <div className="info-item">
        <h4>Email</h4>
        <p className="info-subtitle">Send us a message anytime</p>
        <a href="mailto:support@cryptomatrix.ai">support@cryptomatrix.ai</a>
      </div>
      <div className="info-item">
        <h4>Address</h4>
        <p className="info-subtitle">Los Angeles, CA</p>
      </div>
      <div className="info-item">
        <h4>Hours</h4>
        <p className="info-subtitle">24/7</p>
        <p>Markets never sleep and neither do we.</p>
      </div>
    </div>
  </div>
);

export default ContactInformation;
