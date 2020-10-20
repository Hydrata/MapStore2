import {
    FETCH_SWAMM_BMPTYPES_SUCCESS,
    FETCH_SWAMM_BMPTYPES,
    FETCH_SWAMM_ALL_BMPS_SUCCESS,
    TOGGLE_OUTLETS,
    TOGGLE_FOOTPRINTS,
    TOGGLE_WATERSHEDS,
    TOGGLE_BMP_TYPE,
    SHOW_CREATE_BMP_FORM,
    HIDE_CREATE_BMP_FORM,
    MAKE_CREATE_BMP_FORM,
    CLEAR_CREATE_BMP_FORM,
    MAKE_DEFAULTS_CREATE_BMP_FORM,
    UPDATE_CREATE_BMP_FORM,
    SET_DRAWING_BMP
} from "./actionsSwamm";

import {QUERY_RESULT} from "../../actions/wfsquery";

const initialState = {
    showOutlets: true,
    showFootprints: true,
    showWatersheds: true,
    bmpTypes: [],
    visibleBmpCreateForm: false,
    drawingBmp: false
};

export default ( state = initialState, action) => {
    switch (action.type) {
    case FETCH_SWAMM_BMPTYPES:
        return {
            ...state,
            fetching: action.mapId
        };
    case FETCH_SWAMM_BMPTYPES_SUCCESS:
        const newBmpTypes = action.bmpTypes.map(function(bmpType) {
            bmpType.visibility = false;
            bmpType.code = bmpType.project.code + '_' + bmpType.organisation.code + '_' + bmpType.code;
            return bmpType;
        });
        return {
            ...state,
            fetching: false,
            bmpTypes: newBmpTypes
        };
    case FETCH_SWAMM_ALL_BMPS_SUCCESS:
        return {
            ...state,
            fetching: false,
            allBmps: action.allBmps
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
    case SHOW_CREATE_BMP_FORM:
        return {
            ...state,
            visibleBmpCreateForm: true
        };
    case MAKE_CREATE_BMP_FORM:
        return {
            ...state,
            visibleBmpCreateForm: true,
            BmpCreateFormBmpTypeId: action.bmpTypeId
        };
    case MAKE_DEFAULTS_CREATE_BMP_FORM:
        const form = {
            ...action.bmpType,
            type: action.bmpType.id,
            project: action.bmpType.project.id,
            organisation: action.bmpType.organisation.id,
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
            storedBmpCreateForm: form
        };
    case HIDE_CREATE_BMP_FORM:
        return {
            ...state,
            visibleBmpCreateForm: false
        };
    case CLEAR_CREATE_BMP_FORM:
        return {
            ...state,
            storedBmpCreateForm: null,
            BmpCreateFormBmpTypeId: null,
            visibleBmpCreateForm: false
        };
    case UPDATE_CREATE_BMP_FORM:
        return {
            ...state,
            storedBmpCreateForm: {
                ...state.storedBmpCreateForm,
                ...action.kv
            }
        };
    case QUERY_RESULT:
        let queryGetNewBmpId = null;
        let shapeId = null;
        if (action.reason === 'queryGetNewBmpId') {
            const ids = action.result.features.map(feature => feature.id);
            // TODO: It would be much better to get this Id from the WFS response XML,
            //  rather than assume it's the largest one.
            queryGetNewBmpId = ids.pop();
            console.log('queryGetNewBmpId', queryGetNewBmpId);
            switch (queryGetNewBmpId.split("_")[3].split(".")[0]) {
            case "outlet":
                shapeId = {outlet_fid: parseInt(queryGetNewBmpId.split("_")[3].split(".")[1], 10)};
                break;
            case "footprint":
                shapeId = {footprint_fid: parseInt(queryGetNewBmpId.split("_")[3].split(".")[1], 10)};
                break;
            case "watershed":
                shapeId = {watershed_fid: parseInt(queryGetNewBmpId.split("_")[3].split(".")[1], 10)};
                break;
            default:
                shapeId = {};
            }
        }
        return {
            ...state,
            storedBmpCreateForm: {
                ...state.storedBmpCreateForm,
                ...shapeId
            }
        };
    case SET_DRAWING_BMP:
        let newState = false;
        if (action.layerName !== state.drawingBmp) {
            newState = action.layerName;
        }
        return {
            ...state,
            drawingBmp: newState
        };
    default:
        return state;
    }
};
