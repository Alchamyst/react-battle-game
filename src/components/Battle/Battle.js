import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { BattleAnnouncer } from 'components/BattleAnnouncer/BattleAnnouncer';
import { BattleMenu } from 'components/BattleMenu/BattleMenu';
import { PlayerSummary } from 'components/PlayerSummary/PlayerSummary';
import { opponentStats, playerStats } from 'shared/characters';
import { useBattleSequence } from 'hooks/useBattleSquence';
import { useAIOpponent } from 'hooks/useAIOpponent';
import { wait } from "shared/helpers";




export const Battle = ({ onGameEnd }) => {

  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice })
    }
  },[aiChoice, turn, inSequence]);

  useEffect(() => {
    if(playerHealth === 0 || opponentHealth === 0){
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? opponentStats : playerStats)
      })();
    }

  }, [playerHealth, opponentHealth, onGameEnd]);

  return (
    <>
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

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {playerStats.name} vs {opponentStats.name}
        </div>

        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              alt={playerStats.name}
              src={playerStats.img} 
              className={styles[playerAnimation]}
            />
          </div>

          <div className={styles.opponentSprite}>
          <img
              alt={opponentStats.name}
              src={opponentStats.img} 
              className={styles[opponentAnimation]}
            />
          </div>
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

        <div className={styles.hud}>

          <div className={styles.hudChild}>
            <BattleAnnouncer 
              message={
                announcerMessage || `What will ${playerStats.name} do?`
              }
            />
          </div>
          <div className={styles.hudChild}>
          {!sequence.inSequence &&
            <BattleMenu
              onAttack={() => setSequence({ turn, mode: 'attack' })}
              onMagic={() => setSequence({ turn, mode: 'magic' })}
              onHeal={() => setSequence({ turn, mode: 'heal' })}
            />
          }
          </div>
      </div>
      </div>

    </>
  );
}