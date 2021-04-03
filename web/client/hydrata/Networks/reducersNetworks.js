import {
    FETCH_NETWORKS_LIST,
    FETCH_NETWORKS_LIST_SUCCESS,
    SHOW_NETWORKS_LIST,
    HIDE_NETWORKS_LIST,
    UPDATE_NETWORK,
    CREATE_NETWORK,
    SELECT_NETWORK,
    SAVE_NETWORK_SUCCESS,
    SAVE_NODE_SUCCESS,
    DELETE_NETWORK_SUCCESS,
    SELECT_LINK,
    SELECT_NODE,
    UPDATE_LINK,
    UPDATE_NODE
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
                    // action.network.unsaved = true;
                    return action.network;
                }
                return network;
            })
        };
    case UPDATE_NODE:
        // action.node.unsaved = true;
        return {
            ...state,
            selectedNode: {
                ...state.selectedNode,
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
            selectedNode: {
                ...action.node,
                unsaved: false
            }
        };
    case DELETE_NETWORK_SUCCESS:
        return {
            ...state,
            data: state.data.filter((network) => network?.id !== action.network.id)
        };
    case SELECT_NETWORK:
        return {
            ...state,
            selectedNetwork: action.network
        };
    case SELECT_NODE:
        return {
            ...state,
            selectedNode: action.node
        };
    case SELECT_LINK:
        return {
            ...state,
            selectedLink: action.link
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
    default:
        return state;
    }
};
