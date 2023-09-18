import { Bar } from 'components/Bar/Bar';
import styles from './styles.module.css';

const red = '#821200';
const blue = '#1953cb';

export const PlayerSummary = ({ mainPlayer = false, name, level, health, maxHealth }) => {
  return (
    <div 
      style={{ backgroundColor: mainPlayer ? red : blue}} 
      className={styles.main}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>LVL: {level}</div>
      </div>

      <div className={styles.health}>
        <Bar label="HP" value={health} maxValue={maxHealth} />
      </div>

    </div>

  );
}