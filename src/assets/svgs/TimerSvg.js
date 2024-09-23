import * as React from "react";
import Svg, { Path } from "react-native-svg";
const TimerSvg= (props) => {
    const { color = "#030708" } = props; // default color is set to #030708

  return <Svg
    width="24px"
    height="24px"
    viewBox="0 0 0.48 0.48"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path
      fill={color}
      d="M0.272 0.272c0.008 -0.008 0.013 -0.019 0.013 -0.032s-0.005 -0.024 -0.013 -0.032c-0.018 -0.018 -0.202 -0.138 -0.202 -0.138s0.12 0.184 0.138 0.202a0.045 0.045 0 0 0 0.064 0"
    />
    <Path
      fill={color}
      d="M0.24 0v0.09h0.03V0.048c0.095 0.015 0.166 0.096 0.166 0.193a0.196 0.196 0 1 1 -0.362 -0.103L0.046 0.099A0.238 0.238 0 0 0 0.001 0.24a0.24 0.24 0 1 0 0.24 -0.24z"
    />
  </Svg>
};
export default TimerSvg;
