import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import SanityMeter from "./index";

describe(`SanityMeter Component`, () => {
  describe(`Smoke test`, () => {
    it(`Renders without crashing`, () => {
      const div = document.createElement("div");
      ReactDOM.render(
        <BrowserRouter>
          <SanityMeter />
        </BrowserRouter>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe(`Snapshot test`, () => {
    it(`Renders the UI as expected`, () => {
      const tree = renderer
        .create(
          <BrowserRouter>
            <SanityMeter />
          </BrowserRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
