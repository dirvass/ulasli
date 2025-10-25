import styles from './page.module.css';
import { BookingForm } from 'components/booking/BookingForm';

export const metadata = {
  title: 'Booking',
  description: 'Live availability, curated experiences, and tailored itineraries for Ulusli Villas.'
};

export default function BookingPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.heading}>
        <p className={styles.label}>Booking studio</p>
        <h2>Curate every stay with precision</h2>
        <p>
          Build high-converting itineraries in minutes. Select your residence, add signature experiences, and share personal
          requests—our concierge team will follow up immediately to finalise the reservation.
        </p>
      </header>
      <BookingForm />
    </div>
  );
}
