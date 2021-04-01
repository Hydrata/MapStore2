const axios = require('../../libs/ajax');

const FETCH_NETWORKS_LIST = 'FETCH_NETWORKS_LIST';
const FETCH_NETWORKS_LIST_ERROR = 'FETCH_NETWORKS_LIST_ERROR';
const FETCH_NETWORKS_LIST_SUCCESS = 'FETCH_NETWORKS_LIST_SUCCESS';
const HIDE_NETWORKS_LIST = 'HIDE_NETWORKS_LIST';
const SHOW_NETWORKS_LIST = 'SHOW_NETWORKS_LIST';
const UPDATE_NETWORK = 'UPDATE_NETWORK';
const CREATE_NETWORK = 'CREATE_NETWORK';
const SELECT_NETWORK = 'SELECT_NETWORK';
const SAVE_NETWORK = 'SAVE_NETWORK';
const SAVE_NETWORK_SUCCESS = 'SAVE_NETWORK_SUCCESS';
const SAVE_NETWORK_ERROR = 'SAVE_NETWORK_ERROR';
const DELETE_NETWORK = 'DELETE_NETWORK';
const DELETE_NETWORK_SUCCESS = 'DELETE_NETWORK_SUCCESS';
const DELETE_NETWORK_ERROR = 'DELETE_NETWORK_ERROR';

const fetchNetworksListSuccess = (data) => {
    return {
        type: FETCH_NETWORKS_LIST_SUCCESS,
        data
    };
};

function fetchNetworksListError(e) {
    console.log('*** error:', e);
    return {
        type: FETCH_NETWORKS_LIST_ERROR,
        error: e
    };
}

const fetchNetworksList = (mapId) => {
    console.log('fetchNetworksList');
    return (dispatch) => {
        return axios.get(`/scenarios/api/${mapId}/networks/`
        ).then(
            response => {
                dispatch(fetchNetworksListSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchNetworksListError(e));
            }
        );
    };
};

const saveNetworkSuccess = (data) => {
    return {
        type: SAVE_NETWORK_SUCCESS,
        network: data
    };
};

function saveNetworkError(e) {
    console.log('*** error:', e);
    return {
        type: SAVE_NETWORK_ERROR,
        error: e
    };
}

const saveNetwork = (mapId, network) => {
    if (network.id) {
        return (dispatch) => {
            return axios.put(`/scenarios/api/${mapId}/networks/${network.id}/`, network
            ).then(
                response => {
                    dispatch(saveNetworkSuccess(response.data));
                }
            ).catch(
                e => {
                    dispatch(saveNetworkError(e));
                }
            );
        };
    }
    return (dispatch) => {
        return axios.post(`/scenarios/api/${mapId}/networks/`, network
        ).then(
            response => {
                dispatch(saveNetworkSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(saveNetworkError(e));
            }
        );
    };
};

const deleteNetworkSuccess = (network) => {
    return {
        type: DELETE_NETWORK_SUCCESS,
        network: network
    };
};

function deleteNetworkError(e) {
    console.log('*** error:', e);
    return {
        type: DELETE_NETWORK_ERROR,
        error: e
    };
}

const deleteNetwork = (mapId, network) => {
    return (dispatch) => {
        return axios.delete(`/scenarios/api/${mapId}/networks/${network.id}/`, network
        ).then(
            response => {
                dispatch(deleteNetworkSuccess(network));
            }
        ).catch(
            e => {
                dispatch(deleteNetworkError(e));
            }
        );
    };
};

const createNetwork = (projectId) => {
    return {
        type: CREATE_NETWORK,
        projectId: projectId
    };
};

const showNetworksList = () => {
    return {
        type: SHOW_NETWORKS_LIST
    };
};

const hideNetworksList = () => {
    return {
        type: HIDE_NETWORKS_LIST
    };
};

const selectNetwork = (network) => {
    return {
        type: SELECT_NETWORK,
        network
    };
};

const updateNetwork = (network, kv) => {
    return {
        type: UPDATE_NETWORK,
        network: {
            ...network,
            ...kv
        }
    };
};

module.exports = {
    FETCH_NETWORKS_LIST, fetchNetworksList,
    FETCH_NETWORKS_LIST_ERROR, fetchNetworksListError,
    FETCH_NETWORKS_LIST_SUCCESS, fetchNetworksListSuccess,
    SHOW_NETWORKS_LIST, showNetworksList,
    HIDE_NETWORKS_LIST, hideNetworksList,
    UPDATE_NETWORK, updateNetwork,
    CREATE_NETWORK, createNetwork,
    SELECT_NETWORK, selectNetwork,
    SAVE_NETWORK, saveNetwork,
    SAVE_NETWORK_SUCCESS, saveNetworkSuccess,
    SAVE_NETWORK_ERROR, saveNetworkError,
    DELETE_NETWORK_SUCCESS, deleteNetworkSuccess,
    DELETE_NETWORK_ERROR, deleteNetworkError,
    DELETE_NETWORK, deleteNetwork
};
