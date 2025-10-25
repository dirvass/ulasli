import { RoiPlanner } from 'components/roi/RoiPlanner';
import styles from './page.module.css';

export const metadata = {
  title: 'ROI Planner',
  description: 'Interactive ROI calculator for Ulusli Villas investors and operators.'
};

export default function RoiPage() {
  return (
    <div className={styles.wrapper}>
      <RoiPlanner />
    </div>
  );
}
