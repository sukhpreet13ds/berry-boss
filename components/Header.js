const NAV_ITEMS = [
  { key: 'home', href: '/', label: 'Home', delay: '0.1s' },
  { key: 'grow', href: '/what-we-grow', label: 'What We Grow', delay: '0.2s' },
  { key: 'farm', href: '/farm', label: 'Our Farm', delay: '0.3s' },
  { key: 'safety', href: '/food-safety', label: 'Food Safety', delay: '0.4s' },
  { key: 'news', href: '/news', label: 'News', delay: '0.5s' },
  { key: 'contact', href: '/contact-us', label: 'Contact us', delay: '0.6s' },
];

export default function Header({ active }) {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo-wrapper">
          <a href="/">
            <img src="/assets/berry-boss-logo.svg" alt="Berry Boss Logo" className="logo" decoding="async" />
          </a>
        </div>

        <button className="mobile-menu-btn" aria-label="Toggle Menu">
          <i className="fa-solid fa-bars"></i>
        </button>

        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`nav-item${active === item.key ? ' active' : ''} scroll-animate`}
              data-animation="fadeInDown"
              data-delay={item.delay}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="contact-wrapper">
          <a href="tel:813-659-0577" className="phone-link" aria-label="Call Berry Boss at 813-659-0577">
            <span className="phone-icon-circle">
              <i className="fa-solid fa-phone"></i>
            </span>
            <span className="phone-number">813-659-0577</span>
          </a>
          <a href="/contact-us" className="btn btn-red contact-btn">
            Contact Us <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className="mobile-menu-drawer">
        <button className="mobile-menu-close" aria-label="Close Menu">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <nav className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`mobile-nav-item${active === item.key ? ' active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-contact-info">
          <a href="tel:813-659-0577" className="phone-link" aria-label="Call Berry Boss at 813-659-0577">
            <span className="phone-icon-circle">
              <i className="fa-solid fa-phone"></i>
            </span>
            <span className="phone-number">813-659-0577</span>
          </a>
          <a href="/contact-us" className="btn btn-red contact-btn">
            Contact Us <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div className="mobile-menu-overlay"></div>
    </>
  );
}
