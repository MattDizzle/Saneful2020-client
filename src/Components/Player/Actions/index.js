import getFoodFromFridge from './getFoodFromFridge';
import relaxOnCouch from './relaxOnCouch';
import workOnComp from './workOnComp';


const DetermineAction = (actionString, executeAction) => {
  console.log('determining action...');
  if (actionString === 'do work on the computer') {
    executeAction(workOnComp());
  }
  else if (actionString === 'eat food') {
    executeAction(getFoodFromFridge());
  }
  else if (actionString === 'relax on the couch') {
    executeAction(relaxOnCouch());
  }
};

export default DetermineAction;