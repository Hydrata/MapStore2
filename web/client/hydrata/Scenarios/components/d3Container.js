import React from "react";
import * as d3 from "d3";
const PropTypes = require('prop-types');
import {connect} from "react-redux";

// import Scatterplot from "./Scatterplot";
import Dag from "./Dag";

class D3ContainerClass extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        selectedScenario: PropTypes.object
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            data: d3.range(50).map(_ => [Math.random(), Math.random()])
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    onClick = () => {
        console.log('clicked graph');
    };

    render() {
        return (
            <div style={{'border': '1px white solid'}}>
                <svg width={1100} height={700} onClick={this.onClick}>
                    <Dag
                        x={50}
                        y={50}
                        width={1000}
                        height={600}
                        data={this.props.data}
                    />
                </svg>
            </div>
        );
    }

    handleChange = (e) => {
        console.log('handleChange', e);
    }
}

const mapStateToProps = (state) => {
    const latestResult = state?.scenarios?.selectedScenario?.latest_result || {};
    const data = latestResult[Object.keys(latestResult)?.[0]];
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedScenario: state?.scenarios?.selectedScenario,
        data: data || []
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
    };
};

const D3Container = connect(mapStateToProps, mapDispatchToProps)(D3ContainerClass);

export {
    D3Container
};
