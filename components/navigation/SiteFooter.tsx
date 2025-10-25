import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <p className={styles.label}>Book with confidence</p>
          <p className={styles.title}>Ulusli Villas</p>
        </div>
        <p className={styles.meta}>
          © {new Date().getFullYear()} Ulusli Retreat Collection. Crafted for investors &amp; guests who expect the
          extraordinary.
        </p>
      </div>
    </footer>
  );
}
