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
    CREATE_LINK_SUCCESS,
    SAVE_NODE_SUCCESS,
    SAVE_LINK_SUCCESS,
    DELETE_NETWORK_SUCCESS,
    DELETE_NODE_SUCCESS,
    DELETE_LINK_SUCCESS,
    SELECT_LINK,
    SELECT_NODE,
    UPDATE_LINK,
    UPDATE_NODE,
    UPDATE_CREATING_NODE,
    UPDATE_CREATING_LINK,
    SHOW_CREATE_NODE_FORM,
    SHOW_CREATE_LINK_FORM
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
    case DELETE_NODE_SUCCESS:
        return {
            ...state,
            data: state.data.map(
                (network) => {
                    if (state.selectedNetworkId === network.id) {
                        return {
                            ...network,
                            json: {
                                ...network.json,
                                nodes: network.json.nodes.filter(
                                    (node) => state.selectedNodeId !== node.id
                                )
                            }
                        };
                    }
                    return network;
                }),
            selectedNodeId: null
        };
    case DELETE_LINK_SUCCESS:
        return {
            ...state,
            data: state.data.map(
                (network) => {
                    if (state.selectedNetworkId === network.id) {
                        return {
                            ...network,
                            json: {
                                ...network.json,
                                links: network.json.links.filter(
                                    (link) => state.selectedLinkId !== link.id
                                )
                            }
                        };
                    }
                    return network;
                }),
            selectedLinkId: null
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
    case UPDATE_LINK:
        return {
            ...state,
            data: state.data.map(
                (network) => {
                    if (state.selectedNetworkId === network.id) {
                        return {
                            ...network,
                            json: {
                                ...network.json,
                                links: network.json.links.map(
                                    (link) => {
                                        if (state.selectedLinkId === link.id) {
                                            return {
                                                ...link,
                                                ...action.kv
                                            };
                                        }
                                        return link;
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
    case UPDATE_CREATING_LINK:
        // action.node.unsaved = true;
        return {
            ...state,
            creatingLink: {
                ...state.creatingLink,
                ...action.kv
            }
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
            }),
            selectedNetworkId: action.network?.id
        };
    case SAVE_NODE_SUCCESS:
        return {
            ...state,
            selectedNodeId: action.node.id
        };
    case SAVE_LINK_SUCCESS:
        return {
            ...state,
            selectedLinkId: action.link.id
        };
    case CREATE_NODE_SUCCESS:
        return {
            ...state,
            selectedLinkId: null,
            creatingLink: null,
            selectedNodeId: null,
            creatingNode: null
        };
    case CREATE_LINK_SUCCESS:
        return {
            ...state,
            selectedLinkId: null,
            creatingLink: null,
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
            selectedNetworkId: action.networkId,
            selectedNodeId: null,
            selectedLinkId: null
        };
    case SELECT_NODE:
        return {
            ...state,
            selectedNodeId: action.nodeId
        };
    case SELECT_LINK:
        return {
            ...state,
            selectedLinkId: action.linkId
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
        if (action.value) {
            return {
                ...state,
                creatingNode: {
                    unsaved: true
                }
            };
        }
        return {
            ...state,
            creatingNode: null
        };
    case SHOW_CREATE_LINK_FORM:
        if (action.value) {
            return {
                ...state,
                creatingLink: {
                    unsaved: true
                }
            };
        }
        return {
            ...state,
            creatingLink: null
        };
    default:
        return state;
    }
};
