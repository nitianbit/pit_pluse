import * as React from "react";
import Svg, { Path } from "react-native-svg";
const FlagDotted = (props) => (
  <Svg
    fill="#000000"
    width="30px"
    height="30px"
    viewBox="0 0 0.8 0.8"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M0.05 0.05v0.75h0.1v-0.2h0.65V0.05zm0.7 0.35h-0.15v0.15H0.45V0.4H0.3v0.15H0.15V0.4h0.15V0.25H0.15V0.1h0.15v0.15h0.15V0.1h0.15v0.15h0.15zM0.45 0.25v0.15h0.15V0.25z" />
  </Svg>
);
export default FlagDotted;
