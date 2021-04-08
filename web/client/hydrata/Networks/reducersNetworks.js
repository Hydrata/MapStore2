import {
    FETCH_NETWORKS_LIST,
    FETCH_NETWORKS_LIST_SUCCESS,
    SHOW_NETWORKS_LIST,
    HIDE_NETWORKS_LIST,
    UPDATE_NETWORK,
    CREATE_NETWORK,
    SELECT_NETWORK,
    SAVE_NETWORK_SUCCESS,
    CREATE_NODE_SUCCESS,
    SAVE_NODE_SUCCESS,
    DELETE_NETWORK_SUCCESS,
    SELECT_LINK,
    SELECT_NODE,
    UPDATE_LINK,
    UPDATE_NODE,
    UPDATE_CREATING_NODE,
    SHOW_CREATE_NODE_FORM
} from "./actionsNetworks";

export default ( state = {}, action) => {
    switch (action.type) {
    case FETCH_NETWORKS_LIST:
        return {
            ...state,
            fetching: action.mapId
        };
    case FETCH_NETWORKS_LIST_SUCCESS:
        return {
            ...state,
            fetching: null,
            hasNetworks: true,
            data: action.data
        };
    case SHOW_NETWORKS_LIST:
        return {
            ...state,
            visibleNetworksList: true
        };
    case HIDE_NETWORKS_LIST:
        return {
            ...state,
            visibleNetworksList: false
        };
    case UPDATE_NETWORK:
        return {
            ...state,
            data: state.data?.map((network) => {
                if (network.id === action.network.id) {
                    return action.network;
                }
                return network;
            })
        };
    case UPDATE_NODE:
        return {
            ...state,
            data: state.data.map(
                (network) => {
                    if (state.selectedNetworkId === network.id) {
                        return {
                            ...network,
                            json: {
                                ...network.json,
                                nodes: network.json.nodes.map(
                                    (node) => {
                                        if (state.selectedNodeId === node.id) {
                                            return {
                                                ...node,
                                                ...action.kv
                                            };
                                        }
                                        return node;
                                    }
                                )
                            }
                        };
                    }
                    return network;
                })
        };
    case UPDATE_CREATING_NODE:
        // action.node.unsaved = true;
        return {
            ...state,
            creatingNode: {
                ...state.creatingNode,
                ...action.kv
            }
        };
    case UPDATE_LINK:
        return {
            ...state,
            selectedLink: action.link
        };
    case SAVE_NETWORK_SUCCESS:
        return {
            ...state,
            data: state.data?.map((network) => {
                if (network && !network.id) {
                    return action.network;
                }
                if (network.id === action.network.id) {
                    action.network.unsaved = false;
                    return action.network;
                }
                return network;
            })
        };
    case SAVE_NODE_SUCCESS:
        return {
            ...state,
            selectedNodeId: {
                ...action.node.id,
                unsaved: false
            }
        };
    case CREATE_NODE_SUCCESS:
        return {
            ...state,
            selectedNodeId: null,
            creatingNode: null
        };
    case DELETE_NETWORK_SUCCESS:
        return {
            ...state,
            data: state.data.filter((network) => network?.id !== action.network.id)
        };
    case SELECT_NETWORK:
        return {
            ...state,
            selectedNetworkId: action.networkId
        };
    case SELECT_NODE:
        return {
            ...state,
            selectedNodeId: action.nodeId
        };
    case SELECT_LINK:
        return {
            ...state,
            selectedLinkId: action.link.id
        };
    case CREATE_NETWORK:
        return {
            ...state,
            data: [...state.data, {
                "project": action.projectId,
                "id": undefined,
                "name": "<enter name>",
                "unsaved": true
            }]
        };
    case SHOW_CREATE_NODE_FORM:
        return {
            ...state,
            creatingNode: action.value
        };
    default:
        return state;
    }
};
