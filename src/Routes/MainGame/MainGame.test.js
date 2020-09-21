import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import MainGame from '../MainGame';


describe(`MainGame Component`, () => {
  describe(`Smoke test`, () => {
    it(`Renders without crashing`, () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <BrowserRouter>
          <MainGame />
        </BrowserRouter>
        , div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe(`Snapshot test`, () => {
    it(`Renders the UI as expected`, () => {
      const tree = renderer
        .create(
          <BrowserRouter>
            <MainGame />
          </BrowserRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});