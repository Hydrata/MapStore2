import React from "react";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import '../networks.css';
import {selectNodeId, selectLinkId, updateNode, updateLink, saveNode, saveLink, showCreateNodeForm} from "../actionsNetworks";
import {Button} from "react-bootstrap";

class EditNodeFormClass extends React.Component {
    static propTypes = {
        mapId: PropTypes.number,
        projectId: PropTypes.number,
        selectedNetworkId: PropTypes.number,
        selectedNode: PropTypes.object,
        selectedLink: PropTypes.object,
        selectNodeId: PropTypes.func,
        selectLinkId: PropTypes.func,
        updateNode: PropTypes.func,
        updateLink: PropTypes.func,
        showCreateNodeForm: PropTypes.func,
        saveNode: PropTypes.func,
        saveLink: PropTypes.func
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.handleNodeChange = this.handleNodeChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
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
            <div id={'edit-node-form'} className={'edit-node-form'}>
                <h6>Node: {this.props.selectedNode?.id}</h6>
                <span
                    className={"btn glyphicon glyphicon-remove close-network-form"}
                    style={{
                    }}
                    onClick={() => this.props.selectNodeId(null)}
                />
                <div className={'network-form-table'}>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Name:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <input
                                id={'name'}
                                key={'name-' + this.props.selectedNode?.id}
                                name={'name'}
                                className={'network-form-control'}
                                type={'text'}
                                value={this.props.selectedNode?.name}
                                onChange={(e) => this.handleNodeChange(e, this.props.selectedNode)}
                            />
                        </div>
                    </div>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Description:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <input
                                id={'description'}
                                key={'description'}
                                className={'network-form-control'}
                                type={'text'}
                                value={this.props.selectedNode?.description}
                                onChange={(e) => this.handleNodeChange(e, this.props.selectedNode)}
                            />
                        </div>
                    </div>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Data:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <input
                                id={'data'}
                                key={'data'}
                                className={'network-form-control'}
                                type={'text'}
                                value={this.props.selectedNode?.data}
                                onChange={(e) => this.handleNodeChange(e, this.props.selectedNode)}
                            />
                        </div>
                    </div>
                </div>
                <div className={'network-form-table-row'}>
                    <Button
                        bsStyle="success"
                        bsSize="xsmall"
                        onClick={() => this.props.saveNode(this.props?.mapId, this.props.selectedNode)}
                        className={'networks-button ' + (this.props.selectedNode?.unsaved ? null : 'disabled')}
                    >
                        Save
                    </Button>
                    <Button
                        bsStyle="success"
                        bsSize="xsmall"
                        onClick={() => this.props.showCreateNodeForm(true)}
                        className={'networks-button'}
                    >
                        Add Node
                    </Button>
                </div>
            </div>
        );
    }


    handleNodeChange = (e) => {
        const kv = {};
        kv[e.target.id] = e.target.value;
        this.props.updateNode(kv);
    }

    handleLinkChange = (e) => {
        const kv = {};
        kv[e.target.id] = e.target.value;
        this.props.updateLink(kv);
    }
}

const mapStateToProps = (state) => {
    console.log('state:', state);
    console.log('selectedNode:', state?.networks?.data?.filter(
            (network) => network.id === state?.networks?.selectedNetworkId
        )[0].json.nodes?.filter(
            (node) => node.id === state?.networks?.selectedNodeId
        )[0]);
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedNetworkId: state?.networks?.selectedNetworkId,
        selectedNode: state?.networks?.data?.filter(
            (network) => network.id === state?.networks?.selectedNetworkId
        )[0].json.nodes?.filter(
            (node) => node.id === state?.networks?.selectedNodeId
        )[0],
        selectedLink: state?.networks?.selectedLink
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        saveNode: (mapId, node) => dispatch(saveNode(mapId, node)),
        saveLink: (mapId, link) => dispatch(saveLink(mapId, link)),
        updateNode: (kv) => dispatch(updateNode(kv)),
        showCreateNodeForm: (node) => dispatch(showCreateNodeForm(node)),
        updateLink: (link) => dispatch(updateLink(link)),
        selectNodeId: (nodeId) => dispatch(selectNodeId(nodeId)),
        selectLinkId: (linkId) => dispatch(selectLinkId(linkId))
    };
};

const EditNodeForm = connect(mapStateToProps, mapDispatchToProps)(EditNodeFormClass);

export {
    EditNodeForm
};
