import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import { Button } from 'react-bootstrap';
import {DagContainer} from './d3Container';
import {
    fetchNetworksList,
    showNetworksList,
    hideNetworksList,
    updateNetwork,
    saveNetwork,
    deleteNetwork,
    selectNetwork,
    createNetwork
} from '../actionsNetworks';
import '../networks.css';
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";

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
        networksList: PropTypes.array,
        fetchNetworksList: PropTypes.func,
        showNetworksList: PropTypes.func,
        hideNetworksList: PropTypes.func,
        selectNetwork: PropTypes.func,
        createNetwork: PropTypes.func,
        updateNetwork: PropTypes.func
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
        return (
            (this.props.openMenuGroup?.id_label === 'app_networks') ?
                <div id={'networks-list'} className={'container networks-list-panel'}>
                    <div className={"row"}>
                        <h5
                            style={{textAlign: 'left', marginLeft: '10px'}}
                        >
                            Networks
                        </h5>
                    </div>
                    <div style={{'textAlign': 'center'}}>
                        <DagContainer/>
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
                                <div className={'networks-table-cell'} key={'networks-selector'}>
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
                                <div className={'networks-table-row'}>
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
                                            key={'name'}
                                            style={formControlStyle}
                                            type={'text'}
                                            value={this.props.networksList.filter((networkToCheck) => network === networkToCheck)[0].name}
                                            onChange={(e) => this.handleChange(e, network)}
                                        />
                                    </div>
                                    <div className={'networks-table-cell'}>
                                        <Button
                                            bsStyle="success"
                                            bsSize="xsmall"
                                            onClick={() => this.props.saveNetwork(this.props.mapId, network)}
                                            style={{'borderRadius': '3px'}}
                                            className={network.unsaved ? null : 'disabled'}
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
                                            className={network.unsaved ? 'disabled' : null}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                    <div className={'networks-table-cell'}>
                                        <Button
                                            bsStyle="danger"
                                            bsSize="xsmall"
                                            onClick={() => this.props.deleteNetwork(this.props.mapId, network)}
                                            style={{'borderRadius': '3px'}}
                                            className={network.unsaved ? 'disabled' : null}
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
                </div> :
                <div id={'networks-list'} />
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
        openMenuGroup: state?.projectManager?.openMenuGroup
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
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworksContainerClass);

