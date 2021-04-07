import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import { Button } from 'react-bootstrap';
import {DagContainer} from './dagContainer';
import {CreateNodeForm} from './createNodeForm';
import {
    fetchNetworksList,
    showNetworksList,
    hideNetworksList,
    updateNetwork,
    saveNetwork,
    deleteNetwork,
    selectNetwork,
    createNetwork,
    selectNode,
    selectLink
} from '../actionsNetworks';
import '../networks.css';
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";
import {EditNodeForm} from "./editNodeForm";

const formControlStyle = {
    border: 'none',
    textAlign: 'center',
    background: 'none',
    color: 'white'
};

class NetworksContainerClass extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        mapId: PropTypes.number,
        projectId: PropTypes.number,
        networksList: PropTypes.array,
        fetchNetworksList: PropTypes.func,
        showNetworksList: PropTypes.func,
        hideNetworksList: PropTypes.func,
        selectNetwork: PropTypes.func,
        createNetwork: PropTypes.func,
        deleteNetwork: PropTypes.func,
        updateNetwork: PropTypes.func,
        saveNetwork: PropTypes.func,
        openMenuGroupLabel: PropTypes.string,
        selectedNetwork: PropTypes.object,
        selectedNode: PropTypes.object,
        setMenuGroup: PropTypes.func,
        creatingNode: PropTypes.object
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.mapId && !this.isFetching) {
            this.isFetching = false;
        }
        if (this.props.mapId && !this.props.networksList && !this.isFetching) {
            this.props.fetchNetworksList(this.props.mapId);
            this.isFetching = true;
        }
        if (this.props.mapId && this.props.networksList) {
            this.isFetching = false;
        }
    }

    componentDidUpdate() {
    }

    render() {
        let panel;
        if (this.props.openMenuGroupLabel === 'app_networks') {
            panel = (
                <div id={'networks-list'} className={'container networks-list-panel'} key={'networks-list-key'}>
                    <div className={"row"}>
                        <h5
                            style={{textAlign: 'left', marginLeft: '10px'}}
                        >
                            Networks - {this.props?.selectedNetwork?.name}
                        </h5>
                    </div>
                    <div>
                        <DagContainer key={'networks-dag-container'} style={{'textAlign': 'center'}}/>
                        {this.props.selectedNode ? <EditNodeForm/> : null}
                        {this.props.creatingNode ? <CreateNodeForm/> : null}
                    </div>
                    <span
                        className={"btn glyphicon glyphicon-remove"}
                        style={{
                            position: "absolute",
                            right: "0px",
                            color: "red"
                        }}
                        onClick={() => this.props.setMenuGroup(null)}
                    />
                    <div className={'networks-table'}>
                        <div className={'networks-table-header-group'}>
                            <div className={'networks-table-row'}>
                                <div className={'networks-table-cell'}>
                                    Select
                                </div>
                                <div className={'networks-table-cell'}>ID</div>
                                <div className={'networks-table-cell'}>Name</div>
                                <div className={'networks-table-cell'}>Save</div>
                                <div className={'networks-table-cell'}>Copy</div>
                                <div className={'networks-table-cell'}>Delete</div>
                            </div>
                        </div>
                        {this.props.networksList?.map((network) => {
                            return (
                                <div className={'networks-table-row'} key={network.id}>
                                    <div className={'networks-table-cell'}>
                                        <input
                                            id={'networks-selector-box'}
                                            style={formControlStyle}
                                            type={'radio'}
                                            name={'networks-selector'}
                                            value={false}
                                            onChange={() => this.props.selectNetwork(network)}
                                        />
                                    </div>
                                    <div className={'networks-table-cell'}>
                                        <p>{network?.id}</p>
                                    </div>
                                    <div className={'networks-table-cell'}>
                                        <input
                                            id={'name'}
                                            key={'input-id-' + network?.id}
                                            style={formControlStyle}
                                            type={'text'}
                                            value={this.props.networksList.filter((networkToCheck) => network.id === networkToCheck.id)[0].name}
                                            onChange={(e) => this.handleChange(e, network)}
                                        />
                                    </div>
                                    <div className={'networks-table-cell'}>
                                        <Button
                                            bsStyle="success"
                                            bsSize="xsmall"
                                            onClick={() => this.props.saveNetwork(this.props.mapId, network)}
                                            style={{'borderRadius': '3px'}}
                                            className={network?.unsaved ? null : 'disabled'}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    <div className={'networks-table-cell'}>
                                        <Button
                                            bsStyle="success"
                                            bsSize="xsmall"
                                            onClick={() => alert("Copy network feature not yet implemented")}
                                            style={{'borderRadius': '3px'}}
                                            className={network?.unsaved ? 'disabled' : null}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                    <div className={'networks-table-cell'}>
                                        <Button
                                            bsStyle="danger"
                                            bsSize="xsmall"
                                            onClick={() => {if (window.confirm('Are you sure?')) { this.props.deleteNetwork(this.props.mapId, network);}}}
                                            style={{'borderRadius': '3px'}}
                                            className={network?.unsaved ? 'disabled' : null}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                        <div className={'networks-table-row'}>
                            <div className={'networks-button networks-table-cell'}>
                                <Button
                                    bsStyle="success"
                                    bsSize="xsmall"
                                    onClick={() => this.props.createNetwork(this.props.projectId)}
                                    style={{'borderRadius': '3px'}}
                                >
                                    New
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            panel = (<div id={'empty-network-list'}/>);
        }
        return (
            <div>
                {panel}
            </div>
        );
    }

    handleChange = (e, network) => {
        const kv = {};
        kv[e.target.id] = e.target.value;
        this.props.updateNetwork(network, kv);
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        projectId: state?.projectManager?.data?.id,
        networksList: state?.networks?.data,
        selectedNetwork: state?.networks?.selectedNetwork,
        openMenuGroupLabel: state?.projectManager?.openMenuGroup?.id_label,
        selectedNode: state?.networks?.selectedNode,
        selectedLink: state?.networks?.selectedLink,
        creatingNode: state?.networks?.creatingNode
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchNetworksList: (mapId) => dispatch(fetchNetworksList(mapId)),
        showNetworksList: () => dispatch(showNetworksList()),
        hideNetworksList: () => dispatch(hideNetworksList()),
        updateNetwork: (network, kv) => dispatch(updateNetwork(network, kv)),
        saveNetwork: (mapId, network) => dispatch(saveNetwork(mapId, network)),
        deleteNetwork: (mapId, network) => dispatch(deleteNetwork(mapId, network)),
        selectNetwork: (network) => dispatch(selectNetwork(network)),
        createNetwork: (projectId) => dispatch(createNetwork(projectId)),
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup)),
        selectNode: (node) => dispatch(selectNode(node)),
        selectLink: (link) => dispatch(selectLink(link))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworksContainerClass);

