const axios = require('../../libs/ajax');

const FETCH_SWAMM_BMPTYPES = 'FETCH_SWAMM_BMPTYPES';
const FETCH_SWAMM_BMPTYPES_ERROR = 'FETCH_SWAMM_BMPTYPES_ERROR';
const FETCH_SWAMM_BMPTYPES_SUCCESS = 'FETCH_SWAMM_BMPTYPES_SUCCESS';

const FETCH_SWAMM_ALL_BMPS = 'FETCH_SWAMM_ALL_BMPS';
const FETCH_SWAMM_ALL_BMPS_ERROR = 'FETCH_SWAMM_ALL_BMPS_ERROR';
const FETCH_SWAMM_ALL_BMPS_SUCCESS = 'FETCH_SWAMM_ALL_BMPS_SUCCESS';

const TOGGLE_OUTLETS = 'TOGGLE_OUTLETS';
const TOGGLE_FOOTPRINTS = 'TOGGLE_FOOTPRINTS';
const TOGGLE_WATERSHEDS = 'TOGGLE_WATERSHEDS';
const TOGGLE_BMP_TYPE = 'TOGGLE_BMP_TYPE';

const SHOW_CREATE_BMP_FORM = 'SHOW_CREATE_BMP_FORM';
const HIDE_CREATE_BMP_FORM = 'HIDE_CREATE_BMP_FORM';
const SUBMIT_CREATE_BMP_FORM = 'SUBMIT_CREATE_BMP_FORM';
const MAKE_CREATE_BMP_FORM = 'MAKE_CREATE_BMP_FORM';
const CLEAR_CREATE_BMP_FORM = 'CLEAR_CREATE_BMP_FORM';
const MAKE_DEFAULTS_CREATE_BMP_FORM = 'MAKE_DEFAULTS_CREATE_BMP_FORM';
const UPDATE_CREATE_BMP_FORM = 'UPDATE_CREATE_BMP_FORM';
const SET_DRAWING_BMP = 'SET_DRAWING_BMP';

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
        return axios.get(`/swamm/api/${mapId}/bmps/`
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

const makeCreateBmpForm = (bmpTypeId) => {
    return {
        type: MAKE_CREATE_BMP_FORM,
        bmpTypeId: bmpTypeId
    };
};

const showCreateBmpForm = () => {
    return {
        type: SHOW_CREATE_BMP_FORM
    };
};

const hideCreateBmpForm = () => {
    return {
        type: HIDE_CREATE_BMP_FORM
    };
};

const makeDefaultsBmpCreateForm = (bmpType) => {
    return {
        type: MAKE_DEFAULTS_CREATE_BMP_FORM,
        bmpType: bmpType
    };
};

const clearCreateBmpForm = () => {
    return {
        type: CLEAR_CREATE_BMP_FORM
    };
};

const updateCreateBmpForm = (kv) => {
    return {
        type: UPDATE_CREATE_BMP_FORM,
        kv: kv
    };
};

const setDrawingBmp = (layerName) => {
    return {
        type: SET_DRAWING_BMP,
        layerName: layerName
    };
};

const submitCreateBmpForm = (newBmp, mapId) => {
    console.log('submitCreateBmpForm: ', newBmp);
    return (dispatch) => {
        console.log('post: ', `/swamm/api/${mapId}/bmps/`);
        return axios.post(`/swamm/api/${mapId}/bmps/`, newBmp
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

module.exports = {
    FETCH_SWAMM_BMPTYPES, fetchSwammBmpTypes,
    FETCH_SWAMM_BMPTYPES_ERROR, fetchSwammBmpTypesError,
    FETCH_SWAMM_BMPTYPES_SUCCESS, fetchSwammBmpTypesSuccess,
    FETCH_SWAMM_ALL_BMPS, fetchSwammAllBmps,
    FETCH_SWAMM_ALL_BMPS_ERROR, fetchSwammAllBmpsError,
    FETCH_SWAMM_ALL_BMPS_SUCCESS, fetchSwammAllBmpsSuccess,
    TOGGLE_BMP_TYPE, toggleBmpType,
    TOGGLE_OUTLETS, toggleOutlets,
    TOGGLE_FOOTPRINTS, toggleFootprints,
    TOGGLE_WATERSHEDS, toggleWatersheds,
    SHOW_CREATE_BMP_FORM, showCreateBmpForm,
    HIDE_CREATE_BMP_FORM, hideCreateBmpForm,
    SUBMIT_CREATE_BMP_FORM, submitCreateBmpForm,
    CLEAR_CREATE_BMP_FORM, clearCreateBmpForm,
    MAKE_CREATE_BMP_FORM, makeCreateBmpForm,
    MAKE_DEFAULTS_CREATE_BMP_FORM, makeDefaultsBmpCreateForm,
    UPDATE_CREATE_BMP_FORM, updateCreateBmpForm,
    SET_DRAWING_BMP, setDrawingBmp
};
