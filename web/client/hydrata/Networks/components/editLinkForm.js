import React from "react";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import '../networks.css';
import {selectNodeId, selectLinkId, updateNode, updateLink, saveNode, saveLink, deleteLink, showEditLinkForm} from "../actionsNetworks";
import {Button} from "react-bootstrap";

class EditLinkFormClass extends React.Component {
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
        showEditLinkForm: PropTypes.func,
        saveNode: PropTypes.func,
        saveLink: PropTypes.func,
        deleteLink: PropTypes.func
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
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
            <div id={'edit-link-form'} className={'edit-link-form'}>
                <h6>Link: {this.props.selectedLink?.id}</h6>
                <span
                    className={"btn glyphicon glyphicon-remove close-network-form"}
                    style={{
                    }}
                    onClick={() => this.props.selectLinkId(null)}
                />
                <div className={'network-form-table'}>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Name:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <input
                                id={'name'}
                                key={'name-' + this.props.selectedLink?.id}
                                name={'name'}
                                className={'network-form-control'}
                                type={'text'}
                                value={this.props.selectedLink?.name}
                                onChange={(e) => this.handleLinkChange(e, this.props.selectedLink)}
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
                                value={this.props.selectedLink?.description}
                                onChange={(e) => this.handleLinkChange(e, this.props.selectedLink)}
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
                                value={this.props.selectedLink?.data}
                                onChange={(e) => this.handleLinkChange(e, this.props.selectedLink)}
                            />
                        </div>
                    </div>
                </div>
                <div className={'network-form-table-row'}>
                    <Button
                        bsStyle="success"
                        bsSize="xsmall"
                        onClick={() => this.props.saveLink(this.props?.mapId, this.props.selectedLink)}
                        className={'networks-button ' + (this.props.selectedLink?.unsaved ? null : 'disabled')}
                    >
                        Save
                    </Button>
                    <Button
                        bsStyle="danger"
                        bsSize="xsmall"
                        onClick={() => this.props.deleteLink(this.props.selectedLink)}
                        className={'networks-button'}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        );
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
        selectedLink: state?.networks?.data?.filter(
            (network) => network.id === state?.networks?.selectedNetworkId
        )[0].json.links?.filter(
            (link) => link.id === state?.networks?.selectedLinkId
        )[0]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        saveNode: (mapId, node) => dispatch(saveNode(mapId, node)),
        saveLink: (mapId, link) => dispatch(saveLink(mapId, link)),
        deleteLink: (mapId, link) => dispatch(deleteLink(mapId, link)),
        updateNode: (kv) => dispatch(updateNode(kv)),
        showCreateLinkForm: (node) => dispatch(showCreateLinkForm(node)),
        updateLink: (link) => dispatch(updateLink(link)),
        selectNodeId: (nodeId) => dispatch(selectNodeId(nodeId)),
        selectLinkId: (linkId) => dispatch(selectLinkId(linkId))
    };
};

const EditLinkForm = connect(mapStateToProps, mapDispatchToProps)(EditLinkFormClass);

export {
    EditLinkForm
};
