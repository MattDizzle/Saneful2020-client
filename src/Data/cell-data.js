const relaxOnCouch = () => {
  console.log('so relaxing...');
  // walk to couch 
  // face tv
  // increment sanity
  // decrement health
};

const workOnComp = () => {
  console.log('yay time to work...');
  // face computer
  // increment money
  // decrement sanity
};

const getFood = () => {
  console.log('yesss fooddd!!');
  // face fridge
  // increment health
  // decrement money
};

export const mainRoomData =
  [
    {
      row: 4,
      col: 2,
      name: 'couch1',
      hasPlayer: false,
      walkable: true,
      hasAction: true,
      action: relaxOnCouch
    },
    {
      row: 4,
      col: 3,
      name: 'couch2',
      hasPlayer: false,
      walkable: true,
      hasAction: true,
      action: relaxOnCouch
    },
    {
      row: 6,
      col: 2,
      name: 'tv',
      hasPlayer: false,
      walkable: true,
      hasAction: false,
      action: relaxOnCouch
    },
    {
      row: 6,
      col: 9,
      name: 'clothes1',
      hasPlayer: false,
      walkable: false,
      hasAction: false,
      action: () => { }
    },
    {
      row: 7,
      col: 9,
      name: 'clothes1',
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
      name: 'computerBack',
      hasPlayer: false,
      walkable: false,
      hasAction: true,
      action: workOnComp
    },
    {
      row: 1,
      col: 2,
      name: 'computerFront',
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
      name: 'fridgeBack',
      hasPlayer: false,
      walkable: false,
      hasAction: true,
      action: getFood
    },
    {
      row: 1,
      col: 5,
      name: 'fridgeFront',
      hasPlayer: false,
      walkable: true,
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
