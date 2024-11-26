import * as React from "react";
import Svg, { Path, Line } from "react-native-svg";
const FlagSvg = (props) => {
    const { color = "#030708" } = props; // default color is set to #030708

    return <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <Path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <Line x1={4} y1={22} x2={4} y2={15} />
    </Svg>
};
export default FlagSvg;
