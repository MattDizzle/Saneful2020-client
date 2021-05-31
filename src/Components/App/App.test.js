import React from "react";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from '../../Context/UserContext';
import { GameProvider } from '../../Context/GameContext';
import App from "./App";

describe(`App Component`, () => {
    describe(`Smoke test`, () => {
        it("should render without crashing", () => {

            const div = document.createElement('div');

            ReactDOM.render(
            <BrowserRouter>
              <UserProvider>
                <GameProvider>
                  <App />
                </GameProvider>
              </UserProvider>
            </BrowserRouter>,
            div);

              ReactDOM.unmountComponentAtNode(div);
          });

    })

    describe(`Snapshot test`, () => {
        it(`Renders the UI as expected`, () => {

          const div = document.createElement('div');

            const tree = renderer
                .create(
                  <BrowserRouter>
                  <UserProvider>
                    <GameProvider>
                      <App />
                    </GameProvider>
                  </UserProvider>
                </BrowserRouter>)
                .toJSON()
            expect(tree).toMatchSnapshot()
        });
    });

})


