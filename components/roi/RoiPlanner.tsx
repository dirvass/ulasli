'use client';

import { useMemo, useState } from 'react';
import styles from './RoiPlanner.module.css';

type VillaRow = {
  id: string;
  name: string;
  nightlyRate: number;
  occupancy: number;
  costRatio: number;
};

type Scenario = 'pessimistic' | 'base' | 'optimistic';

const createId = () => Math.random().toString(36).slice(2, 10);

const SCENARIOS: Record<Scenario, { rateMultiplier: number; costRatio: number; label: string }> = {
  pessimistic: { rateMultiplier: 0.7, costRatio: 0.42, label: 'Pessimistic' },
  base: { rateMultiplier: 1, costRatio: 0.36, label: 'Base case' },
  optimistic: { rateMultiplier: 1.28, costRatio: 0.3, label: 'Optimistic' }
};

const YEARS = [5, 10, 15];

const CURRENCY_SYMBOLS = ['€', '$', '£'];

export function RoiPlanner() {
  const [currency, setCurrency] = useState('€');
  const [villas, setVillas] = useState<VillaRow[]>([
    { id: createId(), name: 'Villa Aria', nightlyRate: 1250, occupancy: 0.64, costRatio: 0.36 },
    { id: createId(), name: 'Villa Lumen', nightlyRate: 1490, occupancy: 0.61, costRatio: 0.36 }
  ]);

  const rows = useMemo(() => {
    return villas.map(villa => {
      const ebitda = villa.nightlyRate * 365 * villa.occupancy;
      const netProfit = ebitda * (1 - villa.costRatio);
      return { ...villa, ebitda, netProfit };
    });
  }, [villas]);

  const totals = useMemo(() => {
    const aggregated = rows.reduce(
      (acc, row) => {
        acc.ebitda += row.ebitda;
        acc.netProfit += row.netProfit;
        return acc;
      },
      { ebitda: 0, netProfit: 0 }
    );
    return aggregated;
  }, [rows]);

  function updateVilla(id: string, payload: Partial<VillaRow>) {
    setVillas(previous => previous.map(villa => (villa.id === id ? { ...villa, ...payload } : villa)));
  }

  function addVilla() {
    setVillas(previous => [
      ...previous,
      {
        id: createId(),
        name: `Villa ${String.fromCharCode(65 + previous.length)}`,
        nightlyRate: 1100,
        occupancy: 0.6,
        costRatio: 0.36
      }
    ]);
  }

  function removeVilla(id: string) {
    setVillas(previous => previous.filter(villa => villa.id !== id));
  }

  function applyScenario(type: Scenario) {
    const { costRatio, rateMultiplier } = SCENARIOS[type];
    setVillas(previous =>
      previous.map(villa => ({
        ...villa,
        nightlyRate: Math.round(villa.nightlyRate * rateMultiplier),
        costRatio,
        occupancy: villa.occupancy
      }))
    );
  }

  const formatter = (value: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

  return (
    <div className={styles.wrapper}>
      <header className={styles.intro}>
        <div>
          <p className={styles.label}>Investment outlook</p>
          <h2>Model projected returns for your villa portfolio</h2>
        </div>
        <div className={styles.controls}>
          <label>
            Currency
            <select value={currency} onChange={event => setCurrency(event.target.value)}>
              {CURRENCY_SYMBOLS.map(symbol => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.scenarioToggle} role="group" aria-label="Scenario presets">
            {Object.entries(SCENARIOS).map(([key, value]) => (
              <button key={key} type="button" onClick={() => applyScenario(key as Scenario)}>
                {value.label}
              </button>
            ))}
          </div>
          <button type="button" className={styles.addVilla} onClick={addVilla}>
            + Add villa
          </button>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Villa</th>
              <th>Nightly rate</th>
              <th>Occupancy</th>
              <th>Operating cost %</th>
              <th>EBITDA</th>
              <th>Net profit</th>
              {YEARS.map(year => (
                <th key={year}>{year}Y ROI</th>
              ))}
              <th aria-label="actions"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>
                  <input
                    value={row.name}
                    onChange={event => updateVilla(row.id, { name: event.target.value })}
                  />
                </td>
                <td>
                  <div className={styles.inputGroup}>
                    <span>{currency}</span>
                    <input
                      type="number"
                      min={0}
                      value={row.nightlyRate}
                      onChange={event => updateVilla(row.id, { nightlyRate: Number(event.target.value) || 0 })}
                    />
                    <small>/night</small>
                  </div>
                </td>
                <td>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={Math.round(row.occupancy * 100)}
                      onChange={event =>
                        updateVilla(row.id, {
                          occupancy: Math.min(100, Math.max(0, Number(event.target.value))) / 100
                        })
                      }
                    />
                    <small>%</small>
                  </div>
                </td>
                <td>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={Math.round(row.costRatio * 100)}
                      onChange={event =>
                        updateVilla(row.id, {
                          costRatio: Math.min(100, Math.max(0, Number(event.target.value))) / 100
                        })
                      }
                    />
                    <small>%</small>
                  </div>
                </td>
                <td>
                  {currency} {formatter(row.ebitda)}
                </td>
                <td className={styles.netCell}>
                  {currency} {formatter(row.netProfit)}
                </td>
                {YEARS.map(year => (
                  <td key={year}>{currency} {formatter(row.netProfit * year)}</td>
                ))}
                <td className={styles.actionCell}>
                  <button type="button" onClick={() => removeVilla(row.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th colSpan={3}></th>
              <th>
                {currency} {formatter(totals.ebitda)}
              </th>
              <th className={styles.netCell}>
                {currency} {formatter(totals.netProfit)}
              </th>
              {YEARS.map(year => (
                <th key={year}>{currency} {formatter(totals.netProfit * year)}</th>
              ))}
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <section className={styles.footnotes}>
        <h3>How the calculations work</h3>
        <ul>
          <li>EBITDA = nightly rate × 365 × occupancy</li>
          <li>Net profit = EBITDA × (1 − operating cost %)</li>
          <li>ROI horizon = net profit × number of years</li>
        </ul>
        <p>
          Adjust your inputs to explore pricing strategies, repositioning scenarios, and capex recovery models. Export-ready
          summaries make it easy to share updates with stakeholders or include in investor decks.
        </p>
      </section>
    </div>
  );
}
