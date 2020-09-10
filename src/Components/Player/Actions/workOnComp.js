const workOnComp = () => {
  console.log('yay time to work...');
  // face computer
  const directionToFace = 'back';

  // decrement health
  const health = -20;

  // decrement sanity 
  const sanity = -35;

  // increment money
  const money = 70;

  //time increase
  const time = 60;

  return {
    healthMod: health,
    sanityMod: sanity,
    moneyMod: money,
    timeMod: time,
    directionToFace: directionToFace
  };
};

export default workOnComp;