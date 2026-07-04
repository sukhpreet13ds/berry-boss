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
            background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 45%, rgba(255, 255, 255, 0) 100%);
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
`;

export default function Farm() {
  return (
    <>
      <Head>
        <title>Berry Boss - Berry Boss Fruit Farms in the USA</title>
        <meta
          name="description"
          content="Explore Berry Boss farms where fresh strawberries, muskmelons, watermelons, and blackberries are grown using modern, sustainable farming practices."
        />
        <meta
          name="keywords"
          content="Berry Boss, fruit farms USA, fresh strawberries, muskmelons, watermelons, blackberries, premium fruit growers, sustainable farming, fresh produce, berry farm"
        />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="two-wrapper">
        <div className="hero-container">
          <Header active="farm" />

          {/* Hero Content */}
          <section className="hero-content">
            <h1 className="farm-title">Our Farm</h1>
            {/* Hero Image Section */}
            <div className="hero-image-container">
              <img src="/assets/farm-bg.jpg" alt="Strawberry Field" className="hero-image" decoding="async" />
            </div>
          </section>
        </div>
      </div>

      <section className="farm-story scroll-animate" data-animation="zoomIn" data-delay="0.2s">
        <div className="farm-story-container">
          {/* Left Side: Features Grid */}
          <div className="farm-story-left">
            <div className="story-left scroll-animate" data-animation="fadeInLeft">
              <span className="story-badge">OUR STORY</span>
              <h2 className="story-title">
                Rooted in the Soil,
                <br />
                Grown with Heart
              </h2>
              <div className="story-paragraphs">
                <p className="story-p">
                  Berry Boss Farm was born from a simple belief: the best food comes from land that&apos;s cared
                  for. For over two decades, our family has nurtured every row, every plant, and every harvest
                  with patience and pride.
                </p>
                <p className="story-p">
                  From spring strawberries to late-summer watermelons, our farm follows nature&apos;s rhythm — no
                  shortcuts, no compromises.
                </p>
              </div>
            </div>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <img
                    src="/assets/icon1.svg"
                    alt="Sun Ripened Icon"
                    className="feature-icon rotating-icon"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="feature-title">Sun Ripened</h3>
                <p className="feature-desc">Every fruit picked at peak natural sweetness.</p>
              </div>

              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <img
                    src="/assets/icon2.svg"
                    alt="Sustainable Growing Icon"
                    className="feature-icon"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="feature-title">Sustainable Growing</h3>
                <p className="feature-desc">We protect the land for the next generation.</p>
              </div>

              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <img
                    src="/assets/icon3.svg"
                    alt="Community First Icon"
                    className="feature-icon"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="feature-title">Community First</h3>
                <p className="feature-desc">We sell direct, keeping freshness unmatched.</p>
              </div>

              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <img
                    src="/assets/icon4.svg"
                    alt="No Shortcuts Icon"
                    className="feature-icon"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="feature-title">No Shortcuts</h3>
                <p className="feature-desc">No artificial ripening, ever. Just honest farming.</p>
              </div>
            </div>
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

      <section className="farm-about scroll-animate" data-animation="fadeIn">
        <div className="farm-about-container">
          <div className="about-image-wrapper">
            <img src="/assets/farm-land.jpg" alt="Farm Land" className="farm-about-img" loading="lazy" decoding="async" />
          </div>
          <div className="about-content-row">
            <div className="about-col-left">
              <span className="about-badge">ABOUT THE FARM</span>
              <h2 className="about-title">
                Rooted In
                <br />
                Quality Farming
              </h2>
            </div>
            <div className="about-col-right">
              <div className="about-divider-line"></div>
              <p className="about-p">
                For over three decades, BBI Produce has built a reputation as a trusted grower-owned producer and
                marketer of premium-quality fruit under the Berry Boss brand. What began in 1990 with just 85
                acres of strawberries has grown into a thriving agricultural operation spanning more than 1,200
                acres in Dover, Florida. Today, BBI Produce proudly cultivates strawberries, organic
                strawberries, blackberries, watermelons, and cantaloupes with a strong commitment to freshness,
                quality, and sustainable farming practices.
              </p>
              <p className="about-p">
                By combining generations of farming expertise with modern growing techniques, the company
                continues to provide exceptional produce to customers while maintaining the values, dedication,
                and passion that define the Berry Boss name.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="farm-farmers scroll-animate" data-animation="fadeIn">
        <div className="farmers-container">
          <span className="farmers-badge">MEET OUR TEAM</span>
          <h2 className="farmers-title">Meet our farmers</h2>

          <div className="farmers-grid">
            <div className="farmer-card">
              <div className="farmer-img-wrapper">
                <img src="/assets/farmer1.png" alt="Linda Brown" className="farmer-img" loading="lazy" decoding="async" />
              </div>
              <span className="farmer-role">PARTNER</span>
              <h3 className="farmer-name">Linda Brown</h3>
            </div>
            <div className="farmer-card">
              <div className="farmer-img-wrapper">
                <img src="/assets/farmer2.png" alt="Lisa" className="farmer-img" loading="lazy" decoding="async" />
              </div>
              <span className="farmer-role">PARTNER</span>
              <h3 className="farmer-name">Lisa</h3>
            </div>
            <div className="farmer-card">
              <div className="farmer-img-wrapper">
                <img src="/assets/farmer3.png" alt="Ronnie Young" className="farmer-img" loading="lazy" decoding="async" />
              </div>
              <span className="farmer-role">PARTNER</span>
              <h3 className="farmer-name">Ronnie Young</h3>
            </div>
            <div className="farmer-card">
              <div className="farmer-img-wrapper">
                <img src="/assets/farmer4.png" alt="Adam" className="farmer-img" loading="lazy" decoding="async" />
              </div>
              <span className="farmer-role">MANAGER</span>
              <h3 className="farmer-name">Adam</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="berry-testimonals-section">
        <div className="testimonials-container scroll-animate" data-animation="fadeIn" id="testimonials-section-container">
          <div className="testimonials-slider" id="testimonials-slider">
            {/* Slide 1 */}
            <div className="testimonial-slide active">
              <div className="stars-row">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <blockquote className="testimonial-quote">
                “BBI Produce delivers exceptionally fresh, flavorful berries and premium-quality produce. Their
                dedication to farming excellence and consistent quality truly makes the Berry Boss brand stand
                out.”
              </blockquote>
              <div className="testimonial-author">
                <img src="/assets/avatar1.avif" alt="Sophie Turner" className="author-avatar" loading="lazy" decoding="async" />
                <h4 className="author-name">Sophie Turner</h4>
                <span className="author-title">Local Chef</span>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="testimonial-slide">
              <div className="stars-row">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <blockquote className="testimonial-quote">
                “We have been sourcing our berries from Berry Boss for years. Their commitment to sustainable
                farming and peak ripeness is reflected in every single bite.”
              </blockquote>
              <div className="testimonial-author">
                <img src="/assets/avatar2.avif" alt="Sophie Turner" className="author-avatar" loading="lazy" decoding="async" />
                <h4 className="author-name">John William</h4>
                <span className="author-title">Hawker</span>
              </div>
            </div>
            {/* Slide 3 */}
            <div className="testimonial-slide">
              <div className="stars-row">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <blockquote className="testimonial-quote">
                “Absolutely delicious produce, harvested with love and care. You can taste the generations of
                experience in their cantaloupes and watermelons, grown to perfection every season.”
              </blockquote>
              <div className="testimonial-author">
                <img src="/assets/avatar3.avif" alt="Sophie Turner" className="author-avatar" loading="lazy" decoding="async" />
                <h4 className="author-name">Robert Downey</h4>
                <span className="author-title">Shopkeeper</span>
              </div>
            </div>
          </div>

          {/* Dots Indicators */}
          <div className="testimonial-dots" id="testimonial-dots">
            <span className="dot active" data-index="0"></span>
            <span className="dot" data-index="1"></span>
            <span className="dot" data-index="2"></span>
          </div>
        </div>
      </section>

      {/* Fresh Approach Section */}
      <section className="berry-fresh-section">
        <div className="fresh-container scroll-animate" data-animation="fadeIn">
          <div className="fresh-left">
            <div className="fresh-left-content">
              <span className="fresh-badge">OUR FRESH APPROACH</span>
              <h2 className="fresh-title">
                Taste The Freshness
                <br />
                of Nature
              </h2>

              <div className="fresh-illustration-container">
                <img
                  src="/assets/fresh-left.svg"
                  alt="Strawberry Illustration"
                  className="fresh-illustration"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <p className="fresh-desc">
                Discover farm-fresh strawberries, blackberries, watermelons, and cantaloupes grown with passion
                and care.
              </p>
              <a href="/contact-us" className="btn btn-yellow">
                Contact The Farm
              </a>
            </div>
          </div>
          <div className="fresh-right">
            <img
              src="/assets/fresh-right.jpg"
              alt="Fresh Strawberries in Crate"
              className="fresh-right-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="berry-gallery-section">
        <div className="gallery-header scroll-animate" data-animation="fadeIn">
          <span className="gallery-badge">FARM FRESH</span>
          <h2 className="gallery-title">
            Always Something
            <br />
            Fresh in Season
          </h2>
        </div>

        <div className="gallery-marquee-container">
          <div className="gallery-marquee-track">
            {/* Track 1 (Left to Right) */}
            <div className="gallery-marquee-list">
              <img src="/assets/gallery1.JPG" alt="Gallery 1" className="gallery-img size-1" loading="lazy" decoding="async" />
              <img src="/assets/gallery2.JPG" alt="Gallery 2" className="gallery-img size-2" loading="lazy" decoding="async" />
              <img src="/assets/gallery3.JPG" alt="Gallery 3" className="gallery-img size-3" loading="lazy" decoding="async" />
              <img src="/assets/gallery4.jpg" alt="Gallery 4" className="gallery-img size-4" loading="lazy" decoding="async" />
              <img src="/assets/gallery5.JPG" alt="Gallery 5" className="gallery-img size-1" loading="lazy" decoding="async" />
              <img src="/assets/gallery6.JPG" alt="Gallery 6" className="gallery-img size-2" loading="lazy" decoding="async" />
              <img src="/assets/gallery7.jpg" alt="Gallery 7" className="gallery-img size-3" loading="lazy" decoding="async" />
              <img src="/assets/gallery8.JPG" alt="Gallery 8" className="gallery-img size-4" loading="lazy" decoding="async" />
              <img src="/assets/gallery9.jpg" alt="Gallery 9" className="gallery-img size-1" loading="lazy" decoding="async" />
              <img src="/assets/gallery10.jpeg" alt="Gallery 10" className="gallery-img size-2" loading="lazy" decoding="async" />
              <img src="/assets/gallery11.jpg" alt="Gallery 11" className="gallery-img size-3" loading="lazy" decoding="async" />
              <img src="/assets/gallery12.jpg" alt="Gallery 12" className="gallery-img size-4" loading="lazy" decoding="async" />
            </div>
            {/* Duplicate for seamless looping */}
            <div className="gallery-marquee-list" aria-hidden="true">
              <img src="/assets/gallery1.JPG" alt="Gallery 1" className="gallery-img size-1" loading="lazy" decoding="async" />
              <img src="/assets/gallery2.JPG" alt="Gallery 2" className="gallery-img size-2" loading="lazy" decoding="async" />
              <img src="/assets/gallery3.JPG" alt="Gallery 3" className="gallery-img size-3" loading="lazy" decoding="async" />
              <img src="/assets/gallery4.jpg" alt="Gallery 4" className="gallery-img size-4" loading="lazy" decoding="async" />
              <img src="/assets/gallery5.JPG" alt="Gallery 5" className="gallery-img size-1" loading="lazy" decoding="async" />
              <img src="/assets/gallery6.JPG" alt="Gallery 6" className="gallery-img size-2" loading="lazy" decoding="async" />
              <img src="/assets/gallery7.jpg" alt="Gallery 7" className="gallery-img size-3" loading="lazy" decoding="async" />
              <img src="/assets/gallery8.JPG" alt="Gallery 8" className="gallery-img size-4" loading="lazy" decoding="async" />
              <img src="/assets/gallery9.jpg" alt="Gallery 9" className="gallery-img size-1" loading="lazy" decoding="async" />
              <img src="/assets/gallery10.jpeg" alt="Gallery 10" className="gallery-img size-2" loading="lazy" decoding="async" />
              <img src="/assets/gallery11.jpg" alt="Gallery 11" className="gallery-img size-3" loading="lazy" decoding="async" />
              <img src="/assets/gallery12.jpg" alt="Gallery 12" className="gallery-img size-4" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="berry-faq-section">
        <div className="faq-container scroll-animate" data-animation="fadeInUp">
          <div className="faq-list">
            {/* FAQ Item 1 */}
            <div className="faq-item">
              <button className="faq-question">
                <span>What products does BBI Produce grow?</span>
                <span className="faq-toggle-icon">
                  <i className="fa-solid fa-plus"></i>
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  BBI Produce proudly grows premium strawberries, natural strawberries, blackberries,
                  watermelons, and cantaloupes with passion and care.
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="faq-item active">
              <button className="faq-question">
                <span>How long has BBI Produce been in business?</span>
                <span className="faq-toggle-icon">
                  <i className="fa-solid fa-minus"></i>
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  BBI Produce has been proudly growing and marketing fresh produce for over 30 years since 1990.
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="faq-item">
              <button className="faq-question">
                <span>Where is BBI Produce located?</span>
                <span className="faq-toggle-icon">
                  <i className="fa-solid fa-plus"></i>
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  BBI Produce is located in Dover, Florida, where we operate and nurture our agricultural fields.
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="faq-item">
              <button className="faq-question">
                <span>What makes Berry Boss strawberries special?</span>
                <span className="faq-toggle-icon">
                  <i className="fa-solid fa-plus"></i>
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  Our strawberries are grown with generations of farming expertise, picked fresh at the peak of
                  natural sweetness, and delivered with standard quality checks daily.
                </div>
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
