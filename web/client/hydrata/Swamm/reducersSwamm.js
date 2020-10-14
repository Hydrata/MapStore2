import {
    FETCH_SWAMM_BMPTYPES_SUCCESS,
    FETCH_SWAMM_BMPTYPES,
    FETCH_SWAMM_ALL_BMPS_SUCCESS,
    TOGGLE_OUTLETS,
    TOGGLE_FOOTPRINTS,
    TOGGLE_WATERSHEDS,
    TOGGLE_BMP_TYPE,
    SHOW_CREATE_BMP_FORM,
    HIDE_CREATE_BMP_FORM
} from "./actionsSwamm";

const initialState = {
    showOutlets: true,
    showFootprints: true,
    showWatersheds: true,
    bmpTypes: [],
    visibleBmpCreateForm: false
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
        const updatedOutlets = action.layers.flat.forEach((layer) => {
            if (layer?.name.includes('_outlet')) {
                layer.visibility = !state.showOutlets;
            }
        });
        return {
            ...state,
            showOutlets: !state.showOutlets,
            layers: {
                ...state.layers,
                flat: updatedOutlets
            }
        };
    case TOGGLE_FOOTPRINTS:
        const updatedFootprints = action.layers.flat.forEach((layer) => {
            if (layer?.name.includes('_footprint')) {
                layer.visibility = !state.showFootprints;
            }
        });
        return {
            ...state,
            showFootprints: !state.showFootprints,
            layers: {
                ...state.layers,
                flat: updatedFootprints
            }
        };
    case TOGGLE_WATERSHEDS:
        const updatedWaterSheds = action.layers.flat.forEach((layer) => {
            if (layer?.name.includes('_watersheds')) {
                layer.visibility = !state.showWatersheds;
            }
        });
        return {
            ...state,
            showWatersheds: !state.showWatersheds,
            layers: {
                ...state.layers,
                flat: updatedWaterSheds
            }
        };
    case SHOW_CREATE_BMP_FORM:
        return {
            ...state,
            visibleBmpCreateForm: true,
            BmpCreateFormBmpTypeId: action.bmpTypeId
        };
    case HIDE_CREATE_BMP_FORM:
        return {
            ...state,
            visibleBmpCreateForm: false
        };
    default:
        return state;
    }
};
