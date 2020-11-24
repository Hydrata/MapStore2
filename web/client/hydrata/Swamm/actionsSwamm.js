const axios = require('../../libs/ajax');

const FETCH_SWAMM_BMPTYPES = 'FETCH_SWAMM_BMPTYPES';
const FETCH_SWAMM_BMPTYPES_ERROR = 'FETCH_SWAMM_BMPTYPES_ERROR';
const FETCH_SWAMM_BMPTYPES_SUCCESS = 'FETCH_SWAMM_BMPTYPES_SUCCESS';

const FETCH_SWAMM_ALL_BMPS = 'FETCH_SWAMM_ALL_BMPS';
const FETCH_SWAMM_ALL_BMPS_ERROR = 'FETCH_SWAMM_ALL_BMPS_ERROR';
const FETCH_SWAMM_ALL_BMPS_SUCCESS = 'FETCH_SWAMM_ALL_BMPS_SUCCESS';

const FETCH_SWAMM_BMP_STATUSES = 'FETCH_SWAMM_BMP_STATUSES';
const FETCH_SWAMM_BMP_STATUSES_ERROR = 'FETCH_SWAMM_BMP_STATUSES_ERROR';
const FETCH_SWAMM_BMP_STATUSES_SUCCESS = 'FETCH_SWAMM_BMP_STATUSES_SUCCESS';

const SHOW_SWAMM_BMP_CHART = 'SHOW_SWAMM_BMP_CHART';
const HIDE_SWAMM_BMP_CHART = 'HIDE_SWAMM_BMP_CHART';

const SHOW_SWAMM_DATA_GRID = 'SHOW_SWAMM_DATA_GRID';
const HIDE_SWAMM_DATA_GRID = 'HIDE_SWAMM_DATA_GRID';

const SHOW_BMP_MANAGER = 'SHOW_BMP_MANAGER';
const HIDE_BMP_MANAGER = 'HIDE_BMP_MANAGER';
const TOGGLE_BMP_MANAGER = 'TOGGLE_BMP_MANAGER';

const TOGGLE_OUTLETS = 'TOGGLE_OUTLETS';
const TOGGLE_FOOTPRINTS = 'TOGGLE_FOOTPRINTS';
const TOGGLE_WATERSHEDS = 'TOGGLE_WATERSHEDS';
const TOGGLE_BMP_TYPE = 'TOGGLE_BMP_TYPE';
const SET_BMP_TYPE = 'SET_BMP_TYPE';

const SET_STATUS_FILTER = 'SET_STATUS_FILTER';

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
    console.log('fetchSwammBmpTypesError', e);
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

const setStatusFilter = (statuses) => {
    return {
        type: SET_STATUS_FILTER,
        statuses: statuses
    };
};

const fetchSwammAllBmpsSuccess = (allBmps) => {
    return {
        type: FETCH_SWAMM_ALL_BMPS_SUCCESS,
        allBmps: allBmps
    };
};

function fetchSwammAllBmpsError(e) {
    console.log('fetchSwammAllBmpsError', e);
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

const fetchSwammBmpStatusesSuccess = (statuses) => {
    return {
        type: FETCH_SWAMM_BMP_STATUSES_SUCCESS,
        statuses: statuses
    };
};

function fetchSwammBmpStatusesError(e) {
    console.log('fetchSwammBmpStatusesError', e);
    return {
        type: FETCH_SWAMM_BMP_STATUSES_ERROR,
        error: e
    };
}

const fetchSwammBmpStatuses = (mapId) => {
    return (dispatch) => {
        return axios.get(`/swamm/api/${mapId}/bmps/status_list/`
        ).then(
            response => {
                dispatch(fetchSwammBmpStatusesSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchSwammBmpStatusesError(e));
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

const makeBmpForm = () => {
    return {
        type: MAKE_BMP_FORM
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

const showSwammDataGrid = () => {
    return {
        type: SHOW_SWAMM_DATA_GRID
    };
};

const hideSwammDataGrid = () => {
    return {
        type: HIDE_SWAMM_DATA_GRID
    };
};

const showSwammBmpChart = () => {
    return {
        type: SHOW_SWAMM_BMP_CHART
    };
};

const hideSwammBmpChart = () => {
    return {
        type: HIDE_SWAMM_BMP_CHART
    };
};

const showBmpManager = () => {
    return {
        type: SHOW_BMP_MANAGER
    };
};

const hideBmpManager = () => {
    return {
        type: HIDE_BMP_MANAGER
    };
};

const toggleBmpManager = () => {
    return {
        type: TOGGLE_BMP_MANAGER
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
    console.log('submitBmpFormError', e);
    return {
        type: SUBMIT_BMP_FORM_ERROR,
        error: e
    };
}

const submitBmpForm = (newBmp, mapId) => {
    if (newBmp.id) {
        return (dispatch) => {
            return axios.patch(`/swamm/api/${mapId}/bmps/${newBmp.id}/`, newBmp
            ).then(
                response => {
                    dispatch(submitBmpFormSuccess(response.data));
                    dispatch(fetchSwammAllBmps(mapId));
                    dispatch(makeExistingBmpForm(response.data));
                }
            ).catch(
                e => {
                    dispatch(submitBmpFormError(e));
                }
            );
        };
    }
    return (dispatch) => {
        return axios.post(`/swamm/api/${mapId}/bmps/`, newBmp
        ).then(
            response => {
                dispatch(submitBmpFormSuccess(response.data));
                dispatch(fetchSwammAllBmps(mapId));
                dispatch(makeExistingBmpForm(response.data));
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
    FETCH_SWAMM_BMP_STATUSES, fetchSwammBmpStatuses,
    FETCH_SWAMM_BMP_STATUSES_ERROR, fetchSwammBmpStatusesError,
    FETCH_SWAMM_BMP_STATUSES_SUCCESS, fetchSwammBmpStatusesSuccess,
    SUBMIT_BMP_FORM, submitBmpForm,
    SUBMIT_BMP_FORM_ERROR, submitBmpFormError,
    SUBMIT_BMP_FORM_SUCCESS, submitBmpFormSuccess,
    TOGGLE_BMP_TYPE, toggleBmpType,
    SET_BMP_TYPE, setBmpType,
    SET_STATUS_FILTER, setStatusFilter,
    TOGGLE_OUTLETS, toggleOutlets,
    TOGGLE_FOOTPRINTS, toggleFootprints,
    TOGGLE_WATERSHEDS, toggleWatersheds,
    SHOW_BMP_FORM, showBmpForm,
    HIDE_BMP_FORM, hideBmpForm,
    SHOW_SWAMM_DATA_GRID, showSwammDataGrid,
    HIDE_SWAMM_DATA_GRID, hideSwammDataGrid,
    SHOW_SWAMM_BMP_CHART, showSwammBmpChart,
    HIDE_SWAMM_BMP_CHART, hideSwammBmpChart,
    SHOW_BMP_MANAGER, showBmpManager,
    HIDE_BMP_MANAGER, hideBmpManager,
    TOGGLE_BMP_MANAGER, toggleBmpManager,
    CLEAR_BMP_FORM, clearBmpForm,
    MAKE_BMP_FORM, makeBmpForm,
    MAKE_DEFAULTS_BMP_FORM, makeDefaultsBmpForm,
    MAKE_EXISTING_BMP_FORM, makeExistingBmpForm,
    UPDATE_BMP_FORM, updateBmpForm,
    SET_DRAWING_BMP, setDrawingBmp
};
