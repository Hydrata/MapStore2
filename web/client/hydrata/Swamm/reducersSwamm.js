import {
    FETCH_SWAMM_BMPTYPES_SUCCESS,
    FETCH_SWAMM_BMPTYPES,
    FETCH_SWAMM_ALL_BMPS_SUCCESS,
    FETCH_SWAMM_BMP_STATUSES,
    FETCH_SWAMM_BMP_STATUSES_SUCCESS,
    TOGGLE_OUTLETS,
    TOGGLE_FOOTPRINTS,
    TOGGLE_WATERSHEDS,
    TOGGLE_BMP_TYPE,
    SET_BMP_TYPE,
    SHOW_BMP_FORM,
    HIDE_BMP_FORM,
    SHOW_SWAMM_DATA_GRID,
    HIDE_SWAMM_DATA_GRID,
    SHOW_SWAMM_BMP_CHART,
    HIDE_SWAMM_BMP_CHART,
    SHOW_BMP_MANAGER,
    HIDE_BMP_MANAGER,
    TOGGLE_BMP_MANAGER,
    MAKE_BMP_FORM,
    CLEAR_BMP_FORM,
    MAKE_DEFAULTS_BMP_FORM,
    MAKE_EXISTING_BMP_FORM,
    UPDATE_BMP_FORM,
    SUBMIT_BMP_FORM_SUCCESS,
    SUBMIT_BMP_FORM_ERROR,
    CLEAR_SUBMIT_BMP_FORM_ERROR,
    SET_DRAWING_BMP
} from "./actionsSwamm";
import {
    SET_MENU_GROUP
} from "../ProjectManager/actionsProjectManager";
import { LOAD_FEATURE_INFO } from "../../actions/mapInfo";

import {QUERY_RESULT} from "../../actions/wfsquery";

const initialState = {
    showOutlets: true,
    showFootprints: true,
    showWatersheds: true,
    bmpTypes: [],
    allBmps: [],
    statuses: [],
    visibleBmpForm: false,
    creatingNewBmp: false,
    drawingBmp: false
};

export default ( state = initialState, action) => {
    switch (action.type) {
    case LOAD_FEATURE_INFO:
        const possibleBmpFeatures = action?.data?.features?.map((feature) => {
            if (
                /([a-zA-Z0-9]{3}_){3}outlet/.test(feature.id) ||
                /([a-zA-Z0-9]{3}_){3}footprint/.test(feature.id) ||
                /([a-zA-Z0-9]{3}_){3}watershed/.test(feature.id)
            ) { return feature;}
            return null;
        });
        if (!possibleBmpFeatures) {
            return state;
        }
        if (possibleBmpFeatures[0]) {
            let bmp;
            if (state.allBmps.filter((bmpToCheck) => bmpToCheck.watershed_fid === possibleBmpFeatures[0].id)[0]) {
                bmp = state.allBmps.filter((bmpToCheck) => bmpToCheck.watershed_fid === possibleBmpFeatures[0].id)[0];
            }
            if (state.allBmps.filter((bmpToCheck) => bmpToCheck.footprint_fid === possibleBmpFeatures[0].id)[0]) {
                bmp = state.allBmps.filter((bmpToCheck) => bmpToCheck.footprint_fid === possibleBmpFeatures[0].id)[0];
            }
            if (state.allBmps.filter((bmpToCheck) => bmpToCheck.outlet_fid === possibleBmpFeatures[0].id)[0]) {
                bmp = state.allBmps.filter((bmpToCheck) => bmpToCheck.outlet_fid === possibleBmpFeatures[0].id)[0];
            }
            return {
                ...state,
                visibleBmpForm: true,
                updatingBmp: bmp
            };
        }
        return state;
    case FETCH_SWAMM_BMPTYPES:
        return {
            ...state,
            fetching: action.mapId
        };
    case FETCH_SWAMM_BMPTYPES_SUCCESS:
        // const newBmpTypes = action.bmpTypes.map(function(bmpType) {
        //     if (!bmpType.visibility) {bmpType.visibility = false;}
        //     bmpType.full_code = bmpType.project.code + '_' + bmpType.organisation.code + '_' + bmpType.code;
        //     return bmpType;
        // });
        return {
            ...state,
            fetching: false,
            bmpTypes: action.bmpTypes
        };
    case FETCH_SWAMM_ALL_BMPS_SUCCESS:
        return {
            ...state,
            fetching: false,
            allBmps: action.allBmps
        };
    case FETCH_SWAMM_BMP_STATUSES:
        return {
            ...state,
            fetchingStatuses: true
        };
    case FETCH_SWAMM_BMP_STATUSES_SUCCESS:
        return {
            ...state,
            statuses: action.statuses
        };
    case TOGGLE_BMP_TYPE:
        return {
            ...state,
            bmpTypes: state.bmpTypes.map(bmpType => {
                if (bmpType.id === action.bmpType.id) {
                    return {
                        ...bmpType,
                        visibility: !action.bmpType.visibility
                    };
                }
                return bmpType;
            })
        };
    case SET_BMP_TYPE:
        return {
            ...state,
            bmpTypes: state.bmpTypes.map(bmpType => {
                if (bmpType.id === action.bmpType.id) {
                    return {
                        ...bmpType,
                        visibility: action.isVisible
                    };
                }
                return bmpType;
            })
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
    case SET_MENU_GROUP:
        if (action.payload) {
            return {
                ...state,
                visibleBmpManager: false
            };
        }
        return state;
    case SHOW_BMP_MANAGER:
        return {
            ...state,
            visibleBmpManager: true
        };
    case HIDE_BMP_MANAGER:
        return {
            ...state,
            visibleBmpManager: false
        };
    case TOGGLE_BMP_MANAGER:
        return {
            ...state,
            visibleBmpManager: !state.visibleBmpManager
        };
    case SHOW_SWAMM_DATA_GRID:
        return {
            ...state,
            visibleSwammDataGrid: true
        };
    case HIDE_SWAMM_DATA_GRID:
        return {
            ...state,
            visibleSwammDataGrid: false
        };
    case SHOW_SWAMM_BMP_CHART:
        return {
            ...state,
            visibleSwammBmpChart: true
        };
    case HIDE_SWAMM_BMP_CHART:
        return {
            ...state,
            visibleSwammBmpChart: false
        };
    case SHOW_BMP_FORM:
        return {
            ...state,
            visibleBmpForm: true
        };
    case MAKE_BMP_FORM:
        return {
            ...state,
            creatingNewBmp: true,
            visibleBmpForm: true,
            storedBmpForm: {
                organisation: '',
                bmpName: ''
            }
        };
    case MAKE_DEFAULTS_BMP_FORM:
        const defaultsForm = {
            // ...action.bmpType,
            id: null,
            type: action.bmpType.id,
            type_data: action.bmpType,
            project: action.bmpType.project.id,
            // organisation: null,
            override_n_redratio: action.bmpType.n_redratio,
            override_p_redratio: action.bmpType.p_redratio,
            override_s_redratio: action.bmpType.s_redratio,
            override_cost_base: action.bmpType.cost_base,
            override_cost_rate_per_watershed_area: action.bmpType.cost_rate_per_watershed_area,
            override_cost_rate_per_footprint_area: action.bmpType.cost_rate_per_footprint_area,
            notes: ''
        };
        return {
            ...state,
            storedBmpForm: {
                ...state.storedBmpForm,
                ...defaultsForm
            }
        };
    case MAKE_EXISTING_BMP_FORM:
        const existingForm = {
            ...action.bmp,
            id: action.bmp.id,
            bmpName: action.bmp.type_data.name,
            type: action.bmp.type_data.id,
            type_data: action.bmp.type_data,
            project: action.bmp.project,
            organisation: action.bmp.type_data.organisation,
            override_n_redratio: action.bmp.override_n_redratio,
            override_p_redratio: action.bmp.override_p_redratio,
            override_s_redratio: action.bmp.override_s_redratio,
            override_cost_base: action.bmp.override_cost_base,
            override_cost_rate_per_watershed_area: action.bmp.override_cost_rate_per_watershed_area,
            override_cost_rate_per_footprint_area: action.bmp.override_cost_rate_per_footprint_area,
            notes: ''
        };
        return {
            ...state,
            storedBmpForm: existingForm,
            updatingBmp: null
        };
    case HIDE_BMP_FORM:
        return {
            ...state,
            visibleBmpForm: false
        };
    case CLEAR_BMP_FORM:
        return {
            ...state,
            creatingNewBmp: false,
            storedBmpForm: null,
            BmpFormBmpTypeId: null,
            visibleBmpForm: false,
            updatingBmp: null
        };
    case SUBMIT_BMP_FORM_SUCCESS:
        return {
            ...state,
            showSubmitBmpFormSuccess: true
        };
    case SUBMIT_BMP_FORM_ERROR:
        return {
            ...state,
            showSubmitBmpFormError: true
        };
    case CLEAR_SUBMIT_BMP_FORM_ERROR:
        return {
            ...state,
            showSubmitBmpFormError: false
        };
    case UPDATE_BMP_FORM:
        if (action?.kv?.type_data?.id) {
            return {
                ...state,
                BmpFormBmpTypeId: action.kv.type_data.id
            };
        }
        return  {
            ...state,
            storedBmpForm: {
                ...state.storedBmpForm,
                ...action.kv
            }
        };
    case QUERY_RESULT:
        if (action.reason === 'queryGetNewBmpId') {
            console.log('reducer queryGetNewBmpId got action: ', action);
            let queryGetNewBmpId = null;
            let shapeId = null;
            const ids = action.result.features.map(feature => feature.id);
            // TODO: It would be much better to get this Id from the WFS response XML,
            //  rather than assume it's the largest one.
            queryGetNewBmpId = ids.pop();
            console.log('reducer queryGetNewBmpId: ', queryGetNewBmpId);
            switch (queryGetNewBmpId.split("_")[3].split(".")[0]) {
            case "outlet":
                shapeId = {outlet_fid: queryGetNewBmpId};
                break;
            case "footprint":
                shapeId = {footprint_fid: queryGetNewBmpId};
                break;
            case "watershed":
                shapeId = {watershed_fid: queryGetNewBmpId};
                break;
            default:
                shapeId = {};
            }
            console.log('reducer shapeId: ', shapeId);
            return {
                ...state,
                storedBmpForm: {
                    ...state.storedBmpForm,
                    ...shapeId
                }
            };
        }
        return state;
    case SET_DRAWING_BMP:
        let drawingBmp = false;
        if (action.layerName !== state.drawingBmp) {
            drawingBmp = action.layerName;
        }
        return {
            ...state,
            drawingBmp: drawingBmp
        };
    default:
        return state;
    }
};
