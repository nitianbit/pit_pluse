import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ResetSvg = (props) => {
    const { color = "#030708" } = props; // default color is set to #030708

    return <Svg
        fill={color}
        width="24px"
        height="24px"
        viewBox="0 0 57.6 57.6"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M28.8 0v6.4c12.349 0 22.4 10.048 22.4 22.4S41.149 51.2 28.8 51.2 6.4 41.152 6.4 28.8c0 -5.91 2.352 -11.475 6.4 -15.622v7.622H19.2V3.2H1.6V9.6h5.731C2.659 14.822 0 21.629 0 28.8c0 15.878 12.918 28.8 28.8 28.8s28.8 -12.922 28.8 -28.8S44.682 0 28.8 0"
            fillRule="evenodd"
        />
    </Svg>
};
export default ResetSvg;
