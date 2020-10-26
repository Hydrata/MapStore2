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
const SET_BMP_TYPE = 'SET_BMP_TYPE';

const SHOW_BMP_FORM = 'SHOW_BMP_FORM';
const HIDE_BMP_FORM = 'HIDE_BMP_FORM';
const SUBMIT_BMP_FORM = 'SUBMIT_BMP_FORM';
const SUBMIT_BMP_FORM_SUCCESS = 'SUBMIT_BMP_FORM_SUCCESS';
const SUBMIT_BMP_FORM_ERROR = 'SUBMIT_BMP_FORM_ERROR';
const MAKE_BMP_FORM = 'MAKE_BMP_FORM';
const CLEAR_BMP_FORM = 'CLEAR_BMP_FORM';
const MAKE_DEFAULTS_BMP_FORM = 'MAKE_DEFAULTS_BMP_FORM';
const MAKE_EXISTING_BMP_FORM = 'MAKE_EXISTING_BMP_FORM';
const UPDATE_BMP_FORM = 'UPDATE_BMP_FORM';
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

const fetchSwammBmpTypes = (mapId) => {
    return (dispatch) => {
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

const fetchSwammAllBmps = (mapId) => {
    return (dispatch) => {
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

const setBmpType = (bmpType, isVisible) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_BMP_TYPE',
            bmpType: bmpType,
            isVisible: isVisible
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

const makeBmpForm = (bmpTypeId) => {
    return {
        type: MAKE_BMP_FORM,
        bmpTypeId: bmpTypeId
    };
};

const showBmpForm = () => {
    return {
        type: SHOW_BMP_FORM
    };
};

const hideBmpForm = () => {
    return {
        type: HIDE_BMP_FORM
    };
};

const makeDefaultsBmpForm = (bmpType) => {
    return {
        type: MAKE_DEFAULTS_BMP_FORM,
        bmpType: bmpType
    };
};

const makeExistingBmpForm = (bmp) => {
    return {
        type: MAKE_EXISTING_BMP_FORM,
        bmp: bmp
    };
};

const clearBmpForm = () => {
    return {
        type: CLEAR_BMP_FORM
    };
};

const updateBmpForm = (kv) => {
    return {
        type: UPDATE_BMP_FORM,
        kv: kv
    };
};

const setDrawingBmp = (layerName) => {
    return {
        type: SET_DRAWING_BMP,
        layerName: layerName
    };
};

const submitBmpFormSuccess = (bmp) => {
    return {
        type: SUBMIT_BMP_FORM_SUCCESS,
        bmp: bmp
    };
};

function submitBmpFormError(e) {
    return {
        type: SUBMIT_BMP_FORM_ERROR,
        error: e
    };
}

const submitBmpForm = (newBmp, mapId) => {
    console.log("newBmp: ", newBmp);
    if (newBmp.id) {
        console.log("newBmp patching: ", newBmp);
        return (dispatch) => {
            return axios.patch(`/swamm/api/${mapId}/bmps/${newBmp.id}/`, newBmp
            ).then(
                response => {
                    console.log('dispatching: submitBmpFormSuccess');
                    dispatch(submitBmpFormSuccess(response.data));
                    console.log('dispatching: fetchSwammAllBmps');
                    dispatch(fetchSwammAllBmps(mapId));
                }
            ).catch(
                e => {
                    dispatch(submitBmpFormError(e));
                }
            );
        };
    }
    return (dispatch) => {
        console.log("newBmp posting: ", newBmp);
        return axios.post(`/swamm/api/${mapId}/bmps/`, newBmp
        ).then(
            response => {
                dispatch(submitBmpFormSuccess(response.data));
                dispatch(fetchSwammAllBmps(mapId));
            }
        ).catch(
            e => {
                dispatch(submitBmpFormError(e));
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
    SUBMIT_BMP_FORM, submitBmpForm,
    SUBMIT_BMP_FORM_ERROR, submitBmpFormError,
    SUBMIT_BMP_FORM_SUCCESS, submitBmpFormSuccess,
    TOGGLE_BMP_TYPE, toggleBmpType,
    SET_BMP_TYPE, setBmpType,
    TOGGLE_OUTLETS, toggleOutlets,
    TOGGLE_FOOTPRINTS, toggleFootprints,
    TOGGLE_WATERSHEDS, toggleWatersheds,
    SHOW_BMP_FORM, showBmpForm,
    HIDE_BMP_FORM, hideBmpForm,
    CLEAR_BMP_FORM, clearBmpForm,
    MAKE_BMP_FORM, makeBmpForm,
    MAKE_DEFAULTS_BMP_FORM, makeDefaultsBmpForm,
    MAKE_EXISTING_BMP_FORM, makeExistingBmpForm,
    UPDATE_BMP_FORM, updateBmpForm,
    SET_DRAWING_BMP, setDrawingBmp
};
