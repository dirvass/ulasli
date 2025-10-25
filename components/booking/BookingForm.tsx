'use client';

import { useMemo, useState } from 'react';
import styles from './BookingForm.module.css';

type VillaOption = {
  id: string;
  name: string;
  nightlyRate: number;
  maxGuests: number;
  description: string;
};

type ExtraOption = {
  id: string;
  label: string;
  price: number;
  pricingModel: 'perStay' | 'perNight';
};

const villas: VillaOption[] = [
  {
    id: 'aria',
    name: 'Villa Aria',
    nightlyRate: 1250,
    maxGuests: 6,
    description: 'Cliffside infinity pool, glass atrium living, signature spa suite.'
  },
  {
    id: 'lumen',
    name: 'Villa Lumen',
    nightlyRate: 1490,
    maxGuests: 8,
    description: 'Immersive sound studio, sky deck lounge, private chef kitchen.'
  },
  {
    id: 'solace',
    name: 'Villa Solace',
    nightlyRate: 980,
    maxGuests: 4,
    description: 'Botanical courtyard, wellness pavilion, bespoke art curation.'
  }
];

const extras: ExtraOption[] = [
  { id: 'chef', label: 'Resident chef & breakfast pantry', price: 420, pricingModel: 'perNight' },
  { id: 'wellness', label: 'Daily wellness ritual & spa concierge', price: 680, pricingModel: 'perStay' },
  { id: 'yacht', label: 'Sunset yacht charter', price: 950, pricingModel: 'perStay' }
];

function differenceInNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  if (Number.isNaN(diff) || diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function BookingForm() {
  const [villaId, setVillaId] = useState<VillaOption['id']>('aria');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const villa = useMemo(() => villas.find(v => v.id === villaId) ?? villas[0], [villaId]);

  const nights = useMemo(() => differenceInNights(checkIn, checkOut), [checkIn, checkOut]);

  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((total, extraId) => {
      const extra = extras.find(item => item.id === extraId);
      if (!extra) return total;
      return total + (extra.pricingModel === 'perNight' ? extra.price * Math.max(1, nights) : extra.price);
    }, 0);
  }, [selectedExtras, nights]);

  const accommodationTotal = nights * villa.nightlyRate;
  const grandTotal = accommodationTotal + extrasTotal;
  const pricePerGuest = guests > 0 ? grandTotal / guests : grandTotal;

  function toggleExtra(id: string) {
    setSelectedExtras(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  }

  const canSubmit = nights > 0 && guests > 0;

  return (
    <form className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.section}>
          <h2>Secure your stay</h2>
          <p>Choose your residence, preferred dates, and any elevated services you would like our concierge to arrange.</p>

          <label className={styles.label}>
            Villa selection
            <select value={villaId} onChange={event => setVillaId(event.target.value)}>
              {villas.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name} — €{option.nightlyRate.toLocaleString('en-US')} nightly
                </option>
              ))}
            </select>
          </label>
          <p className={styles.helper}>{villa.description}</p>

          <div className={styles.inlineFields}>
            <label className={styles.label}>
              Check-in
              <input type="date" value={checkIn} onChange={event => setCheckIn(event.target.value)} />
            </label>
            <label className={styles.label}>
              Check-out
              <input type="date" value={checkOut} onChange={event => setCheckOut(event.target.value)} />
            </label>
            <label className={styles.label}>
              Guests
              <input
                type="number"
                min={1}
                max={villa.maxGuests}
                value={guests}
                onChange={event => setGuests(Number(event.target.value) || 0)}
              />
            </label>
          </div>
          <p className={styles.helper}>This villa accommodates up to {villa.maxGuests} guests.</p>

          <fieldset className={styles.fieldset}>
            <legend>Curated experiences</legend>
            {extras.map(extra => (
              <label key={extra.id} className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={selectedExtras.includes(extra.id)}
                  onChange={() => toggleExtra(extra.id)}
                />
                <span>
                  <strong>{extra.label}</strong>
                  <small>
                    €{extra.price.toLocaleString('en-US')} {extra.pricingModel === 'perNight' ? 'per night' : 'per stay'}
                  </small>
                </span>
              </label>
            ))}
          </fieldset>

          <label className={styles.label}>
            Share any special requests
            <textarea
              rows={4}
              value={message}
              placeholder="Airport details, celebration notes, arrival time, dietary preferences..."
              onChange={event => setMessage(event.target.value)}
            />
          </label>
        </div>

        <aside className={styles.summary}>
          <h3>Reservation summary</h3>
          <dl>
            <div>
              <dt>Villa</dt>
              <dd>{villa.name}</dd>
            </div>
            <div>
              <dt>Stay length</dt>
              <dd>{nights > 0 ? `${nights} night${nights === 1 ? '' : 's'}` : 'Select your dates'}</dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{guests > 0 ? `${guests} guest${guests === 1 ? '' : 's'}` : 'Add guests'}</dd>
            </div>
          </dl>

          <div className={styles.totals}>
            <div>
              <span>Accommodation</span>
              <strong>€{accommodationTotal.toLocaleString('en-US')}</strong>
            </div>
            <div>
              <span>Experiences</span>
              <strong>€{extrasTotal.toLocaleString('en-US')}</strong>
            </div>
            <div className={styles.grandTotal}>
              <span>Total investment</span>
              <strong>€{grandTotal.toLocaleString('en-US')}</strong>
            </div>
            <p className={styles.perGuest}>≈ €{pricePerGuest.toLocaleString('en-US')} per guest</p>
          </div>

          <button type="submit" className={styles.submit} disabled={!canSubmit}>
            Request personalised itinerary
          </button>
          <p className={styles.disclaimer}>
            Submitting confirms our concierge will reach out within 12 hours to confirm availability and arrange deposit
            details. No payment is taken on this screen.
          </p>
        </aside>
      </div>
    </form>
  );
}
