import getFoodFromFridge from './getFoodFromFridge';
import relaxOnCouch from './relaxOnCouch';
import workOnComp from './workOnComp';


const DetermineAction = (actionString) => {
  console.log('determining action');
  if (actionString === 'do work on the computer') {
    workOnComp();
  }
  else if (actionString === 'eat food') {
    getFoodFromFridge();
  }
  else if (actionString === 'relax on the couch') {
    relaxOnCouch();
  }
};

export default DetermineAction;