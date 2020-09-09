const relaxOnCouch = () => {
  console.log('so relaxing...');
  return 'so relaxing...';
};

const workOnComp = () => {
  console.log('yay time to work...');
};

const getFood = () => {
  console.log('yesss fooddd!!');
};

export const mainRoomData =
  [
    {
      row: 4,
      col: 2,
      name: 'couch1',
      hasPlayer: false,
      walkable: false,
      hasAction: true,
      action: relaxOnCouch
    },
    {
      row: 4,
      col: 3,
      name: 'couch2',
      hasPlayer: false,
      walkable: false,
      hasAction: true,
      action: relaxOnCouch
    },
    {
      row: 6,
      col: 2,
      name: 'tv',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    { /* Back wall start */
      row: 0,
      col: 0,
      name: 'wall1',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 0,
      col: 1,
      name: 'desk1',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 0,
      col: 2,
      name: 'computer',
      hasPlayer: false,
      walkable: false,
      hasAction: true,
      action: workOnComp
    },
    {
      row: 0,
      col: 3,
      name: 'wall2',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 0,
      col: 4,
      name: 'window',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 0,
      col: 5,
      name: 'fridge',
      hasPlayer: false,
      walkable: false,
      hasAction: true,
      action: getFood
    },
    {
      row: 0,
      col: 6,
      name: 'kitchen1',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 0,
      col: 7,
      name: 'kitchen2',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 0,
      col: 8,
      name: 'kitchen3',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 0,
      col: 9,
      name: 'wall3',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    }, /* Back wall finish */
  ];
