import Head from 'next/head';
import Header from '../components/Header';
import { fetchProducts } from '../lib/queries';

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
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.747) 0%, rgba(255, 255, 255, 0.63) 45%, rgba(255, 255, 255, 0) 100%);
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

        .two-wrapper {
            background-color: #F1EFDD;
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

export default function WhatWeGrow({ products }) {
  const productTrack = [...products, ...products];

  return (
    <>
      <Head>
        <title>Berry Boss - Fresh Strawberries, Melons &amp; Berries</title>
        <meta
          name="description"
          content="Discover the premium fruits grown at Berry Boss, including strawberries, muskmelons, watermelons, and blackberries, cultivated with care on our U.S. farms."
        />
        <meta
          name="keywords"
          content="Berry Boss, fruit farms USA, fresh strawberries, muskmelons, watermelons, blackberries, premium fruit growers, sustainable farming, fresh produce, berry farm"
        />
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      </Head>

      <div className="two-wrapper">
        <div className="hero-container">
          <Header active="grow" />

          {/* Hero Content */}
          <section className="hero-content">
            <h1 className="farm-title" style={{ color: '#fff' }}>
              WHAT WE GROW
            </h1>
            {/* Hero Image Section */}
            <div className="hero-image-container">
              <img src="/assets/grow-bg.jpg" alt="Strawberry Field" className="hero-image" decoding="async" />
            </div>
          </section>
        </div>
      </div>

      <section className="berry-grow-product-section">
        <div className="product-container scroll-animate" data-animation="fadeIn">
          <span className="product-badge">WHAT WE GROW</span>
          <h2 className="product-title">
            Grown With Care,
            <br />
            Harvested Fresh
          </h2>

          <div className="product-slider-container">
            {/* Navigation Arrows */}
            <button className="nav-arrow prev-arrow" id="product-prev" aria-label="Previous Product">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="nav-arrow next-arrow" id="product-next" aria-label="Next Product">
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            {/* Product Grid/Track */}
            <div className="product-track-wrapper">
              <div className="product-track" id="product-track">
                {productTrack.map((product, index) => (
                  <div className="product-card" key={`${product.id}-${index}`}>
                    <div className="product-image-container">
                      {product.out_of_stock ? <span className="badge badge-out">Out of stock</span> : null}
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="product-brand">{product.brand}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="product-action scroll-animate" data-animation="fadeInUp">
            <a href="/contact-us" className="btn btn-red">
              Contact The Farm <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="grow-sliding-section">
        <div className="grow-slider-container">
          <div className="grow-slider-wrapper">
            {/* Slide 1 - Blackberry */}
            <div className="grow-slide active">
              <img src="/assets/grow-slide1.png" alt="Blackberry" className="grow-slide-img" loading="lazy" decoding="async" />
              <div className="grow-slide-content">
                <h3 className="grow-slide-title">Fresh Blackberries</h3>
                <p className="grow-slide-text">
                  Handpicked at peak ripeness, our juicy blackberries deliver a perfect balance of sweetness and
                  rich flavor while maintaining exceptional freshness.
                </p>
              </div>
            </div>

            {/* Slide 2 - Strawberry */}
            <div className="grow-slide">
              <img src="/assets/grow-slide2.png" alt="Strawberry" className="grow-slide-img" loading="lazy" decoding="async" />
              <div className="grow-slide-content">
                <h3 className="grow-slide-title">Sweet Strawberries</h3>
                <p className="grow-slide-text">
                  Grown with care under ideal conditions, our vibrant strawberries are naturally sweet, bursting
                  with flavor, and packed with freshness in every bite.
                </p>
              </div>
            </div>

            {/* Slide 3 - Muskmelon */}
            <div className="grow-slide">
              <img src="/assets/grow-slide3.png" alt="Muskmelon" className="grow-slide-img" loading="lazy" decoding="async" />
              <div className="grow-slide-content">
                <h3 className="grow-slide-title">Premium Muskmelon</h3>
                <p className="grow-slide-text">
                  Carefully cultivated and vine-ripened, our muskmelons offer a refreshing aroma, tender texture,
                  and naturally sweet taste perfect for every season.
                </p>
              </div>
            </div>

            {/* Slide 4 - Watermelon */}
            <div className="grow-slide">
              <img src="/assets/grow-slide4.png" alt="Watermelon" className="grow-slide-img" loading="lazy" decoding="async" />
              <div className="grow-slide-content">
                <h3 className="grow-slide-title">Juicy Watermelon</h3>
                <p className="grow-slide-text">
                  Harvested at the perfect moment, our watermelons are crisp, refreshingly juicy, and filled with
                  naturally sweet flavor for a delicious summer experience.
                </p>
              </div>
            </div>
          </div>

          {/* Slider Controls / Indicators */}
          <div className="grow-slider-indicators">
            <span className="grow-indicator active" data-slide="0"></span>
            <span className="grow-indicator" data-slide="1"></span>
            <span className="grow-indicator" data-slide="2"></span>
            <span className="grow-indicator" data-slide="3"></span>
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

export async function getServerSideProps() {
  const products = await fetchProducts();
  return { props: { products } };
}
