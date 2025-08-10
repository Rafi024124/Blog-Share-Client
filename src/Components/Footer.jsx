import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Navbar links
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Add Blog', to: '/addBlogs' },
    { label: 'My Blogs', to: '/myBlogs' },
    { label: 'Wishlist', to: '/myWishList' },
    { label: 'All Blogs', to: '/allBlogs' },
    { label: 'Featured Blogs', to: '/featuredBlogs' },
  ];

  // Footer links
  const footerLinks = {
    Services: [
      { label: 'Branding', to: '/branding' },
      { label: 'Design', to: '/design' },
      { label: 'Marketing', to: '/marketing' },
      { label: 'Advertisement', to: '/advertisement' },
    ],
    Company: [
      { label: 'About us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Jobs', to: '/jobs' },
      { label: 'Press kit', to: '/press-kit' },
    ],
  };

  return (
    <footer
      className="relative font-sans"
      style={{
        background:
          "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
        border: "1.5px solid rgba(170, 152, 169, 0.5)",
        color: '#5F4D7A',
        textAlign: 'center',
        padding: '3rem 1rem',
      }}
    >
      {/* Layered background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
          clipPath: "ellipse(100% 100% at 30% 100%)",
          zIndex: -1,
        }}
      />
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(170,152,169,0.85), rgba(203,195,227,0.99))",
          clipPath: "ellipse(100% 100% at 20% 100%)",
          zIndex: -1,
          opacity: 0.8,
        }}
      />

      {/* Navbar Links Section */}
      <nav style={{ marginBottom: '2rem' }}>
        {navLinks.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            style={{
              margin: '0 12px',
              color: '#5F4D7A',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#BC88F1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5F4D7A')}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer Links Columns */}
      <div className="flex flex-wrap justify-center gap-20 mb-8">
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} style={{ minWidth: '140px', textAlign: 'left' }}>
            <h6
              className="footer-title"
              style={{ color: '#5F4D7A', fontWeight: '700', marginBottom: '1rem' }}
            >
              {section}
            </h6>
            {links.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                style={{
                  display: 'block',
                  color: '#5F4D7A',
                  marginBottom: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#BC88F1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#5F4D7A')}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}

        {/* Social Links */}
        <div style={{ minWidth: '140px', textAlign: 'left' }}>
          <h6
            className="footer-title"
            style={{ color: '#5F4D7A', fontWeight: '700', marginBottom: '1rem' }}
          >
            Social
          </h6>
          <div className="flex gap-5">
            <a
              aria-label="Twitter"
              href="#"
              style={{ color: '#5F4D7A', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#BC88F1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5F4D7A')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.045.762.127 1.124-4.09-.205-7.713-2.165-10.141-5.144-.423.725-.666 1.565-.666 2.465 0 1.7.865 3.197 2.18 4.077-.803-.025-1.56-.246-2.22-.615v.062c0 2.376 1.69 4.358 3.933 4.808-.412.112-.845.172-1.292.172-.316 0-.623-.031-.924-.088.623 1.944 2.432 3.359 4.575 3.399-1.676 1.313-3.791 2.096-6.088 2.096-.395 0-.787-.023-1.174-.069 2.17 1.39 4.75 2.202 7.523 2.202 9.027 0 13.965-7.481 13.965-13.964 0-.213-.005-.425-.014-.636.961-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>

            <a
              aria-label="YouTube"
              href="#"
              style={{ color: '#5F4D7A', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#BC88F1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5F4D7A')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-1.897.13-3.24 1.66-3.24 3.665v6.3c0 2.004 1.343 3.535 3.24 3.665 3.6.245 11.627.246 15.23 0 1.897-.13 3.24-1.66 3.24-3.665v-6.3c0-2.005-1.343-3.536-3.24-3.665zm-11.615 8.416v-5l5 2.5-5 2.5z" />
              </svg>
            </a>

            <a
              aria-label="Facebook"
              href="#"
              style={{ color: '#5F4D7A', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#BC88F1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5F4D7A')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.681-5.192 4.845v3.155z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', marginTop: '2rem', color: '#5F4D7A' }}>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
