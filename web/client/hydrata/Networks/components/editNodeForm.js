import React from "react";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import '../networks.css';
import {selectNode, selectLink, updateNode, updateLink, saveNode, saveLink, createNode} from "../actionsNetworks";
import {Button} from "react-bootstrap";

class EditNodeFormClass extends React.Component {
    static propTypes = {
        mapId: PropTypes.number,
        projectId: PropTypes.number,
        selectedNetwork: PropTypes.object,
        selectedNode: PropTypes.object,
        selectedLink: PropTypes.object,
        selectNode: PropTypes.func,
        selectLink: PropTypes.func,
        updateNode: PropTypes.func,
        updateLink: PropTypes.func,
        createNode: PropTypes.func,
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
                    onClick={() => this.props.selectNode(null)}
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
                            Title:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <input
                                id={'title'}
                                key={'title'}
                                className={'network-form-control'}
                                type={'text'}
                                value={this.props.selectedNode?.title}
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
                        onClick={() => this.props.createNode(this.props.selectedNode)}
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
        this.props.updateLink(link, kv);
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedNetwork: state?.networks?.selectedNetwork,
        selectedNode: state?.networks?.selectedNode,
        selectedLink: state?.networks?.selectedLink
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        saveNode: (mapId, node) => dispatch(saveNode(mapId, node)),
        saveLink: (mapId, link) => dispatch(saveLink(mapId, link)),
        updateNode: (kv) => dispatch(updateNode(kv)),
        createNode: (node) => dispatch(createNode(node)),
        updateLink: (link) => dispatch(updateLink(link)),
        selectNode: (node) => dispatch(selectNode(node)),
        selectLink: (link) => dispatch(selectLink(link))
    };
};

const EditNodeForm = connect(mapStateToProps, mapDispatchToProps)(EditNodeFormClass);

export {
    EditNodeForm
};