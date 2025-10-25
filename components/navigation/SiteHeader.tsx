import Link from 'next/link';
import styles from './SiteHeader.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/booking', label: 'Booking' },
  { href: '/roi', label: 'ROI Planner' }
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.branding}>
          <span className={styles.badge}>Luxe</span>
          <div>
            <p className={styles.subtitle}>Ulusli Villas</p>
            <h1 className={styles.title}>Retreat Collection</h1>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Main navigation">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.ctaWrapper}>
          <Link href="/booking" className={styles.cta}>
            Start booking
          </Link>
        </div>
      </div>
    </header>
  );
}
