import React from "react";
import ForceGraph3D from "react-force-graph-3d";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import lesMisarblesData from "./lesMiserables.json";

class D3ContainerClass extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        selectedScenario: PropTypes.object
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            'containerWidth': 1100,
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
                    nodeAutoColorBy={'group'}
                    linkColor={'red'}
                    linkOpacity={0.90}
                    linkDirectionalArrowLength={4}
                    linkDirectionalParticles={0.2}
                    linkDirectionalParticleWidth={2}
                />
            </div>
        );
    }

    handleChange = (e) => {
        console.log('handleChange', e);
    }
}

const mapStateToProps = (state) => {
    let data = {"nodes": [], "links": []};
    const latestResult = state?.scenarios?.selectedScenario?.latest_result || {};
    let nodesList = latestResult[Object.keys(latestResult)?.[0]] || ["asx_200", "vegetation_structure", "radiation"];
    console.log('latestResult:', latestResult);
    console.log('nodesList:', nodesList);
    // case for SKAI API:
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
    // case for well-formed nodes & links:
    // debugger;
    if (Array.isArray(latestResult?.nodes) && Array.isArray(latestResult?.links)) {
        data = latestResult;
        if (!data.nodes[0]?.id) {
            console.log('Array.isArray data:', data);
            data.nodes.map((node, index) => {
                data.links.map((link) => {
                    if (link.source === node.name) {
                        link.source = index;
                    }
                    if (link.target === node.name) {
                        link.target = index;
                    }
                });
                node.id = index;
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
