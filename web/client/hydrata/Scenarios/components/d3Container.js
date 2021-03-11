import React from "react";
import * as d3 from "d3";

import Scatterplot from "./Scatterplot";

export class D3Container extends React.Component {
    state = {
        width: 800,
        height: 600,
        data: d3.range(50).map(_ => [Math.random(), Math.random()])
    };

    onClick = () => {
        const { width, height } = this.state;
        this.setState({
            width: width * 1.0,
            height: height * 1.0,
            data: d3.range(50).map(_ => [Math.random(), Math.random()])
        });
    };

    render() {
        const { width, height, data } = this.state;
        return (
            <div>
                <svg width="800" height="600" onClick={this.onClick}>
                    <Scatterplot
                        x={50}
                        y={50}
                        width={width}
                        height={height}
                        data={data}
                    />
                </svg>
            </div>
        );
    }
}
