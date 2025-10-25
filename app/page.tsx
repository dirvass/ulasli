import Link from 'next/link';
import styles from './page.module.css';

const highlightStats = [
  { value: '12', label: 'Private cliffside villas' },
  { value: '48%', label: 'Average occupancy increase' },
  { value: '4.9/5', label: 'Guest satisfaction' }
];

const experiencePillars = [
  {
    title: 'Signature arrival experience',
    description:
      'Door-to-door concierge, private chauffeurs, and custom welcome rituals for every guest itinerary.'
  },
  {
    title: 'Wellness & gastronomy',
    description:
      'On-demand chefs, nutrition planning, and spa treatments tailored to each stay length and party size.'
  },
  {
    title: 'Owner-centric dashboards',
    description:
      'Monitor bookings, rate strategy, and asset performance through a single secure investor portal.'
  }
];

const villas = [
  {
    name: 'Villa Aria',
    size: '3 suites · 520 m²',
    view: 'Sunrise peninsula views',
    perks: 'Infinity lap pool · Private cinema · Atelier kitchen'
  },
  {
    name: 'Villa Lumen',
    size: '4 suites · 640 m²',
    view: 'Sunset ridge panorama',
    perks: 'Wellness pavilion · Immersive sound studio · Sky deck'
  },
  {
    name: 'Villa Solace',
    size: '2 suites · 410 m²',
    view: 'Secret garden terraces',
    perks: 'Meditation cove · Cold plunge · Curated art collection'
  }
];

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroBadge}>Exclusive pre-launch preview</div>
        <h2 className={styles.heroTitle}>Book an unforgettable stay, project your returns, and welcome guests in one place.</h2>
        <p className={styles.heroCopy}>
          The Ulusli Villas booking platform blends immersive storytelling with commercial clarity. Convert high-intent leads,
          nurture investors, and orchestrate every stay with a digital experience crafted for premium developments.
        </p>
        <div className={styles.heroActions}>
          <Link href="/booking" className={styles.primaryCta}>
            Launch booking flow
          </Link>
          <Link href="/roi" className={styles.secondaryCta}>
            Calculate projected ROI
          </Link>
        </div>
        <dl className={styles.stats}>
          {highlightStats.map(stat => (
            <div key={stat.label} className={styles.statItem}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>What makes the Ulusli platform different?</h3>
        <div className={styles.pillars}>
          {experiencePillars.map(pillar => (
            <article key={pillar.title} className={styles.pillarCard}>
              <h4>{pillar.title}</h4>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Flagship villas ready for booking</h3>
          <Link href="/booking" className={styles.inlineLink}>
            View live availability →
          </Link>
        </div>
        <div className={styles.villas}>
          {villas.map(villa => (
            <article key={villa.name} className={styles.villaCard}>
              <h4>{villa.name}</h4>
              <p className={styles.villaMeta}>{villa.size}</p>
              <p className={styles.villaView}>{villa.view}</p>
              <p className={styles.villaPerks}>{villa.perks}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Designed for investors and operators</h3>
          <p className={styles.sectionLead}>
            Smart integrations, transparent KPIs, and revenue management tools keep your occupancy high while safeguarding
            brand positioning.
          </p>
        </div>
        <div className={styles.benefits}> 
          <div>
            <h4>Channel management</h4>
            <p>Sync bespoke microsites, OTA partners, and CRM workflows without diluting your premium pricing.</p>
          </div>
          <div>
            <h4>Dynamic packaging</h4>
            <p>Bundle private chefs, yacht charters, and curated excursions with a drag-and-drop itinerary builder.</p>
          </div>
          <div>
            <h4>Owner statements</h4>
            <p>Produce quarterly-ready investment statements and ROI updates directly from the ROI planner module.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
