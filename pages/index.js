import Head from 'next/head';
import Header from '../components/Header';
import { fetchProducts } from '../lib/queries';

export default function Home({ products }) {
  const productTrack = products;

  return (
    <>
      <Head>
        <title>Berry Boss - Growing Pure natural Goodness</title>
        <meta
          name="description"
          content="Berry Boss is a trusted U.S. fruit farm growing premium strawberries, watermelons, muskmelons, and blackberries with a commitment to freshness, quality, and sustainable farming."
        />
        <meta
          name="keywords"
          content="Berry Boss, fruit farms USA, fresh strawberries, muskmelons, watermelons, blackberries, premium fruit growers, sustainable farming, fresh produce, berry farm"
        />
      </Head>

      <main>
        <div className="two-wrapper">
          <div className="hero-container">
            <Header active="home" />

            {/* Hero Content */}
            <section className="hero-content">
              <div className="hero-text-section">
                <h1 className="hero-title scroll-animate" data-animation="fadeInUp" data-delay="0.2s">
                  Growing pure natural goodness for a healthier tomorrow
                </h1>
                <p className="hero-subtitle scroll-animate" data-animation="fadeInUp" data-delay="0.4s">
                  Growing premium strawberries, blackberries, watermelons, and cantaloupes with passion,
                  sustainability, and generations of farming experience.
                </p>

                <div className="hero-actions scroll-animate" data-animation="fadeInUp" data-delay="0.6s">
                  <a href="/what-we-grow" className="btn btn-red">
                    Explore Our Produce <i className="fa-solid fa-arrow-right"></i>
                  </a>
                  <a href="/farm" className="btn btn-outline">
                    Visit the Farm <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>

              {/* Big background text "Berry Boss" */}
              <div className="bg-text-container">
                <span className="bg-text">Berry Boss</span>
              </div>

              {/* Hero Image Section */}
              <div className="hero-image-container">
                <img src="/assets/berry-hero.png" alt="Strawberry Field" className="hero-image" decoding="async" />
                <div className="scroll-indicator">
                  <i className="fa-solid fa-arrow-down"></i>
                  <span>Scroll to website</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="berry-story-section">
          <div className="story-container">
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
              <a href="/farm" className="btn btn-green" aria-label="Visit Our Farm">
                Visit Our Farm
              </a>
            </div>

            <div className="story-right scroll-animate" data-animation="fadeInRight">
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
          </div>
        </section>

        <section className="berry-about-section">
          <div className="about-container scroll-animate" data-animation="fadeIn">
            {/* Images Row */}
            <div className="about-images-row">
              {/* Left Slide: Transition one by one */}
              <div className="about-left-slideshow" id="about-left-slideshow">
                <div className="left-slide active">
                  <img
                    src="/assets/berry-about-left1.JPG"
                    alt="Watermelon Harvest"
                    className="left-slide-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="left-slide-caption">
                    <div className="caption-line">Freshly Harvested</div>
                    <div className="caption-line">Natural Watermelons</div>
                    <div className="caption-line">Straight from the Fields</div>
                  </div>
                </div>
                <div className="left-slide">
                  <img
                    src="/assets/berry-about-left2.JPG"
                    alt="Sweet Strawberries"
                    className="left-slide-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="left-slide-caption">
                    <div className="caption-line">Farm-Fresh Watermelons</div>
                    <div className="caption-line">Sweet Juicy Watermelons</div>
                    <div className="caption-line">Quality Checked Daily</div>
                  </div>
                </div>
              </div>

              {/* Right Slide: Seamless Sliding Loop */}
              <div className="about-right-slider">
                <div className="slider-wrapper" id="about-right-slider-wrapper">
                  <div className="right-slide">
                    <img
                      src="/assets/berry-slide1.png"
                      alt="Strawberry Fields 1"
                      className="right-slide-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="right-slide">
                    <img
                      src="/assets/berry-slide2.JPG"
                      alt="Strawberry Fields 2"
                      className="right-slide-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="right-slide">
                    <img
                      src="/assets/berry-slide3.png"
                      alt="Strawberry Fields 3"
                      className="right-slide-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="right-slide">
                    <img
                      src="/assets/berry-slide4.png"
                      alt="Strawberry Fields 4"
                      className="right-slide-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Row */}
            <div className="about-content-row scroll-animate" data-animation="fadeInUp" data-delay="0.2s">
              <div className="content-col col-left">
                <span className="about-badge">ABOUT THE FARM</span>
                <h2 className="about-title">
                  Rooted In
                  <br />
                  Quality Farming
                </h2>
              </div>

              <div className="content-col col-middle">
                <div className="col-divider-line"></div>
                <p className="about-p">
                  For over three decades, BBI Produce has built a reputation as a trusted grower-owned producer
                  and marketer of premium-quality fruit under the Berry Boss brand. What began in 1990 with just
                  85 acres of strawberries has grown into a thriving agricultural operation spanning more than
                  1,200 acres in Dover, Florida. Today, BBI Produce proudly cultivates strawberries, natural
                  strawberries, blackberries, watermelons, and cantaloupes with a strong
                </p>
              </div>

              <div className="content-col col-right">
                <div className="col-divider-line"></div>
                <p className="about-p">
                  commitment to freshness, quality, and sustainable farming practices. By combining generations
                  of farming expertise with modern growing techniques, the company continues to provide
                  exceptional produce to customers while maintaining the values, dedication, and passion that
                  define the Berry Boss name.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                    BBI Produce has been proudly growing and marketing fresh produce for over 30 years since
                    1990.
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
                    BBI Produce is located in Dover, Florida, where we operate and nurture our agricultural
                    fields.
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
      </main>

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
