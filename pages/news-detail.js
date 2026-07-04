import Head from 'next/head';
import Header from '../components/Header';
import { fetchNewsById } from '../lib/queries';

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

            .news-detail-section {
                padding-top: 30px;
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

function DynamicArticle({ article }) {
  const paragraphs = (article.content || '')
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const introParagraphs = paragraphs.slice(0, 2);
  const restParagraphs = paragraphs.slice(2);

  return (
    <div className="news-detail-container">
      {/* Intro Paragraphs */}
      {introParagraphs.length > 0 && (
        <div className="blog-intro">
          {introParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      {/* Wide Content Image */}
      {article.image_url && (
        <div className="blog-wide-image-wrapper">
          <img src={article.image_url} alt={article.title} className="blog-wide-img" loading="lazy" decoding="async" />
        </div>
      )}

      {/* Remaining Paragraphs */}
      {restParagraphs.length > 0 && (
        <div className="blog-section-header">
          {restParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      {/* Inside Images uploaded with the news */}
      {(article.images || []).map((url, i) => (
        <div className="blog-wide-image-wrapper" key={i}>
          <img src={url} alt={`${article.title} - image ${i + 1}`} className="blog-wide-img" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

function DefaultArticle() {
  return (
    <div className="news-detail-container">
      {/* Intro Paragraphs */}
      <div className="blog-intro">
        <p>
          Harvesting a cantaloupe at the right time is one of the most important steps in producing sweet,
          flavorful fruit. Unlike some fruits that continue to ripen significantly after picking, cantaloupes
          develop their best flavor, aroma, and sweetness while still on the vine. Farmers carefully monitor
          several signs to determine the perfect harvest window, ensuring consumers enjoy the highest quality
          fruit possible.
        </p>
        <p>
          At Berry Boss Farm, harvesting at peak ripeness is essential to delivering fresh, delicious cantaloupes
          that meet our quality standards.
        </p>
      </div>

      {/* Wide Content Image */}
      <div className="blog-wide-image-wrapper">
        <img src="/assets/news-detail-bg.jpg" alt="Cantaloupe Fields" className="blog-wide-img" loading="lazy" decoding="async" />
      </div>

      {/* Why Harvest Timing Matters Section */}
      <div className="blog-section-header">
        <h2 className="blog-h2">Why Harvest Timing Matters</h2>
        <p>
          A cantaloupe harvested too early may lack sweetness, aroma, and proper texture. On the other hand, a
          fruit left on the vine for too long can become overly soft, reducing its shelf life and making it more
          susceptible to damage during transportation.
        </p>
        <p>
          The goal is to harvest when the cantaloupe has reached its peak maturity, providing the ideal balance
          of sweetness, firmness, and freshness.
        </p>
      </div>

      {/* Section Banner: Key Signs */}
      <div className="blog-key-signs-banner">
        <h3>Key Signs Farmers Look For</h3>
      </div>

      {/* Sign 1: Color Change on the Rind (Image Left, Content Right) */}
      <div className="blog-sign-row image-left">
        <div className="blog-sign-image">
          <img src="/assets/blog-detail1.png" alt="Color Change on the Rind" className="blog-img-border" loading="lazy" decoding="async" />
        </div>
        <div className="blog-sign-content">
          <h3 className="blog-sign-title">1. Color Change on the Rind</h3>
          <p>One of the easiest indicators of ripeness is a change in the fruit&apos;s background color.</p>
          <p>
            Young cantaloupes typically have a greenish rind beneath their netted surface. As the fruit matures,
            this background color gradually changes to a creamy yellow or golden tan.
          </p>
          <p>A ripe cantaloupe will usually display:</p>
          <ul className="blog-ul">
            <li>A golden or creamy background color</li>
            <li>Well-defined netting across the surface</li>
            <li>Reduced green coloring around the fruit</li>
          </ul>
          <p>This color transformation signals that the fruit is nearing harvest readiness.</p>
        </div>
      </div>

      {/* Sign 2: The Slip Stage (Content Left, Image Right) */}
      <div className="blog-sign-row image-right">
        <div className="blog-sign-content">
          <h3 className="blog-sign-title">2. The Slip Stage</h3>
          <p>Experienced farmers often use what is known as the &quot;slip stage&quot; to determine ripeness.</p>
          <p>The slip stage refers to how easily the fruit separates from the vine.</p>
          <h4 className="blog-sub-title">Full Slip</h4>
          <p>
            At full ripeness, the cantaloupe naturally detaches from the stem with very little pressure. A
            circular crack forms around the stem attachment point, indicating the fruit is ready to harvest.
          </p>
          <h4 className="blog-sub-title">Half Slip</h4>
          <p>
            Some growers harvest at the half-slip stage, where the fruit begins loosening from the vine but has
            not completely separated. This allows for slightly longer storage and transportation while
            maintaining good flavor.
          </p>
          <p>The slip stage is one of the most reliable indicators of cantaloupe maturity.</p>
        </div>
        <div className="blog-sign-image">
          <img src="/assets/blog-detail2.png" alt="The Slip Stage" className="blog-img-border" loading="lazy" decoding="async" />
        </div>
      </div>

      {/* Three Card Grid (Aroma, Netting, Firmness) */}
      <div className="blog-cards-grid">
        {/* Card 3 */}
        <div className="blog-card-item">
          <h3 className="blog-card-title">3. Aroma and Fragrance</h3>
          <p>A ripe cantaloupe develops a sweet, fragrant aroma near the stem end.</p>
          <p>Farmers often inspect fields by walking through rows and checking for:</p>
          <ul className="blog-ul">
            <li>Sweet melon fragrance</li>
            <li>Strong fruity scent</li>
            <li>Pleasant aroma around mature fruit</li>
          </ul>
          <p>If the fruit lacks aroma, it may need additional time on the vine.</p>
        </div>
        {/* Card 4 */}
        <div className="blog-card-item">
          <h3 className="blog-card-title">4. Netting Development</h3>
          <p>The rough, web-like pattern on a cantaloupe&apos;s surface is known as netting.</p>
          <p>As the fruit matures:</p>
          <ul className="blog-ul">
            <li>Netting becomes more pronounced</li>
            <li>Surface texture becomes rougher</li>
            <li>Raised patterns cover most of the fruit</li>
          </ul>
          <p>Well-developed netting often indicates the fruit has completed much of its growth and is approaching harvest.</p>
        </div>
        {/* Card 5 */}
        <div className="blog-card-item">
          <h3 className="blog-card-title">5. Fruit Firmness</h3>
          <p>Farmers also evaluate firmness to ensure fruit quality.</p>
          <p>A ripe cantaloupe should:</p>
          <ul className="blog-ul">
            <li>Feel firm but not hard</li>
            <li>Have slight softness at the blossom end</li>
            <li>Show no signs of excessive softness or decay</li>
          </ul>
          <p>Maintaining proper firmness helps preserve quality during handling and transportation.</p>
        </div>
      </div>

      {/* Blue Quality Banner */}
      <div className="blog-quality-banner">
        <h3 className="banner-title">How Berry Boss Farm Ensures Quality</h3>
        <p>
          At Berry Boss Farm, every cantaloupe is monitored throughout the growing season. Our team evaluates
          color, aroma, netting development, firmness, and vine condition before harvesting.
        </p>
        <p>
          By combining traditional farming knowledge with modern growing practices, we ensure that each
          cantaloupe is harvested at the ideal stage of ripeness, delivering exceptional flavor and freshness
          from our fields to your table.
        </p>
      </div>

      {/* Conclusion Section */}
      <div className="blog-conclusion">
        <h2 className="blog-h2">Conclusion</h2>
        <p>
          Determining when a cantaloupe is ready to harvest requires experience, observation, and careful
          attention to detail. Farmers rely on several indicators, including color changes, the slip stage,
          aroma, netting development, and weather conditions.
        </p>
        <p>
          These methods help ensure that every cantaloupe reaches consumers with the sweetness, texture, and
          quality that make this fruit a favorite summertime treat. Through proper harvest timing and careful
          handling, farms like Berry Boss continue to provide fresh, delicious produce that families can enjoy
          throughout the season.
        </p>
      </div>
    </div>
  );
}

export default function NewsDetail({ article }) {
  const heroTitle = article ? article.title : 'How Farmers Know When a Cantaloupe Is Ready to Harvest';

  return (
    <>
      <Head>
        <title>Berry Boss - Growing Pure natural Goodness</title>
        <meta
          name="keywords"
          content="Berry Boss, fruit farms USA, fresh strawberries, muskmelons, watermelons, blackberries, premium fruit growers, sustainable farming, fresh produce, berry farm"
        />
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      </Head>

      <div className="two-wrapper">
        <div className="hero-container">
          <Header active="news" />

          {/* Hero Content */}
          <section className="hero-content">
            <h1 className="farm-title" style={{ color: '#fff', maxWidth: '900px' }}>
              {heroTitle}
            </h1>
            {/* Hero Image Section */}
            <div className="hero-image-container">
              <img
                src={article && article.image_url ? article.image_url : '/assets/news-detail-bg.jpg'}
                alt="Strawberry Field"
                className="hero-image"
                decoding="async"
              />
            </div>
          </section>
        </div>
      </div>

      <section className="news-detail-section">
        {article ? <DynamicArticle article={article} /> : <DefaultArticle />}
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

export async function getServerSideProps({ query }) {
  const article = await fetchNewsById(query.id);
  return { props: { article } };
}
