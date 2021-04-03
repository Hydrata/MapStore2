import React from "react";
import ForceGraph3D from "react-force-graph-3d";
import {CSS2DRenderer, CSS2DObject} from "three-css2drender";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import '../networks.css';
import {selectNode, selectLink} from "../actionsNetworks";

class DagContainerClass extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        selectedNetwork: PropTypes.object,
        networks: PropTypes.array,
        selectLink: PropTypes.func,
        selectNode: PropTypes.func
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.graphContainer = React.createRef();
    }

    componentDidMount() {
    }

    componentDidUpdate() {
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
                    key={this.props?.selectedNetwork?.id}
                    extraRenderers={extraRenderers}
                    graphData={this.props?.selectedNetwork?.json}
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
                        console.log('node:', node);
                        this.props.selectNode(node);
                    }}
                    // onNodeHover={(this.onNodeHover)}
                    nodeThreeObjectExtend
                    onLinkClick={link => {
                        console.log('link:', link);
                        this.props.selectLink(link);
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
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedNetwork: state?.networks?.selectedNetwork,
        networks: state?.networks?.data
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        selectNode: (node) => dispatch(selectNode(node)),
        selectLink: (link) => dispatch(selectLink(link))
    };
};

const DagContainer = connect(mapStateToProps, mapDispatchToProps)(DagContainerClass);

export {
    DagContainer
};
