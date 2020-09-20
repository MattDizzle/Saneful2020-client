import React, { useContext, useState } from 'react';
import GameContext from '../../Context/GameContext';

import './DialogBox.scss';

export default function DialogBox(props) {

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
    setHealth,
    setSanity,
    setMoney,
    setElapsedTime
  } = context;

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

            setHealth(health_points - 35);
            setSanity(Math.min(sanity_points + 70, sanity_points_max));
            setMoney(money_counter - 20);
            setElapsedTime(elapsed_time + 60);
            // missing directiontoface front
          }
        },
        {
          id: 1,
          text: 'No',
          pointer: null,
          hasEffect: false,
          shouldExit: true,
          effect: () => { }
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

            setHealth(Math.min(health_points + 70, health_points_max));
            setSanity(sanity_points - 20);
            setMoney(money_counter - 35);
            setElapsedTime(elapsed_time + 60);

            // missing directiontoface back
          }
        },
        {
          id: 1,
          text: 'No',
          pointer: null,
          hasEffect: false,
          shouldExit: true,
          effect: () => { }
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

            setHealth(health_points - 20);
            setSanity(sanity_points - 35);
            setMoney(money_counter + 70);
            setElapsedTime(elapsed_time + 60);
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

            // setHealth(health_points - 20);
            // setSanity(Math.min(sanity_points + 10, sanity_points_max));
            // setElapsedTime(elapsed_time + 60);
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
          effect: () => { }
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
          effect: () => { }
        }
      ]
    },
  ];

  // need to do a for each for all passed in actions to display each action as a button

  const prompt = promptList.find(p => p.promptId === promptId);

  const handleOptionClick = (idx) => {
    prompt.options[idx].effect();

    if (prompt.options[idx].shouldExit) {
      stateService.setDialogBoxActive(false);
      stateService.setPlayerHasControl(true);
      stateService.setNextActions([]);
      stateService.setPendingActions([]);
      stateService.setTimeStopped(false);
    }

    setTimeout(() => {
      context.saveGame();
    }, 1000);
  };

  return (
    <div className='dialog-box-container'>
      <p>{prompt.text}</p>
      <div className='prompt-options'>
        {prompt.options.map((option, idx) => (
          <button key={idx} className='option-text' onClick={() => handleOptionClick(idx)}>{option.text}</button>
        ))}
      </div>
    </div>
  );
};