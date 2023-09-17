import styles from './styles.module.css';

const red = '#821200';
const blue = '#1953cb';

export const PlayerSummary = ({ mainPlayer = false}) => {
  return (
    <div 
      style={{ backgroundColor: mainPlayer ? red : blue}} 
      className={styles.main}>
      Player Summary Component
    </div>
  );
}