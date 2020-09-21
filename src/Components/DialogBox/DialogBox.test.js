import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import DialogBox from './index';


describe(`DialogBox Component`, () => {
  describe(`Smoke test`, () => {
    it(`Renders without crashing`, () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <BrowserRouter>
          <DialogBox text={'text'} />
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
            <DialogBox text={'text'} />
          </BrowserRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});