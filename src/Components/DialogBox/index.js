import React, { useContext, useState } from 'react';
import GameContext from '../../Context/GameContext';

import './DialogBox.scss';

export default function DialogBox (props) {

  const context = useContext(GameContext);

  const stateService = props.stateService;

  const [promptId, setPromptId] = useState(stateService.pendingPromptId);

  const {
    money_counter,
    health_points,
    health_points_max,
    sanity_points,
    sanity_points_max,
    elapsed_time,
  } = context.gameData;


  const promptList = [
    {
      promptId: 0,
      name: 'relax on couch',
      text: 'Would you like to relax on the couch for an hour?',
      options: [
        {
          id: 0,
          text: 'Yes',
          pointer: null,
          hasEffect: true,
          shouldExit: true,
          effect: () => {
            console.log('so relaxing...');

            context.setGameData({
              health_points: health_points - 35,
              sanity_points: sanity_points + 70,
              money_counter: money_counter - 20,
              elapsed_time: elapsed_time + 60
            })
            // missing directiontoface front
          }
        },
        {
          id: 1,
          text: 'No',
          pointer: null,
          hasEffect: false,
          shouldExit: true,
          effect: () => {}
        }
      ]
    },
  
    {
      promptId: 1,
      name: 'eat food',
      text: 'Would you like to eat food for an hour?',
      options: [
        {
          id: 0,
          text: 'Yes',
          pointer: null,
          hasEffect: true,
          shouldExit: true,
          effect: () => {
            console.log('yesss fooddd!!');

            stateService.setHealth(stateService.health + 70);

            context.setGameData({
              health_points: health_points + 70,
              sanity_points: sanity_points - 20,
              money_counter: money_counter - 35,
              elapsed_time: elapsed_time + 60
            })
            // missing directiontoface back
          }
        },
        {
          id: 1,
          text: 'No',
          pointer: null,
          hasEffect: false,
          shouldExit: true,
          effect: () => {}
        }
      ]
    },
  
    {
      promptId: 2,
      name: 'computer decision',
      text: 'What would you like to do?',
      options: [
        {
          id: 0,
          text: 'Work remotely on the computer for an hour',
          pointer: 2,
          hasEffect: true,
          shouldExit: false,
          effect: () => {
            console.log('yay time to work...');

            context.setGameData({
              health_points: health_points - 20,
              sanity_points: sanity_points - 35,
              money_counter: money_counter + 70,
              elapsed_time: elapsed_time + 60
            });
            // missing directiontoface back

            setPromptId(2);
          }
        },
        {
          id: 1,
          text: 'Go online shopping for an hour',
          pointer: 3,
          hasEffect: true,
          shouldExit: false,
          effect: () => {
            console.log('retail therapy XD');

            context.setGameData({
              health_points: health_points - 20,
              sanity_points: sanity_points + 10,
              money_counter: money_counter,
              elapsed_time: elapsed_time + 60
            })
            // missing directiontoface back

            stateService.setOnlineStoreWindowActive(true);
            setPromptId(3);
          }
        },
        {
          id: 2,
          text: 'All done using computer',
          pointer: null,
          hasEffect: false,
          shouldExit: true,
          effect: () => {}
        }
      ]
    },
  
    {
      promptId: 3,
      name: 'go back or finish',
      text: 'What would you like to do?',
      options: [
        {
          id: 0,
          text: 'Go back to previous screen',
          pointer: 2,
          hasEffect: true,
          shouldExit: false,
          effect: () => {
            setPromptId(2);
          }
        },
        {
          id: 1,
          text: 'All done using computer',
          pointer: null,
          hasEffect: false,
          shouldExit: true,
          effect: () => {}
        }
      ]
    },
  ]

  // need to do a for each for all passed in actions to display each action as a button

  const prompt = promptList.find(p => p.promptId === promptId);

  const handleOptionClick = (idx) => {
    prompt.options[idx].effect();

    if (prompt.options[idx].shouldExit) {
      console.log('next action' + stateService.nextActions);
      console.log(stateService.nextActions);
      stateService.setDialogBoxActive(false);
      stateService.setPlayerHasControl(true);
      stateService.setNextActions([]);
      stateService.setPendingActions([]);
      stateService.setTimeStopped(false);

      setTimeout(() => {
        console.log('next action' + stateService.nextActions);
      }, 1000);
    }
  }

  // yes button will be replaced by all action options
  // no button will be replaced by a cancel/exit button

  return (
    <div className='dialog-box-container'>
      <p>{prompt.text}</p>
      <div className='prompt-options'>
        {prompt.options.map((option,idx) => (
          <button key={idx} className='option-text' onClick={() => handleOptionClick(idx)}>{option.text}</button>
        ))}
      </div>
    </div>
  ); 
};