import { FETCH_PROJECT_MANAGER_CONFIG_SUCCESS, FETCH_PROJECT_MANAGER_CONFIG, SET_MENU_GROUP } from "./actionsProjectManager";

export default ( state = {}, action) => {
    switch (action.type) {
    case FETCH_PROJECT_MANAGER_CONFIG:
        return {
            ...state,
            fetching: action.mapId
        };
    case FETCH_PROJECT_MANAGER_CONFIG_SUCCESS:
        return {
            ...state,
            fetching: null,
            data: action.payload
        };
    case SET_MENU_GROUP:
        if (state.openMenuGroup === action.payload) {
            return {
                ...state,
                openMenuGroup: null
            };
        }
        return {
            ...state,
            openMenuGroup: action.payload
        };
    default:
        return state;
    }
};
