import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const ScheduleSvg = (props) => {
    const { color = "#030708" } = props; // default color is set to #030708

    return <Svg
        fill={color}
        width="24px"
        height="24px"
        viewBox="0 0 0.96 0.96"
        data-name="Layer 13"
        id="Layer_13"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path d="M0.857 0.197h-0.064V0.148a0.015 0.015 0 1 0 -0.03 0v0.049h-0.168V0.152a0.015 0.015 0 0 0 -0.03 0v0.045h-0.169V0.152a0.015 0.015 0 0 0 -0.03 0v0.045H0.197V0.152a0.015 0.015 0 1 0 -0.03 0v0.045H0.103A0.06 0.06 0 0 0 0.045 0.256v0.513a0.06 0.06 0 0 0 0.058 0.06h0.753a0.06 0.06 0 0 0 0.058 -0.06V0.256a0.06 0.06 0 0 0 -0.058 -0.058m-0.753 0.03h0.064v0.045a0.015 0.015 0 0 0 0.03 0V0.227h0.168v0.045a0.015 0.015 0 0 0 0.03 0V0.227h0.168v0.045a0.015 0.015 0 0 0 0.03 0V0.227h0.168v0.041a0.015 0.015 0 1 0 0.03 0V0.227h0.064a0.03 0.03 0 0 1 0.028 0.028v0.088H0.075V0.256a0.03 0.03 0 0 1 0.028 -0.028m0.753 0.57H0.103a0.03 0.03 0 0 1 -0.028 -0.03V0.374h0.81v0.395a0.03 0.03 0 0 1 -0.028 0.028" />
        <Path
            height={2.13}
            width={2.13}
            x={9.99}
            y={14.39}
            d="M0.3 0.432H0.364V0.496H0.3V0.432z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={14.98}
            y={14.39}
            d="M0.449 0.432H0.513V0.496H0.449V0.432z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={19.98}
            y={14.37}
            d="M0.599 0.431H0.663V0.495H0.599V0.431z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={5}
            y={18.45}
            d="M0.15 0.553H0.214V0.617H0.15V0.553z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={9.99}
            y={18.45}
            d="M0.3 0.553H0.364V0.617H0.3V0.553z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={14.98}
            y={18.45}
            d="M0.449 0.553H0.513V0.617H0.449V0.553z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={5}
            y={22.56}
            d="M0.15 0.677H0.214V0.741H0.15V0.677z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={9.99}
            y={22.56}
            d="M0.3 0.677H0.364V0.741H0.3V0.677z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={14.98}
            y={22.55}
            d="M0.449 0.676H0.513V0.74H0.449V0.676z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={19.98}
            y={22.55}
            d="M0.599 0.676H0.663V0.74H0.599V0.676z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={19.98}
            y={18.44}
            d="M0.599 0.553H0.663V0.617H0.599V0.553z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={24.87}
            y={14.36}
            d="M0.746 0.431H0.81V0.495H0.746V0.431z"
        />
        <Path
            height={2.13}
            width={2.13}
            x={24.87}
            y={18.42}
            d="M0.746 0.553H0.81V0.617H0.746V0.553z"
        />
    </Svg>
};
export default ScheduleSvg;
