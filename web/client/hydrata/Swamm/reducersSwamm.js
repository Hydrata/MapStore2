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
    TOGGLE_DRAWING_BMP
} from "./actionsSwamm";

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
        return {
            ...state,
            storedBmpCreateForm: action.bmpType
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
    case TOGGLE_DRAWING_BMP:
        return {
            ...state,
            drawingBmp: !state.drawingBmp
        };
    default:
        return state;
    }
};
