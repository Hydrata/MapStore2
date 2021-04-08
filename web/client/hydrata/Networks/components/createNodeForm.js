import React from "react";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import '../networks.css';
import {updateCreatingNode, updateLink, saveNode, saveLink, showCreateNodeForm} from "../actionsNetworks";
import {Button} from "react-bootstrap";

class CreateNodeFormClass extends React.Component {
    static propTypes = {
        mapId: PropTypes.number,
        projectId: PropTypes.number,
        selectedNetworkId: PropTypes.number,
        selectedNodeId: PropTypes.number,
        creatingNode: PropTypes.object,
        selectedLinkId: PropTypes.object,
        updateCreatingNode: PropTypes.func,
        updateLink: PropTypes.func,
        showCreateNodeForm: PropTypes.func,
        hideCreateNodeForm: PropTypes.func,
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
            <div id={'create-node-form'} className={'create-node-form'}>
                <h6>New Node</h6>
                <span
                    className={"btn glyphicon glyphicon-remove close-network-form"}
                    style={{
                    }}
                    onClick={() => this.props.hideCreateNodeForm()}
                />
                <div className={'network-form-table'}>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Name:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <input
                                id={'name'}
                                key={'name-' + this.props.creatingNode?.id}
                                name={'name'}
                                className={'network-form-control'}
                                type={'text'}
                                value={this.props.creatingNode?.name}
                                onChange={(e) => this.handleNodeChange(e, this.props.creatingNode)}
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
                                value={this.props.creatingNode?.description}
                                onChange={(e) => this.handleNodeChange(e, this.props.creatingNode)}
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
                                value={this.props.creatingNode?.data}
                                onChange={(e) => this.handleNodeChange(e, this.props.creatingNode)}
                            />
                        </div>
                    </div>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Include Link:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <select
                                id={'includeLink'}
                                key={'link-selector'}
                                className={'network-form-control'}
                                value={this.props.creatingNode?.includeLink}
                                onChange={(e) => this.handleNodeChange(e)}
                            >
                                <option value={null}>None</option>
                                <option value={'to'}>From {this.props?.selectedNode?.name} to this node</option>
                                <option value={'from'}>From this node to {this.props?.selectedNode?.name}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={'network-form-table-row'}>
                    <Button
                        bsStyle="success"
                        bsSize="xsmall"
                        onClick={() => this.props.saveNode(this.props?.mapId, this.props.creatingNode)}
                        className={'networks-button ' + (this.props.creatingNode?.unsaved ? null : 'disabled')}
                    >
                        Create
                    </Button>
                </div>
            </div>
        );
    }


    handleNodeChange = (e) => {
        const kv = {};
        kv[e.target.id] = e.target.value;
        this.props.updateCreatingNode(kv);
    }

    handleLinkChange = (e) => {
        const kv = {};
        kv[e.target.id] = e.target.value;
        this.props.updateLink(kv);
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedNetworkId: state?.networks?.selectedNetworkId,
        selectedNode: state?.networks?.data?.filter(
            (network) => network.id === state?.networks?.selectedNetworkId
        )[0].json.nodes?.filter(
            (node) => node.id === state?.networks?.selectedNodeId
        )[0],
        selectedLinkId: state?.networks?.selectedLinkId,
        creatingNode: state?.networks?.creatingNode
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        saveNode: (mapId, node) => dispatch(saveNode(mapId, node)),
        saveLink: (mapId, link) => dispatch(saveLink(mapId, link)),
        updateCreatingNode: (kv) => dispatch(updateCreatingNode(kv)),
        showCreateNodeForm: (node) => dispatch(showCreateNodeForm(node)),
        updateLink: (link) => dispatch(updateLink(link))
    };
};

const CreateNodeForm = connect(mapStateToProps, mapDispatchToProps)(CreateNodeFormClass);

export {
    CreateNodeForm
};
