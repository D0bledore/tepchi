import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    // Determine current page
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    setCurrentPage(page);
    
    // Update navbar height CSS variable
    const updateNavbarHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        document.documentElement.style.setProperty('--navbar-height', header.offsetHeight + 'px');
      }
    };
    
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          navRef.current && 
          !navRef.current.contains(event.target) && 
          !toggleRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    // Close menu when pressing Escape
    const handleEscKey = (event) => {
      if (isMenuOpen && event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  // Generate navigation links based on current page
  const getNavLinks = () => {
    if (currentPage === 'index.html') {
      return [
        { href: '#services', text: 'Tjänster' },
        { href: '#reviews', text: 'Recensioner' },
        { href: '#visit', text: 'Besök' },
        { href: 'about.html', text: 'Om oss' },
        { href: 'contact.html', text: 'Kontakt' }
      ];
    } else {
      return [
        { href: 'index.html', text: 'Hem' },
        { href: 'about.html', text: 'Om Oss' },
        { href: 'contact.html', text: 'Kontakt' }
      ];
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <a href="#main-content" className="skip-link">Hoppa till innehåll</a>
      <div className="navbar">
        <h1 className="site-title">
          <a href="index.html" className="logo">Tepchi Skrädderi &amp; Kemtvätt</a>
        </h1>
        <button 
          ref={toggleRef}
          className="nav-toggle" 
          aria-label={isMenuOpen ? "Stäng meny" : "Visa meny"} 
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <nav ref={navRef} className={isMenuOpen ? 'open' : ''} aria-label="Huvudmeny">
          <ul className="nav-links">
            {getNavLinks().map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className={link.href === currentPage ? 'active' : ''}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;