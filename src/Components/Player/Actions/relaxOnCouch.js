const relaxOnCouch = () => {
  console.log('so relaxing...');
  // walk to couch 
  // face tv
  const directionToFace = 'front';

  // decrement health
  const health = -35;

  // decrement sanity 
  const sanity = 70;

  // increment money
  const money = -20;

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

export default relaxOnCouch;