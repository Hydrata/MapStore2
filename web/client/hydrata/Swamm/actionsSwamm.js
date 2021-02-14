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
const SHOW_SWAMM_FEATURE_GRID = 'SHOW_SWAMM_FEATURE_GRID';

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
const SET_DRAWING_BMP_LAYER_NAME = 'SET_DRAWING_BMP_LAYER_NAME';
const START_DRAWING_BMP = 'START_DRAWING_BMP';
const CLEAR_DRAWING_BMP_LAYER_NAME = 'CLEAR_DRAWING_BMP_LAYER_NAME';
const CREATE_BMP_FEATURE_ID = 'CREATE_BMP_FEATURE_ID';
const SET_EDITING_BMP_FEATURE_ID = 'SET_EDITING_BMP_FEATURE_ID';
const CLEAR_EDITING_BMP_FEATURE_ID = 'CLEAR_EDITING_BMP_FEATURE_ID';

const uuidv1 = require('uuid/v1');
const { SHOW_NOTIFICATION } = require('../../actions/notifications');

const fetchSwammBmpTypesSuccess = (config) => {
    return {
        type: FETCH_SWAMM_BMPTYPES_SUCCESS,
        bmpTypes: config
    };
};

function fetchSwammBmpTypesError(e) {
    console.log('fetchSwammBmpTypesError', e);
    return {
        type: SHOW_NOTIFICATION,
        title: 'Fetch Swamm Bmp Types Error',
        autoDismiss: 600,
        position: 'tc',
        message: `${e?.data}`,
        uid: uuidv1(),
        level: 'error'
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
        type: SHOW_NOTIFICATION,
        title: 'Fetch Swamm All Bmps Error',
        autoDismiss: 600,
        position: 'tc',
        message: `${e?.data}`,
        uid: uuidv1(),
        level: 'error'
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
        type: SHOW_NOTIFICATION,
        title: 'Fetch Swamm Bmp Statuses Error',
        autoDismiss: 600,
        position: 'tc',
        message: `${e?.data}`,
        uid: uuidv1(),
        level: 'error'
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

const showSwammFeatureGrid = (layer) => {
    return {
        type: SHOW_SWAMM_FEATURE_GRID,
        layer
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

const startDrawingBmp = () => {
    return {
        type: START_DRAWING_BMP
    };
};

const setDrawingBmpLayerName = (layerName) => {
    console.log('setDrawingBmpLayerName', layerName);
    return {
        type: SET_DRAWING_BMP_LAYER_NAME,
        drawingBmpLayerName: layerName
    };
};

const clearDrawingBmpLayerName = () => {
    return {
        type: CLEAR_DRAWING_BMP_LAYER_NAME
    };
};

const setEditingBmpFeatureId = (featureId) => {
    console.log('setEditingBmpFeatureId', featureId);
    return {
        type: SET_EDITING_BMP_FEATURE_ID,
        editingBmpFeatureId: featureId
    };
};

const createBmpFeatureId = (action) => {
    console.log('createBmpFeatureId action:', action);
    let newBmpId = null;
    let shapeId = null;
    const ids = action.result.features.map(feature => feature.id.split('.')[1]);
    console.log('createBmpFeatureId ids:', ids);
    // TODO: It would be much better to get this Id from the WFS response XML,
    //  rather than assume it's the largest one.
    newBmpId = Math.max(...ids);
    const featureBmpType = action.filterObj.featureTypeName.split("_")[2];
    console.log('createBmpFeatureId newBmpId: ', newBmpId);
    console.log('createBmpFeatureId featureBmpType: ', featureBmpType);
    const featureId = action.filterObj.featureTypeName + '.' + newBmpId;
    console.log('createBmpFeatureId assigning: ', featureId);
    switch (featureBmpType) {
    case "outlet":
        shapeId = {outlet_fid: featureId};
        break;
    case "footprint":
        shapeId = {footprint_fid: featureId};
        break;
    case "watershed":
        shapeId = {watershed_fid: featureId};
        break;
    default:
        shapeId = {};
    }
    console.log('createBmpFeatureId shapeId: ', shapeId);
    return {
        type: UPDATE_BMP_FORM,
        kv: shapeId
    };
};

const clearEditingBmpFeatureId = () => {
    console.log('clearEditingBmpFeatureId');
    return {
        type: CLEAR_EDITING_BMP_FEATURE_ID
    };
};

const submitBmpFormSuccess = (bmp) => {
    return {
        type: SHOW_NOTIFICATION,
        title: 'Success',
        autoDismiss: 6,
        position: 'tc',
        message: `BMP ID: ${bmp.id} saved`,
        uid: uuidv1(),
        level: 'success'
    };
};

function submitBmpFormError(e) {
    console.log('submitBmpFormError', e);
    return {
        type: SHOW_NOTIFICATION,
        title: 'Submit Bmp Form Error',
        autoDismiss: 600,
        position: 'tc',
        message: `Error saving BMP: ${e?.data}`,
        uid: uuidv1(),
        level: 'error'
    };
}

const submitBmpForm = (newBmp, mapId) => {
    if (newBmp.id) {
        return (dispatch) => {
            console.log('updating existing BMP: ', newBmp);
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
        console.log('creating new BMP: ', newBmp);
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
    SHOW_SWAMM_FEATURE_GRID, showSwammFeatureGrid,
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
    START_DRAWING_BMP, startDrawingBmp,
    SET_DRAWING_BMP_LAYER_NAME, setDrawingBmpLayerName,
    CLEAR_DRAWING_BMP_LAYER_NAME, clearDrawingBmpLayerName,
    CREATE_BMP_FEATURE_ID, createBmpFeatureId,
    SET_EDITING_BMP_FEATURE_ID, setEditingBmpFeatureId,
    CLEAR_EDITING_BMP_FEATURE_ID, clearEditingBmpFeatureId
};
