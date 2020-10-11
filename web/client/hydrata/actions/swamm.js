const axios = require('../../libs/ajax');

const FETCH_SWAMM_CONFIG = 'FETCH_SWAMM_CONFIG';
const FETCH_SWAMM_CONFIG_ERROR = 'FETCH_SWAMM_CONFIG_ERROR';
const FETCH_SWAMM_CONFIG_SUCCESS = 'FETCH_SWAMM_CONFIG_SUCCESS';
const TOGGLE_OUTLETS = 'TOGGLE_OUTLETS';
const TOGGLE_FOOTPRINTS = 'TOGGLE_FOOTPRINTS';
const TOGGLE_WATERSHEDS = 'TOGGLE_WATERSHEDS';
const TOGGLE_BMP_TYPE = 'TOGGLE_BMP_TYPE';

const fetchSwammConfigSuccess = (config) => {
    return {
        type: FETCH_SWAMM_CONFIG_SUCCESS,
        bmpTypes: config
    };
};

function fetchSwammConfigError(e) {
    return {
        type: FETCH_SWAMM_CONFIG_ERROR,
        error: e
    };
}

const fetchSwammConfig = (dispatch) => {
    return (mapId) => {
        return axios.get(`/swamm/api/${mapId}/bmp-type/`
        ).then(
            response => {
                dispatch(fetchSwammConfigSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchSwammConfigError(e));
            }
        );
    };
};

const toggleBmpType = (bmpType) => {
    return (dispatch) => {
        dispatch({
            type: 'TOGGLE_BMP_TYPE',
            bmpType: bmpType
        });
    };
};

const toggleOutlets = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: 'TOGGLE_OUTLETS',
            layers: state.layers
        });
    };
};

const toggleFootprints = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: 'TOGGLE_FOOTPRINTS',
            layers: state.layers
        });
    };
};

const toggleWatersheds = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: 'TOGGLE_WATERSHEDS',
            layers: state.layers
        });
    };
};

module.exports = {
    FETCH_SWAMM_CONFIG, fetchSwammConfig,
    FETCH_SWAMM_CONFIG_ERROR, fetchSwammConfigError,
    FETCH_SWAMM_CONFIG_SUCCESS, fetchSwammConfigSuccess,
    TOGGLE_BMP_TYPE, toggleBmpType,
    TOGGLE_OUTLETS, toggleOutlets,
    TOGGLE_FOOTPRINTS, toggleFootprints,
    TOGGLE_WATERSHEDS, toggleWatersheds
};
