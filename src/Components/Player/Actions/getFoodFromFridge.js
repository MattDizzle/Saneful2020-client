const getFood = () => {
  console.log('yesss fooddd!!');
  // face fridge
  const directionToFace = 'back';

  // decrement health
  const health = 70;

  // decrement sanity 
  const sanity = -20;

  // increment money
  const money = -35;

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

export default getFood;