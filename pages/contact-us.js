import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';

const pageStyles = `
        /* Farm Hero & Navbar Overrides */
        .hero-container {
            background: none;
            position: relative;
            height: 480px;
            overflow: hidden;
            display: block;
        }

        .hero-container::before,
        .hero-container::after {
            display: none !important;
        }

        .header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.89) 0%, rgba(255, 255, 255, 0.582) 45%, rgba(255, 255, 255, 0) 100%);
            padding: 0 48px;
        }

        .logo-wrapper {
            border-bottom-right-radius: 36px;
            padding: 16px 40px 24px 48px;
            margin-left: -48px;
        }

        .contact-wrapper {
            padding-top: 16px;
        }

        .hero-content {
            padding-top: 0;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .hero-image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            padding: 0;
        }

        .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-bottom-left-radius: 36px;
            border-bottom-right-radius: 36px;
        }

        .hero-image-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
            border-bottom-left-radius: 36px;
            border-bottom-right-radius: 36px;
            z-index: 2;
            pointer-events: none;
        }

        .farm-title {
            position: relative;
            z-index: 5;
            font-family: var(--font-baricolage);
            font-size: 64px;
            font-weight: 500;
            color: var(--dark-text);
            margin: 0;
            padding-top: 60px;
            /* Offset to center text with navbar present */
        }

        /* Responsive overrides */
        @media (max-width: 1199px) {
            .hero-container {
                height: 400px;
            }

            .farm-title {
                font-size: 64px;
            }
        }

        @media (max-width: 576px) {
            .hero-container {
                height: 320px;
            }

            .header {
                padding: 16px 24px 0 24px;
                background: none;
                position: relative;
                margin-bottom: 22px;
            }

            .logo-wrapper {
                margin-left: 0;
                padding: 0;
                background: transparent;
            }

            .hero-content {
                position: relative;
                height: calc(100% - 80px);
            }

            .hero-image-container {
                border-radius: 0 0 24px 24px;
            }

            .hero-image {
                border-radius: 0 0 24px 24px;
            }

            .farm-title {
                font-size: 34px;
                padding-top: 0;
                color: var(--white);
                /* white text on image for mobile layout */
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            }

            .hero-image-container::after {
                background: rgba(0, 0, 0, 0.4);
                border-radius: 0 0 24px 24px;
            }

            .leaf-bg {
                width: 85%;
            }

            .circular-fresh-wrapper {
                width: 65%;
                border: 8px solid var(--white);
            }
        }

        /* Food Safety Content Styles */
        .food-safety-content p {
            font-family: var(--font-dm-sans);
            font-size: 18px;
            line-height: 1.8;
            color: #333333;
            margin-bottom: 28px;
            text-align: justify;
        }

        .food-safety-content ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .food-safety-content li {
            position: relative;
            padding-left: 32px;
            font-family: var(--font-dm-sans);
            font-size: 18px;
            line-height: 1.6;
            color: #2E332E;
        }

        .food-safety-content li::before {
            content: "\\f058";
            /* FontAwesome circle-check icon */
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            position: absolute;
            left: 0;
            top: 2px;
            color: var(--button-outline);
            font-size: 20px;
        }
`;

export default function ContactUs() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus({ state: 'sending', message: 'Sending your message...' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        form.reset();
        setStatus({ state: 'success', message: 'Thank you! Your message has been sent successfully.' });
      } else {
        setStatus({ state: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setStatus({ state: 'error', message: 'Could not send your message. Please try again later.' });
    }
  }

  return (
    <>
      <Head>
        <title>Berry Boss - Get in Touch With Our Team </title>
        <meta
          name="description"
          content="Contact Berry Boss for questions about our farms, fresh fruit products, partnerships, or general inquiries. We're here to help."
        />
        <meta
          name="keywords"
          content="Berry Boss, fruit farms USA, fresh strawberries, muskmelons, watermelons, blackberries, premium fruit growers, sustainable farming, fresh produce, berry farm"
        />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="two-wrapper">
        <div className="hero-container">
          <Header active="contact" />

          {/* Hero Content */}
          <section className="hero-content">
            <h1 className="farm-title" style={{ color: '#fff', maxWidth: '900px' }}>
              Contact Us
            </h1>
            {/* Hero Image Section */}
            <div className="hero-image-container">
              <img src="/assets/contact-bg.jpg" alt="Strawberry Field" className="hero-image" decoding="async" />
            </div>
          </section>
        </div>
      </div>

      <section className="contact-us-section scroll-animate" data-animation="fadeInUp" data-delay="0.2s">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Left Side: Get in Touch */}
            <div className="contact-left">
              <span className="contact-badge">GET IN TOUCH</span>
              <h2 className="contact-title">Get in Touch</h2>
              <p className="contact-desc">
                Berry Boss Farm was born from a simple belief: the best food comes from land that&apos;s cared
                for. For over two decades, our family has nurtured every row, every plant, and every harvest with
                patience and pride.
              </p>

              <div className="contact-info-list">
                {/* Location Info */}
                <div className="contact-info-item">
                  <span className="contact-info-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <div className="contact-info-text">
                    <h4>Location</h4>
                    <p>
                      14506 Walden Sheffield Road Dover
                      <br />
                      FL 33527-5528
                    </p>
                  </div>
                </div>

                {/* Support Info */}
                <div className="contact-info-item">
                  <span className="contact-info-icon">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <div className="contact-info-text">
                    <h4>Support</h4>
                    <p>813-659-0577</p>
                  </div>
                </div>

                {/* Email Info */}
                <div className="contact-info-item">
                  <span className="contact-info-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <div className="contact-info-text">
                    <h4>Email us</h4>
                    <p>info@berryboss.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Send Your Message Form */}
            <div className="contact-right">
              <span className="contact-badge">GET TO CONTACT US</span>
              <h2 className="contact-title">Send Your Message</h2>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Full Name*" required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email*" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Phone" />
                  </div>
                  <div className="form-group">
                    <input type="text" name="subject" placeholder="Subject" />
                  </div>
                </div>

                <div className="form-group full-width">
                  <textarea name="message" rows={6} placeholder="Write your message" required></textarea>
                </div>

                <button type="submit" className="btn btn-red form-submit-btn" disabled={status.state === 'sending'}>
                  Send Your Message <i className="fa-solid fa-arrow-right"></i>
                </button>

                {status.state !== 'idle' && (
                  <p
                    role="status"
                    style={{
                      marginTop: '16px',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '16px',
                      color: status.state === 'error' ? '#c0392b' : '#2E332E',
                    }}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="contact-map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4546.439923684125!2d-82.21554562372889!3d27.982383013305732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd3354e2899649%3A0x6f197f90d5a1eda2!2s14506%20Walden%20Sheffield%20Rd%2C%20Dover%2C%20FL%2033527%2C%20USA!5e1!3m2!1sen!2sin!4v1783079064591!5m2!1sen!2sin"
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Footer Content Section */}
      <footer className="berry-footer-content" style={{ paddingTop: 0 }}>
        {/* Footer End Banner Image with Overlaid natural badge */}
        <div className="footer-banner-wrapper">
          <button className="scroll-to-top-btn" id="scroll-to-top" aria-label="Scroll to top">
            <i className="fa-solid fa-chevron-up"></i>
          </button>
          <img src="/assets/footer-end.png" alt="Berry Boss Farm" className="footer-banner-img" loading="lazy" decoding="async" />
          <img src="/assets/footer-over.png" alt="100% Natural" className="footer-over-badge" loading="lazy" decoding="async" />
        </div>
      </footer>

      {/* Floating Sidebar Navigation */}
      <div className="floating-sidebar" id="floating-sidebar">
        <div className="sidebar-logo-wrapper">
          <img src="/assets/berry.png" alt="Berry Boss" className="sidebar-logo" loading="lazy" decoding="async" />
        </div>

        <nav className="sidebar-nav">
          <a href="/" className="sidebar-item" aria-label="Home" data-tooltip="Home">
            <i className="fa-solid fa-house" aria-hidden="true"></i>
          </a>

          <a href="/what-we-grow" className="sidebar-item" aria-label="What We Grow" data-tooltip="Grow">
            <i className="fa-solid fa-leaf" aria-hidden="true"></i>
          </a>

          <a href="/farm" className="sidebar-item" aria-label="Farm" data-tooltip="Farm">
            <i className="fa-solid fa-tractor" aria-hidden="true"></i>
          </a>

          <a href="/food-safety" className="sidebar-item" aria-label="Food Safety" data-tooltip="Food Safety">
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
          </a>

          <a href="/news" className="sidebar-item" aria-label="News" data-tooltip="News">
            <i className="fa-solid fa-newspaper" aria-hidden="true"></i>
          </a>

          <a href="/contact-us" className="sidebar-item" aria-label="Contact Us" data-tooltip="Contact Us">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          </a>
        </nav>
      </div>
    </>
  );
}
