import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SetupSvg = (props) => {
    const { color = "#030708" } = props; // default color is set to #030708

    return <Svg
        width="24px"
        height="24px"
        viewBox="0 0 0.8 0.8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            clipRule="evenodd"
            d="M0.45 0H0.35l-0.028 0.11a0.3 0.3 0 0 0 -0.073 0.03L0.152 0.082 0.082 0.152l0.058 0.097c-0.013 0.023 -0.023 0.047 -0.03 0.073L0 0.35v0.1l0.11 0.028q0.01 0.039 0.03 0.073L0.082 0.647l0.071 0.071 0.097 -0.058c0.023 0.013 0.047 0.023 0.073 0.03L0.35 0.8h0.1l0.028 -0.11a0.3 0.3 0 0 0 0.073 -0.03l0.097 0.058 0.071 -0.071 -0.058 -0.097c0.013 -0.023 0.023 -0.047 0.03 -0.073L0.8 0.45V0.35l-0.11 -0.028a0.3 0.3 0 0 0 -0.03 -0.073l0.058 -0.097 -0.071 -0.071 -0.097 0.058a0.3 0.3 0 0 0 -0.073 -0.03zM0.4 0.5a0.1 0.1 0 1 0 0 -0.2 0.1 0.1 0 0 0 0 0.2"
            fill={color}
            fillRule="evenodd"
        />
    </Svg>
};
export default SetupSvg;
