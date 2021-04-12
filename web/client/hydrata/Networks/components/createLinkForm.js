import React from "react";
const PropTypes = require('prop-types');
import {connect} from "react-redux";
import '../networks.css';
import {updateCreatingLink, saveNode, saveLink, showCreateLinkForm} from "../actionsNetworks";
import {Button} from "react-bootstrap";

class CreateLinkFormClass extends React.Component {
    static propTypes = {
        mapId: PropTypes.number,
        projectId: PropTypes.number,
        selectedNetworkId: PropTypes.number,
        selectedNodeId: PropTypes.number,
        creatingLink: PropTypes.object,
        selectedLinkId: PropTypes.object,
        updateCreatingLink: PropTypes.func,
        showCreateLinkForm: PropTypes.func,
        saveLink: PropTypes.func,
        nodesList: PropTypes.array
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
            <div id={'create-link-form'} className={'create-link-form'}>
                <h6>New Link</h6>
                <span
                    className={"btn glyphicon glyphicon-remove close-network-form"}
                    style={{
                    }}
                    onClick={() => this.props.showCreateLinkForm(null)}
                />
                <div className={'network-form-table'}>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Name:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <input
                                id={'name'}
                                key={'name-' + this.props.creatingLink?.id}
                                name={'name'}
                                className={'network-form-control'}
                                type={'text'}
                                value={this.props.creatingLink?.name}
                                onChange={(e) => this.handleLinkChange(e, this.props.creatingLink)}
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
                                value={this.props.creatingLink?.description}
                                onChange={(e) => this.handleLinkChange(e, this.props.creatingLink)}
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
                                value={this.props.creatingLink?.data}
                                onChange={(e) => this.handleLinkChange(e, this.props.creatingLink)}
                            />
                        </div>
                    </div>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Source:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <select
                                id={'source'}
                                key={'link-selector-source'}
                                className={'network-form-control'}
                                value={this.props.creatingLink?.source}
                                onChange={(e) => this.handleLinkChange(e)}
                            >
                                <option value={''}/>
                                {this.props?.nodesList?.map((node) => {
                                    return (
                                        <option value={node.id}>{node.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={'network-form-table-row'}>
                        <div className={'network-form-table-cell'}>
                            Target:
                        </div>
                        <div className={'network-form-table-cell'}>
                            <select
                                id={'target'}
                                key={'link-selector-target'}
                                className={'network-form-control'}
                                value={this.props.creatingLink?.target}
                                onChange={(e) => this.handleLinkChange(e)}
                            >
                                <option value={''}/>
                                {this.props?.nodesList?.map((node) => {
                                    return (
                                        <option value={node.id}>{node.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={'network-form-table-row'}>
                    <Button
                        bsStyle="success"
                        bsSize="xsmall"
                        onClick={() => this.props.saveLink(this.props?.mapId, this.props.creatingLink)}
                        className={'networks-button ' + (this.props.creatingLink?.unsaved ? null : 'disabled')}
                    >
                        Create
                    </Button>
                </div>
            </div>
        );
    }

    handleLinkChange = (e) => {
        const kv = {};
        kv[e.target.id] = e.target.value;
        this.props.updateCreatingLink(kv);
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        selectedNetworkId: state?.networks?.selectedNetworkId,
        selectedNode: state?.networks?.data?.filter(
            (network) => network.id === state?.networks?.selectedNetworkId
        )[0]?.json?.nodes?.filter(
            (node) => node.id === state?.networks?.selectedNodeId
        )[0],
        selectedLinkId: state?.networks?.selectedLinkId,
        selectedLink: state?.networks?.data?.filter(
            (network) => network.id === state?.networks?.selectedNetworkId
        )[0]?.json?.link?.filter(
            (link) => link.id === state?.networks?.selectedLinkId
        )[0],
        creatingLink: state?.networks?.creatingLink,
        nodesList: state?.networks?.data?.filter(
            (network) => network.id === state?.networks?.selectedNetworkId
        )[0]?.json?.nodes
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        saveNode: (mapId, node) => dispatch(saveNode(mapId, node)),
        saveLink: (mapId, link) => dispatch(saveLink(mapId, link)),
        updateCreatingLink: (kv) => dispatch(updateCreatingLink(kv)),
        showCreateLinkForm: (link) => dispatch(showCreateLinkForm(link))
    };
};

const CreateLinkForm = connect(mapStateToProps, mapDispatchToProps)(CreateLinkFormClass);

export {
    CreateLinkForm
};
