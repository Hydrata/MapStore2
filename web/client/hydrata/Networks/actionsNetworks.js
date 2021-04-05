const axios = require('../../libs/ajax');

const FETCH_NETWORKS_LIST = 'NETWORKS:FETCH_NETWORKS_LIST';
const FETCH_NETWORKS_LIST_ERROR = 'NETWORKS:FETCH_NETWORKS_LIST_ERROR';
const FETCH_NETWORKS_LIST_SUCCESS = 'NETWORKS:FETCH_NETWORKS_LIST_SUCCESS';
const HIDE_NETWORKS_LIST = 'NETWORKS:HIDE_NETWORKS_LIST';
const SHOW_NETWORKS_LIST = 'NETWORKS:SHOW_NETWORKS_LIST';
const UPDATE_NETWORK = 'NETWORKS:UPDATE_NETWORK';
const CREATE_NETWORK = 'NETWORKS:CREATE_NETWORK';
const SELECT_NETWORK = 'NETWORKS:SELECT_NETWORK';
const SAVE_NETWORK = 'NETWORKS:SAVE_NETWORK';
const SAVE_NETWORK_SUCCESS = 'NETWORKS:SAVE_NETWORK_SUCCESS';
const SAVE_NETWORK_ERROR = 'NETWORKS:SAVE_NETWORK_ERROR';
const SAVE_NODE = 'NETWORKS:SAVE_NODE';
const SAVE_NODE_SUCCESS = 'NETWORKS:SAVE_NODE_SUCCESS';
const SAVE_NODE_ERROR = 'NETWORKS:SAVE_NODE_ERROR';
const DELETE_NETWORK = 'NETWORKS:DELETE_NETWORK';
const DELETE_NETWORK_SUCCESS = 'NETWORKS:DELETE_NETWORK_SUCCESS';
const DELETE_NETWORK_ERROR = 'NETWORKS:DELETE_NETWORK_ERROR';
const SELECT_NODE = 'NETWORKS:SELECT_NODE';
const SELECT_LINK = 'NETWORKS:SELECT_LINK';
const UPDATE_NODE = 'NETWORKS:UPDATE_NODE';
const UPDATE_LINK = 'NETWORKS:UPDATE_LINK';

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

const saveNodeSuccess = (data) => {
    return {
        type: SAVE_NODE_SUCCESS,
        node: data
    };
};

function saveNodeError(e) {
    console.log('*** error:', e);
    return {
        type: SAVE_NODE_ERROR,
        error: e
    };
}

const saveNode = (mapId, node) => {
    if (node.id) {
        return (dispatch) => {
            return axios.put(`/scenarios/api/${mapId}/nodes/${node.id}/`, node
            ).then(
                response => {
                    dispatch(saveNodeSuccess(response.data));
                }
            ).catch(
                e => {
                    dispatch(saveNodeError(e));
                }
            );
        };
    }
    return (dispatch) => {
        return axios.post(`/scenarios/api/${mapId}/nodes/`, node
        ).then(
            response => {
                dispatch(saveNodeSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(saveNodeError(e));
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

const selectNode = (node) => {
    return {
        type: SELECT_NODE,
        node
    };
};

const selectLink = (link) => {
    return {
        type: SELECT_LINK,
        link
    };
};

const updateNetwork = (network, kv) => {
    return {
        type: UPDATE_NETWORK,
        network: {
            ...network,
            ...kv,
            unsaved: true
        }
    };
};

const updateNode = (kv) => {
    return {
        type: UPDATE_NODE,
        kv: {
            ...kv,
            unsaved: true
        }
    };
};

const updateLink = (link, kv) => {
    return {
        type: UPDATE_LINK,
        link: {
            ...link,
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
    SAVE_NODE, saveNode,
    SAVE_NODE_SUCCESS, saveNodeSuccess,
    SAVE_NODE_ERROR, saveNodeError,
    DELETE_NETWORK_SUCCESS, deleteNetworkSuccess,
    DELETE_NETWORK_ERROR, deleteNetworkError,
    DELETE_NETWORK, deleteNetwork,
    SELECT_NODE, selectNode,
    SELECT_LINK, selectLink,
    UPDATE_NODE, updateNode,
    UPDATE_LINK, updateLink
};