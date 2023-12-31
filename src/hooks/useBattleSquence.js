import { useEffect, useState } from "react";
import { opponentStats } from "shared/characters";
import { playerStats } from "shared/characters";
import { attack, magic, heal } from "shared/helpers";
import { wait } from "shared/helpers";


export const useBattleSequence = ( sequence ) => {

    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
    const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState('');
    const [playerAnimation, setPlayerAnimation] = useState('static');
    const [opponentAnimation, setOpponentAnimation] = useState('static');

    useEffect(() => {
        const { mode, turn } = sequence;

        if (mode) {

            const attacker = turn === 0 ? playerStats : opponentStats;
            const receiver = turn === 0 ? opponentStats : playerStats;

            switch (mode) {
                case 'attack':{
                    const damage = attack ({ attacker, receiver });

                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation('attack');
                        await wait(100);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');
                        await wait(500);

                        turn === 0 ? setOpponentAnimation('damage') : setPlayerAnimation('damage');
                        await wait(750);

                        turn === 0 ? setOpponentAnimation('static') : setPlayerAnimation('static');
                        setAnnouncerMessage(`${receiver.name} felt that!`)
                        turn === 0 
                            ? setOpponentHealth(health => (health - damage > 0 ? health - damage : 0)) 
                            : setPlayerHealth(health => (health - damage > 0 ? health - damage : 0)) 
                        await wait(2000);

                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);

                    })();
                    break;
                }

                case 'magic': {
                    const damage = magic ({ attacker, receiver });

                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has cast a spell!`);
                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('magic') : setOpponentAnimation('magic');
                        await wait(100);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');
                        await wait(500);

                        turn === 0 ? setOpponentAnimation('damage') : setPlayerAnimation('damage');
                        await wait(750);

                        turn === 0 ? setOpponentAnimation('static') : setPlayerAnimation('static');
                        setAnnouncerMessage(`${receiver.name} doesn't know what hit them!`)
                        turn === 0 
                            ? setOpponentHealth(health => (health - damage > 0 ? health - damage : 0)) 
                            : setPlayerHealth(health => (health - damage > 0 ? health - damage : 0)) 
                        await wait(2000);

                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);

                    })();
                    break;
                }

                case 'heal':{
                    const recovered = heal({ reciever: attacker });
                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('magic') : setOpponentAnimation('magic');
                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');
                        await wait(500);

                        setAnnouncerMessage(`${attacker.name} has recovered ${recovered} health.`);
                        turn === 0 
                            ? setPlayerHealth (health => 
                                health + recovered <= attacker.maxHealth 
                                ? health + recovered 
                                : attacker.maxHealth
                            ) 
                            : setOpponentHealth (health => 
                                health + recovered <= attacker.maxHealth 
                                ? health + recovered 
                                : attacker.maxHealth
                            );

                        await wait(2500);
                            
                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);
                    })();

                    break;
                }

                default:
                    break;
            }
        }
    }, [sequence]);

    return {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
    }
};