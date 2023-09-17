import styles from './styles.module.css';
import { useState } from 'react';
import { PlayerSummary } from 'components/PlayerSummary';
import { opponentStats, playerStats } from 'shared';

export const Battle = () => {

  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
  const [playerHealth, setplayerHealth] = useState(playerStats.maxHealth);

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary 
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>
      </div>
        
      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary 
            mainPlayer={true} 
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
          />
        </div>
      </div>

    </div>
  );
}