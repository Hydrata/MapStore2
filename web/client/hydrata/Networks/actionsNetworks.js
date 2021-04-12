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
const CREATE_NODE_SUCCESS = 'NETWORKS:CREATE_NODE_SUCCESS';
const SAVE_NODE_ERROR = 'NETWORKS:SAVE_NODE_ERROR';
const SAVE_LINK = 'NETWORKS:SAVE_LINK';
const SAVE_LINK_SUCCESS = 'NETWORKS:SAVE_LINK_SUCCESS';
const CREATE_LINK_SUCCESS = 'NETWORKS:CREATE_LINK_SUCCESS';
const SAVE_LINK_ERROR = 'NETWORKS:SAVE_LINK_ERROR';
const DELETE_NODE = 'NETWORKS:DELETE_NODE';
const DELETE_NODE_SUCCESS = 'NETWORKS:DELETE_NODE_SUCCESS';
const DELETE_NODE_ERROR = 'NETWORKS:DELETE_NODE_ERROR';
const DELETE_LINK = 'NETWORKS:DELETE_LINK';
const DELETE_LINK_SUCCESS = 'NETWORKS:DELETE_LINK_SUCCESS';
const DELETE_LINK_ERROR = 'NETWORKS:DELETE_LINK_ERROR';
const DELETE_NETWORK = 'NETWORKS:DELETE_NETWORK';
const DELETE_NETWORK_SUCCESS = 'NETWORKS:DELETE_NETWORK_SUCCESS';
const DELETE_NETWORK_ERROR = 'NETWORKS:DELETE_NETWORK_ERROR';
const SELECT_NODE = 'NETWORKS:SELECT_NODE';
const SELECT_LINK = 'NETWORKS:SELECT_LINK';
const UPDATE_NODE = 'NETWORKS:UPDATE_NODE';
const UPDATE_CREATING_NODE = 'NETWORKS:UPDATE_CREATING_NODE';
const UPDATE_LINK = 'NETWORKS:UPDATE_LINK';
const UPDATE_CREATING_LINK = 'NETWORKS:UPDATE_CREATING_LINK';
const SHOW_CREATE_NODE_FORM = 'NETWORKS:SHOW_CREATE_NODE_FORM';
const SHOW_CREATE_LINK_FORM = 'NETWORKS:SHOW_CREATE_LINK_FORM';

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
            return axios.patch(`/scenarios/api/${mapId}/networks/${network.id}/`, network
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

const createNodeSuccess = (data) => {
    return {
        type: CREATE_NODE_SUCCESS,
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
        return (dispatch, getState) => {
            const state = getState();
            const networkPayload = {id: state?.networks?.selectedNetworkId};
            return axios.patch(`/scenarios/api/${mapId}/nodes/${node.id}/`, node
            ).then(
                response => {
                    dispatch(saveNodeSuccess(response.data));
                    dispatch(saveNetwork(state?.projectManager?.data?.base_map, networkPayload));
                }
            ).catch(
                e => {
                    dispatch(saveNodeError(e));
                }
            );
        };
    }
    return (dispatch, getState) => {
        const state = getState();
        const networkPayload = {id: state?.networks?.selectedNetworkId};
        node.project = state?.projectManager?.data?.id;
        node.network = state?.networks?.selectedNetworkId;
        node.linkedNode = state?.networks?.selectedNodeId;
        return axios.post(`/scenarios/api/${mapId}/nodes/`, node
        ).then(
            response => {
                dispatch(createNodeSuccess(response.data));
                dispatch(saveNetwork(state?.projectManager?.data?.base_map, networkPayload));
            }
        ).catch(
            e => {
                dispatch(saveNodeError(e));
            }
        );
    };
};

const saveLinkSuccess = (data) => {
    return {
        type: SAVE_LINK_SUCCESS,
        link: data
    };
};

const createLinkSuccess = (data) => {
    return {
        type: CREATE_LINK_SUCCESS,
        link: data
    };
};

function saveLinkError(e) {
    console.log('*** error:', e);
    return {
        type: SAVE_LINK_ERROR,
        error: e
    };
}

const saveLink = (mapId, link) => {
    if (link.id) {
        return (dispatch, getState) => {
            const state = getState();
            const networkPayload = {id: state?.networks?.selectedNetworkId};
            return axios.patch(`/scenarios/api/${mapId}/links/${link.id}/`, link
            ).then(
                response => {
                    dispatch(saveLinkSuccess(response.data));
                    dispatch(saveNetwork(state?.projectManager?.data?.base_map, networkPayload));
                }
            ).catch(
                e => {
                    dispatch(saveLinkError(e));
                }
            );
        };
    }
    return (dispatch, getState) => {
        const state = getState();
        const networkPayload = {id: state?.networks?.selectedNetworkId};
        link.project = state?.projectManager?.data?.id;
        link.network = state?.networks?.selectedNetworkId;
        return axios.post(`/scenarios/api/${mapId}/links/`, link
        ).then(
            response => {
                dispatch(createLinkSuccess(response.data));
                dispatch(saveNetwork(state?.projectManager?.data?.base_map, networkPayload));
            }
        ).catch(
            e => {
                dispatch(saveLinkError(e));
            }
        );
    };
};

const deleteNodeSuccess = (node) => {
    return {
        type: DELETE_NODE_SUCCESS,
        node
    };
};

function deleteNodeError(e) {
    console.log('*** error:', e);
    return {
        type: DELETE_NODE_ERROR,
        error: e
    };
}

const deleteNode = (mapId, node) => {
    return (dispatch, getState) => {
        const state = getState();
        const networkPayload = {id: state?.networks?.selectedNetworkId};
        return axios.delete(`/scenarios/api/${mapId}/nodes/${node?.id}/`, node
        ).then(
            response => {
                dispatch(deleteNodeSuccess(node));
                dispatch(saveNetwork(state?.projectManager?.data?.base_map, networkPayload));
            }
        ).catch(
            e => {
                dispatch(deleteNodeError(e));
            }
        );
    };
};

const deleteLinkSuccess = (link) => {
    return {
        type: DELETE_LINK_SUCCESS,
        link
    };
};

function deleteLinkError(e) {
    console.log('*** error:', e);
    return {
        type: DELETE_LINK_ERROR,
        error: e
    };
}

const deleteLink = (mapId, link) => {
    return (dispatch) => {
        return axios.delete(`/scenarios/api/${mapId}/links/${link.id}/`, link
        ).then(
            response => {
                dispatch(deleteLinkSuccess(link));
            }
        ).catch(
            e => {
                dispatch(deleteLinkError(e));
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

const selectNetworkId = (networkId) => {
    return {
        type: SELECT_NETWORK,
        networkId
    };
};

const selectNodeId = (nodeId) => {
    return {
        type: SELECT_NODE,
        nodeId
    };
};

const selectLinkId = (linkId) => {
    return {
        type: SELECT_LINK,
        linkId
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

const updateCreatingNode = (kv) => {
    return {
        type: UPDATE_CREATING_NODE,
        kv: {
            ...kv,
            unsaved: true
        }
    };
};

const updateCreatingLink = (kv) => {
    return {
        type: UPDATE_CREATING_LINK,
        kv: {
            ...kv,
            unsaved: true
        }
    };
};

const updateLink = (kv) => {
    return {
        type: UPDATE_LINK,
        kv: {
            ...kv,
            unsaved: true
        }
    };
};

const showCreateNodeForm = (value) => {
    return {
        type: SHOW_CREATE_NODE_FORM,
        value
    };
};

const showCreateLinkForm = (value) => {
    return {
        type: SHOW_CREATE_LINK_FORM,
        value
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
    SELECT_NETWORK, selectNetworkId,
    SAVE_NETWORK, saveNetwork,
    SAVE_NETWORK_SUCCESS, saveNetworkSuccess,
    SAVE_NETWORK_ERROR, saveNetworkError,
    SAVE_NODE, saveNode,
    SAVE_NODE_SUCCESS, saveNodeSuccess,
    CREATE_NODE_SUCCESS, createNodeSuccess,
    SAVE_NODE_ERROR, saveNodeError,
    SAVE_LINK, saveLink,
    SAVE_LINK_SUCCESS, saveLinkSuccess,
    CREATE_LINK_SUCCESS, createLinkSuccess,
    SAVE_LINK_ERROR, saveLinkError,
    DELETE_NODE_SUCCESS, deleteNodeSuccess,
    DELETE_NODE_ERROR, deleteNodeError,
    DELETE_NODE, deleteNode,
    DELETE_LINK_SUCCESS, deleteLinkSuccess,
    DELETE_LINK_ERROR, deleteLinkError,
    DELETE_LINK, deleteLink,
    DELETE_NETWORK_SUCCESS, deleteNetworkSuccess,
    DELETE_NETWORK_ERROR, deleteNetworkError,
    DELETE_NETWORK, deleteNetwork,
    SELECT_NODE, selectNodeId,
    SELECT_LINK, selectLinkId,
    UPDATE_NODE, updateNode,
    UPDATE_CREATING_NODE, updateCreatingNode,
    UPDATE_LINK, updateLink,
    UPDATE_CREATING_LINK, updateCreatingLink,
    SHOW_CREATE_NODE_FORM, showCreateNodeForm,
    SHOW_CREATE_LINK_FORM, showCreateLinkForm
};
