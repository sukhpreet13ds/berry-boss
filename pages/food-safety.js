import Head from 'next/head';
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

            .farm-story {
                padding-top: 30px;
            }
        }

        /* Food Safety Content Styles */
        .food-safety-content {
            text-align: left !important;
        }

        .food-safety-content p {
            font-family: var(--font-dm-sans);
            font-size: 18px;
            line-height: 1.8;
            color: #000;
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
            color: #000;
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

export default function FoodSafety() {
  return (
    <>
      <Head>
        <title>Berry Boss - Growing Pure natural Goodness</title>
        <meta
          name="description"
          content="Learn how Berry Boss maintains the highest food safety standards through responsible farming, careful harvesting, and quality assurance across every harvest."
        />
        <meta
          name="keywords"
          content="Berry Boss, fruit farms USA, fresh strawberries, muskmelons, watermelons, blackberries, premium fruit growers, sustainable farming, fresh produce, berry farm"
        />
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      </Head>

      <div className="two-wrapper">
        <div className="hero-container">
          <Header active="safety" />

          {/* Hero Content */}
          <section className="hero-content">
            <h1 className="farm-title" style={{ color: '#fff', maxWidth: '600px' }}>
              Your Safety is Our Number One Priority
            </h1>
            {/* Hero Image Section */}
            <div className="hero-image-container">
              <img src="/assets/safety-bg.jpg" alt="Strawberry Field" className="hero-image" decoding="async" />
            </div>
          </section>
        </div>
      </div>

      <section className="farm-story scroll-animate" data-animation="zoomIn" data-delay="0.2s">
        <div className="farm-story-container">
          {/* Left Side: Features Grid */}
          <div className="farm-story-left">
            <div className="story-left food-safety-content scroll-animate" data-animation="fadeInLeft">
              <p>
                Food safety is our number one priority at BBI Produce. It&apos;s our job to make sure all produce
                that leaves our farms is safe for your family. Food safety is an integral part of our operation.
                Food safety impacts the growing, harvest, transport, packing, cooling, storage, and shipping of
                our produce. From our field practices to our tracking of every box of fruit, we can ensure our
                products remain safe all the way to your fridge.
              </p>

              <ul>
                <li>All farms are GFS certified by Primus Labs.</li>
                <li>Packing shed GFS certified by Primus Labs.</li>
                <li>Ranch audit and Harvest Crew audit.</li>
                <li>PTI (Produce Traceability Initiative) compliant.</li>
                <li>All flats/cartons/bins labeled for traceability.</li>
                <li>GTIN on all clamshells.</li>
              </ul>
            </div>
            <img src="/assets/safety-left.png" alt="safety logo" style={{ marginTop: '30px' }} loading="lazy" decoding="async" />
          </div>

          {/* Right Side: Unique Shape Leaf Image with Circle Image Over It */}
          <div className="farm-story-right">
            <div className="leaf-wrapper">
              <img src="/assets/leaf.png" alt="Leaf Background" className="leaf-bg" loading="lazy" decoding="async" />
              <div className="circular-fresh-wrapper">
                <img src="/assets/straw.jpg" alt="Fresh Produce 4" className="circular-fresh-img" loading="lazy" decoding="async" />
                <img src="/assets/fresh-right.jpg" alt="Fresh Produce 1" className="circular-fresh-img active" loading="lazy" decoding="async" />
                <img src="/assets/berry-black.jpg" alt="Fresh Produce 3" className="circular-fresh-img" loading="lazy" decoding="async" />
                <img src="/assets/black-berry.jpg" alt="Fresh Produce 2" className="circular-fresh-img" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="berry-brand-section">
        <div className="brand-container scroll-animate" data-animation="fadeIn">
          <div className="brand-grid">
            <div className="brand-card">
              <img src="/assets/brand1.svg" alt="Fresh from Florida" className="brand-logo" loading="lazy" decoding="async" />
            </div>
            <div className="brand-card">
              <img src="/assets/brand2.svg" alt="UF IFAS" className="brand-logo" loading="lazy" decoding="async" />
            </div>
            <div className="brand-card">
              <img src="/assets/brand3.svg" alt="FFVA" className="brand-logo" loading="lazy" decoding="async" />
            </div>
            <div className="brand-card">
              <img src="/assets/brand4.svg" alt="FSGA" className="brand-logo" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Content Section */}
      <footer className="berry-footer-content">
        <div className="footer-top scroll-animate" data-animation="fadeInUp">
          <div className="footer-col col-visit">
            <span className="footer-label">Visit us</span>
            <h3 className="footer-time">M-S 9:00am — 5:00pm</h3>
          </div>

          <div className="footer-col col-address">
            <span className="footer-label">Address</span>
            <p className="footer-text address-text">
              14506 Walden Sheffield
              <br />
              Road Dover FL 33527-5528
            </p>
            <a href="https://maps.app.goo.gl/QT6qEXrpHHsRkCeNA" className="footer-map-link" target="_blank" rel="noreferrer">
              View on Map <i className="fa-solid fa-arrow-right"></i>
            </a>
            <h3 className="footer-email">
              <a href="mailto:info@berryboss.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                info@berryboss.com
              </a>
            </h3>
          </div>

          <div className="footer-col col-socials">
            <span className="footer-label">Socials</span>
            <div className="social-capsules">
              <a href="#" className="social-btn">Facebook</a>
              <a href="#" className="social-btn">Instagram</a>
              <a href="#" className="social-btn">X</a>
              <a href="#" className="social-btn">Behance</a>
              <a href="#" className="social-btn">Youtube</a>
            </div>
          </div>
        </div>

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
