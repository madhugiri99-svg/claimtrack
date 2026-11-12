import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Icon, type IconName } from '../components/Icon/Icon';
import styles from './AppShell.module.css';

const navItems: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Overview', icon: 'home', end: true },
  { to: '/claims', label: 'My claims', icon: 'claims' },
  { to: '/documents', label: 'Documents', icon: 'file' },
  { to: '/help', label: 'Help', icon: 'help' },
];

/**
 * Layout for every page.
 * - Phone (<768px): top bar with a menu button that opens the nav as a panel.
 * - Tablet (768–1279px): icon-only side nav; labels appear as tooltips on hover/focus.
 * - Desktop (>=1280px): full side nav with labels.
 */
export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const location = useLocation();

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // While the mobile menu is open: focus its first link, and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    nav.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className={styles.shell}>
      <a href="#main" className="skip-link" onClick={skipToMain}>
        Skip to main content
      </a>

      <header className={styles.topBar}>
        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name="menu" />
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
        <Brand />
        <span className={styles.avatar} aria-hidden="true">
          JM
        </span>
      </header>

      <nav
        ref={nav}
        id="site-nav"
        aria-label="Main"
        className={[styles.sideNav, menuOpen && styles.open].filter(Boolean).join(' ')}
      >
        <div className={styles.navBrand}>
          <Brand />
        </div>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={styles.navLink}>
                <Icon name={item.icon} size={20} />
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main id="main" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

function Brand() {
  return (
    <span className={styles.brand}>
      <span className={styles.logoMark} aria-hidden="true" />
      <span className={styles.brandName}>Prairie Mutual</span>
    </span>
  );
}

// With a hash router, "#main" would be treated as a route, so move focus by hand.
function skipToMain(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document.getElementById('main')?.focus();
}
