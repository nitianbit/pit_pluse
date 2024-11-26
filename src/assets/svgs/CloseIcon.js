import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CloseIcon = (props) => (
  <Svg
    width="30px"
    height="30px"
    viewBox="0 0 0.8 0.8"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fill={props?.fill || "#030708"}
      fillRule="evenodd"
      d="M0.565 0.165a0.05 0.05 0 1 1 0.071 0.071L0.471 0.4l0.165 0.165a0.05 0.05 0 0 1 -0.071 0.071L0.4 0.471l-0.165 0.165a0.05 0.05 0 0 1 -0.071 -0.071L0.329 0.4 0.165 0.235a0.05 0.05 0 0 1 0.071 -0.071L0.4 0.329z"
    />
  </Svg>
);
export default CloseIcon;
