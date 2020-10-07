import { FETCH_SWAMM_CONFIG_SUCCESS, FETCH_SWAMM_CONFIG, TOGGLE_OUTLETS, TOGGLE_FOOTPRINTS, TOGGLE_WATERSHEDS } from "../actions/swamm";

const initialState = {
    showOutlets: true
};

export default ( state = initialState, action) => {
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
    case TOGGLE_OUTLETS:
        return {
            ...state,
            showOutlets: !state.showOutlets
        };
    case TOGGLE_FOOTPRINTS:
        return {
            ...state,
            showFootprints: !state.showFootprints
        };
    case TOGGLE_WATERSHEDS:
        return {
            ...state,
            showWatersheds: !state.showWatersheds
        };
    default:
        return state;
    }
};
