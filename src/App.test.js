/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import App from "./App";

describe("<App/>", () => {
  it("renders correctly enzyme", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
