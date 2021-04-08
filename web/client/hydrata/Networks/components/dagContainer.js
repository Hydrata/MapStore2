import React from "react";
import ForceGraph3D from "react-force-graph-3d";
import {CSS2DRenderer, CSS2DObject} from "three-css2drender";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import '../networks.css';
import {selectNodeId, selectLinkId} from "../actionsNetworks";
// import randomDagData from '../../Scenarios/components/randomDagData.json';
// import lesMiserables from '../../Scenarios/components/lesMiserables.json';
// import simpleDag from '../../Scenarios/components/simpleDag.json';

class DagContainerClass extends React.Component {
    static propTypes = {
        selectedNetworkId: PropTypes.number,
        selectLinkId: PropTypes.func,
        selectNodeId: PropTypes.func,
        data: PropTypes.object
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.graphContainer = React.createRef();
        this.graph = React.createRef();
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        // console.log('this.graph', this.graph);
        this.graph.current.refresh();
    }

    onClick = () => {
        console.log('clicked graph');
    };

    onNodeHover(e) {
        e.target.style.cursor = 'wait';
    }

    render() {
        let extraRenderers = [new CSS2DRenderer()];
        return (
            <div style={{'border': '1px white solid', 'width': '100%'}} ref={this.graphContainer}>
                <ForceGraph3D
                    ref={this.graph}
                    key={this.props?.selectedNetworkId + this.props?.data?.nodes.length + this.props?.data?.nodes.length}
                    extraRenderers={extraRenderers}
                    graphData={this.props?.data}
                    width={this.graphContainer?.current?.offsetWidth}
                    height={600}
                    backgroundColor={'#00000080'}
                    nodeVal={'value'}
                    nodeLabel={'description'}
                    nodeOpacity={0.90}
                    nodeResolution={16}
                    nodeAutoColorBy={'group'}
                    onNodeDragEnd={node => {
                        node.fx = node.x;
                        node.fy = node.y;
                        node.fz = node.z;
                    }}
                    nodeThreeObject={node => {
                        const nodeEl = document.createElement('div');
                        nodeEl.textContent = node.name;
                        nodeEl.style.color = 'white';
                        nodeEl.style.marginTop = '18px';
                        nodeEl.className = 'node-label';
                        return new CSS2DObject(nodeEl);
                    }}
                    onNodeClick={node => {
                        this.props.selectNodeId(node.id);
                    }}
                    // onNodeHover={(this.onNodeHover)}
                    nodeThreeObjectExtend
                    onLinkClick={link => {
                        this.props.selectLinkId(link.id);
                    }}
                    linkColor={'red'}
                    linkOpacity={0.90}
                    linkWidth={1}
                    // linkCurvature={[0.05]}
                    linkAutoColorBy={'group'}
                    linkDirectionalArrowLength={6}
                    linkDirectionalParticles={0.5}
                    linkDirectionalParticleWidth={3}
                />
            </div>
        );
    }


    handleChange = (e) => {
        console.log('handleChange', e);
    }
}

const mapStateToProps = (state) => {
    // let counter = 0;
    // counter++;
    // switch (counter % 3) {
    // case 0:
    //     data = simpleDag;
    //     break;
    // case 1:
    //     data = lesMiserables;
    //     break;
    // case 2:
    //     data = randomDagData;
    //     break;
    // default:
    //     data = {};
    // }
    let data = {
        nodes: [],
        links: []
    };
    if (state?.networks?.selectedNetworkId) {
        data = state?.networks?.data?.filter((network) => {
            return network.id === state?.networks?.selectedNetworkId;
        })[0].json;
    }
    console.log('data:', data);
    return {
        data: data,
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedNetworkId: state?.networks?.selectedNetworkId
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        selectNodeId: (nodeId) => dispatch(selectNodeId(nodeId)),
        selectLinkId: (linkId) => dispatch(selectLinkId(linkId))
    };
};

const DagContainer = connect(mapStateToProps, mapDispatchToProps)(DagContainerClass);

export {
    DagContainer
};
