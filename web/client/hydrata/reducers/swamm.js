import { FETCH_SWAMM_CONFIG_SUCCESS, FETCH_SWAMM_CONFIG } from "../actions/swamm";

export default ( state = {}, action) => {
    switch (action.type) {
    case FETCH_SWAMM_CONFIG:
        return {
            ...state,
            fetching: action.mapId
        };
    case FETCH_SWAMM_CONFIG_SUCCESS:
        return {
            ...state,
            fetching: null,
            data: action.payload
        };
    default:
        return state;
    }
};
