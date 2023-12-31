export const wait = ( milliseconds ) => new Promise(resolve => {
    setTimeout(() => {
        resolve();
    }, milliseconds)
});

export const attack = ({ attacker, receiver }) => {
    // const recievedDamage = attacker.attack - (attacker.level - receiver.level) * 1.25;  
    // const finalDamage = recievedDamage - receiver.defense / 2;

    const finalDamage = (attacker.attack * 2) - receiver.defense; 

    return finalDamage;
};

export const magic = ({ attacker, receiver }) => {
    // const recievedDamage = attacker.magic - (attacker.level - receiver.level) * 1.25; 
    // const finalDamage = recievedDamage - receiver.magicdefense / 2;

    const finalDamage = (attacker.magic * 2) - receiver.defense; 

    return finalDamage;
};

export const heal = ({ reciever }) => {
    // return reciever.magic + reciever.level * 0.25;
    return Math.round(reciever.magic * 1.25);
}