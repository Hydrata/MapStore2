import { FETCH_PROJECT_MANAGER_CONFIG_SUCCESS, FETCH_PROJECT_MANAGER_CONFIG } from "../actions/projectManager";

export default ( state = {}, action) => {
    switch (action.type) {
    case FETCH_PROJECT_MANAGER_CONFIG:
        return {
            ...state,
            projectManager: {
                fetching: action.mapId
            }
        };
    case FETCH_PROJECT_MANAGER_CONFIG_SUCCESS:
        return {
            ...state,
            projectManager: {
                ...state.projectManager,
                fetching: false,
                data: action.payload
            }
        };
    default:
        return state;
    }
};
