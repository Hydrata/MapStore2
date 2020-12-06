import Rx from "rxjs";
import {QUERY_RESULT, query, FEATURE_TYPE_LOADED} from "../../actions/wfsquery";
import {
    setDrawingBmp, SET_DRAWING_BMP,
    hideBmpForm
} from "./actionsSwamm";
import {
    toggleEditMode,
    createNewFeatures,
    startDrawingFeature,
    SAVE_SUCCESS
} from "../../actions/featuregrid";
import { setHighlightFeaturesPath } from "../../actions/highlight";

export const setBmpDrawingLayer = (action$, store) =>
    action$.ofType(FEATURE_TYPE_LOADED)
        .filter(action => {
            const state = store.getState();
            return action?.typeName.includes(state?.swamm?.storedBmpForm?.type_data?.full_code);
        })
        .flatMap((action) => Rx.Observable.of(
            console.log('setBmpDrawingLayer2'),
            query('http://localhost:8080/geoserver/wfs', {featureTypeName: action?.typeName, filterType: 'OGC', ogcVersion: '1.1.0'}, {}, 'querySetNewBmpLayer')
        ));

// export const setBmpEditingLayer = (action$, store) =>
//     action$.ofType(FEATURE_TYPE_LOADED)
//         .filter(() => {
//             const state = store.getState();
//             return state?.swamm?.editingBmpFeatureId;
//         })
//         .flatMap((action) => Rx.Observable.of(
//             console.log('setBmpEditingLayer done:', action),
//             // query('http://localhost:8080/geoserver/wfs', {featureTypeName: action?.typeName, filterType: 'OGC', ogcVersion: '1.1.0'}, {}, 'querySetEditBmpFeature')
//         ));

export const setBmpDrawingFeature = (action$) =>
    action$.ofType(QUERY_RESULT)
        .filter(action => {
            console.log('heard querySetNewBmpLayer', action);
            return action?.reason === 'querySetNewBmpLayer';
        })
        .flatMap((action) => Rx.Observable.of(
            toggleEditMode(),
            setDrawingBmp(action?.filterObj?.featureTypeName),
            hideBmpForm()
        ));

// export const setBmpEditingFeature = (action$) =>
//     action$.ofType(QUERY_RESULT)
//         .filter(action => {
//             return action?.reason === 'querySetEditBmpFeature';
//         })
//         .flatMap((action) => Rx.Observable.of(
//             console.log('QUERY_RESULT heard querySetEditBmpFeature', action),
//             toggleEditMode(),
//             // setEditingBmp(action?.),
//             hideBmpForm()
//         ));


export const startBmpDrawingEpic = (action$) =>
    action$.ofType(SET_DRAWING_BMP)
        .flatMap(() => Rx.Observable.of(
            createNewFeatures([{}]),
            startDrawingFeature(),
            setHighlightFeaturesPath('draw.tempFeatures')
        ));

//
// export const startBmpEditingEpic = (action$) =>
//     action$.ofType(SET_EDITING_BMP)
//         .flatMap((action) => Rx.Observable.of(
//             console.log('startBmpEditingEpic', action),
//             // startEditingFeature(action?.),
//             setHighlightFeaturesPath('draw.tempFeatures')
//         ));

export const saveBmpDrawingFeature = (action$, store) =>
    action$.ofType(SAVE_SUCCESS)
        .filter(() => store.getState()?.swamm?.drawingBmp)
        .flatMap(() => Rx.Observable.of(
            query('http://localhost:8080/geoserver/wfs',
                {
                    featureTypeName: store.getState()?.swamm?.drawingBmp,
                    filterType: 'OGC',
                    ogcVersion: '1.1.0',
                    pagination: {maxFeatures: 2000000}
                },
                {},
                'queryGetNewBmpId'
            ),
            setDrawingBmp(null),
            setHighlightFeaturesPath('highlight.emptyFeatures')
        ));
