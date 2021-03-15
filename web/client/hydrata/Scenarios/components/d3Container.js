import React from "react";
import ForceGraph3D from "react-force-graph-3d";
const PropTypes = require('prop-types');
import {connect} from "react-redux";

class D3ContainerClass extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        selectedScenario: PropTypes.object
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            'containerWidth': 1000,
            'containerHeight': 600
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
                <ForceGraph3D
                    graphData={this.props.data}
                    width={this.state.containerWidth}
                    height={this.state.containerHeight}
                    backgroundColor={'#003c8800'}
                    nodeLabel={'name'}
                    nodeColor={'yellow'}
                    nodeOpacity={0.90}
                    nodeResolution={16}
                    linkColor={'red'}
                    linkOpacity={0.90}
                    linkDirectionalArrowLength={4}
                    linkDirectionalParticles={0.5}
                    linkDirectionalParticleWidth={1}
                />
            </div>
        );
    }

    handleChange = (e) => {
        console.log('handleChange', e);
    }
}

const mapStateToProps = (state) => {
    const latestResult = state?.scenarios?.selectedScenario?.latest_result || {};
    let nodesList = latestResult[Object.keys(latestResult)?.[0]] || ["asx_200", "vegetation_structure", "radiation"];
    let data = {"nodes": [], "links": []};
    if (typeof(nodesList?.[0]) === 'string') {
        data.nodes = nodesList?.map((d, index) => {
            return {
                "id": index,
                "name": d
            };
        });
        for (let i = 0; i < nodesList.length - 1; i++) {
            data.links.push({
                "id": i,
                "source": i,
                "target": i + 1
            });
        }
    }
    console.log('data:', data);
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedScenario: state?.scenarios?.selectedScenario,
        data: data
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
