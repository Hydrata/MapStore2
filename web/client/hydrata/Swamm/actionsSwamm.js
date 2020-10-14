const axios = require('../../libs/ajax');

const FETCH_SWAMM_BMPTYPES = 'FETCH_SWAMM_BMPTYPES';
const FETCH_SWAMM_BMPTYPES_ERROR = 'FETCH_SWAMM_BMPTYPES_ERROR';
const FETCH_SWAMM_BMPTYPES_SUCCESS = 'FETCH_SWAMM_BMPTYPES_SUCCESS';

const FETCH_SWAMM_ALL_BMPS = 'FETCH_SWAMM_ALL_BMPS';
const FETCH_SWAMM_ALL_BMPS_ERROR = 'FETCH_SWAMM_ALL_BMPS_ERROR';
const FETCH_SWAMM_ALL_BMPS_SUCCESS = 'FETCH_SWAMM_ALL_BMPS_SUCCESS';

const FETCH_SWAMM_BMP = 'FETCH_SWAMM_BMP';
const FETCH_SWAMM_BMP_ERROR = 'FETCH_SWAMM_BMP_ERROR';
const FETCH_SWAMM_BMP_SUCCESS = 'FETCH_SWAMM_BMP_SUCCESS';

const TOGGLE_OUTLETS = 'TOGGLE_OUTLETS';
const TOGGLE_FOOTPRINTS = 'TOGGLE_FOOTPRINTS';
const TOGGLE_WATERSHEDS = 'TOGGLE_WATERSHEDS';
const TOGGLE_BMP_TYPE = 'TOGGLE_BMP_TYPE';

const fetchSwammBmpTypesSuccess = (config) => {
    return {
        type: FETCH_SWAMM_BMPTYPES_SUCCESS,
        bmpTypes: config
    };
};

function fetchSwammBmpTypesError(e) {
    return {
        type: FETCH_SWAMM_BMPTYPES_ERROR,
        error: e
    };
}

const fetchSwammBmpTypes = (dispatch) => {
    return (mapId) => {
        return axios.get(`/swamm/api/${mapId}/bmp-type/`
        ).then(
            response => {
                dispatch(fetchSwammBmpTypesSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchSwammBmpTypesError(e));
            }
        );
    };
};

const fetchSwammAllBmpsSuccess = (allBmps) => {
    return {
        type: FETCH_SWAMM_ALL_BMPS_SUCCESS,
        allBmps: allBmps
    };
};

function fetchSwammAllBmpsError(e) {
    return {
        type: FETCH_SWAMM_ALL_BMPS_ERROR,
        error: e
    };
}

const fetchSwammAllBmps = (dispatch) => {
    return (mapId) => {
        return axios.get(`/swamm/api/${mapId}/all-bmps/`
        ).then(
            response => {
                dispatch(fetchSwammAllBmpsSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchSwammAllBmpsError(e));
            }
        );
    };
};

const fetchSwammBmpSuccess = (config) => {
    return {
        type: FETCH_SWAMM_BMP_SUCCESS,
        bmpTypes: config
    };
};

function fetchSwammBmpError(e) {
    return {
        type: FETCH_SWAMM_BMP_ERROR,
        error: e
    };
}

const fetchSwammBmp = (dispatch) => {
    return (mapId, bmpTypeId) => {
        return axios.get(`/swamm/api/${mapId}/bmp-type/${bmpTypeId}/bmp/`
        ).then(
            response => {
                dispatch(fetchSwammBmpSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchSwammBmpError(e));
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
    FETCH_SWAMM_BMPTYPES, fetchSwammBmpTypes,
    FETCH_SWAMM_BMPTYPES_ERROR, fetchSwammBmpTypesError,
    FETCH_SWAMM_BMPTYPES_SUCCESS, fetchSwammBmpTypesSuccess,
    FETCH_SWAMM_ALL_BMPS, fetchSwammAllBmps,
    FETCH_SWAMM_ALL_BMPS_ERROR, fetchSwammAllBmpsError,
    FETCH_SWAMM_ALL_BMPS_SUCCESS, fetchSwammAllBmpsSuccess,
    FETCH_SWAMM_BMP, fetchSwammBmp,
    FETCH_SWAMM_BMP_ERROR, fetchSwammBmpError,
    FETCH_SWAMM_BMP_SUCCESS, fetchSwammBmpSuccess,
    TOGGLE_BMP_TYPE, toggleBmpType,
    TOGGLE_OUTLETS, toggleOutlets,
    TOGGLE_FOOTPRINTS, toggleFootprints,
    TOGGLE_WATERSHEDS, toggleWatersheds
};
