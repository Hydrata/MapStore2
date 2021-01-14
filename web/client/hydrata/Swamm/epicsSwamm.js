import Rx from "rxjs";
import {
    QUERY_RESULT,
    query,
    FEATURE_TYPE_LOADED,
    FEATURE_TYPE_SELECTED,
    resetQuery
} from "../../actions/wfsquery";
import {
    clearDrawingBmpLayerName, CLEAR_DRAWING_BMP_LAYER_NAME,
    // startDrawingBmp, START_DRAWING_BMP,
    hideBmpForm,
    submitBmpForm,
    clearEditingBmpFeatureId, CLEAR_EDITING_BMP_FEATURE_ID,
    createBmpFeatureId
} from "./actionsSwamm";
import {
    toggleEditMode,
    toggleViewMode,
    createNewFeatures,
    startDrawingFeature,
    selectFeatures,
    SAVE_SUCCESS
} from "../../actions/featuregrid";
import {
    drawStopped
} from "../../actions/draw";
import { setHighlightFeaturesPath } from "../../actions/highlight";

export const setBmpDrawingLayerEpic = (action$, store) =>
    action$.ofType(FEATURE_TYPE_LOADED)
        .filter((action) => {
            console.log('setBmpDrawingLayerEpic1a', store.getState()?.projectManager?.data?.code + '_bmp_');
            console.log('setBmpDrawingLayerEpic1b', action?.typeName);
            console.log('setBmpDrawingLayerEpic1', action?.typeName.includes(store.getState()?.projectManager?.data?.code + '_bmp_'));
            return action?.typeName.includes(store.getState()?.projectManager?.data?.code + '_bmp_');
        })
        .flatMap((action) => Rx.Observable.of(
            query(
                'http://localhost:8080/geoserver/wfs',
                {
                    featureTypeName: action?.typeName,
                    filterType: 'OGC',
                    ogcVersion: '1.1.0'
                },
                {},
                'querySetNewBmpLayer'
            )
        ));

export const setBmpEditingLayerEpic = (action$, store) =>
    action$.ofType(FEATURE_TYPE_SELECTED)
        .filter((action) => {
            debugger;
            console.log('setBmpEditingLayerEpic1a', (store.getState()?.projectManager?.data?.code + '_bmp_'));
            console.log('setBmpEditingLayerEpic1b', action?.typeName);
            console.log('setBmpEditingLayerEpic1', action?.typeName.includes((store.getState()?.projectManager?.data?.code + '_bmp_')));
            return action?.typeName.includes(store.getState()?.projectManager?.data?.code + '_bmp_');
        })
        .filter(() => {
            console.log('setBmpEditingLayerEpic2', store.getState()?.swamm?.editingBmpFeatureId);
            return store.getState()?.swamm?.editingBmpFeatureId;
        })
        .flatMap((action) => Rx.Observable.of(
            query(
                'http://localhost:8080/geoserver/wfs',
                {
                    featureTypeName: action?.typeName,
                    filterType: 'OGC',
                    ogcVersion: '1.1.0'
                },
                {},
                'querySetNewBmpLayer'
            )
        ));

export const startBmpCreateFeatureEpic = (action$, store) =>
    action$.ofType(QUERY_RESULT)
        .filter(() => {
            console.log('startBmpCreateFeatureEpic1', !store.getState()?.swamm?.editingBmpFeatureId);
            return !store.getState()?.swamm?.editingBmpFeatureId;
        })
        .filter((action) => {
            console.log('startBmpCreateFeatureEpic2', action?.filterObj?.featureTypeName === store.getState()?.swamm?.drawingBmpLayerName);
            return action?.filterObj?.featureTypeName === store.getState()?.swamm?.drawingBmpLayerName;
        })
        .filter(action => {
            console.log('startBmpCreateFeatureEpic3', action?.reason === 'querySetNewBmpLayer');
            return action?.reason === 'querySetNewBmpLayer';
        })
        .flatMap(() => Rx.Observable.of(
            toggleEditMode(),
            // setDrawingBmpLayerName(action?.filterObj?.featureTypeName),
            // startDrawingBmp(),
            createNewFeatures([{}]),
            startDrawingFeature(),
            setHighlightFeaturesPath('draw.tempFeatures'),
            hideBmpForm(),
            resetQuery()
        ));

export const finishBmpCreateFeatureEpic = (action$, store) =>
    action$.ofType(QUERY_RESULT)
        .filter(() => {
            console.log('finishBmpCreateFeatureEpic1', !store.getState()?.swamm?.editingBmpFeatureId);
            return !store.getState()?.swamm?.editingBmpFeatureId;
        })
        .filter(action => {
            console.log('finishBmpCreateFeatureEpic2', action?.reason === 'queryGetNewBmpId');
            return action?.reason === 'queryGetNewBmpId';
        })
        .flatMap((action) => Rx.Observable.of(
            createBmpFeatureId(action),
            resetQuery()
        ));

export const startBmpEditFeatureEpic = (action$, store) =>
    action$.ofType(QUERY_RESULT)
        .filter(() => {
            console.log('startBmpEditFeatureEpic1', store.getState()?.swamm?.editingBmpFeatureId);
            return store.getState()?.swamm?.editingBmpFeatureId;
        })
        .filter(action => {
            console.log('startBmpEditFeatureEpic2', action?.reason === 'querySetNewBmpLayer');
            return action?.reason === 'querySetNewBmpLayer';
        })
        .flatMap(() => Rx.Observable.of(
            selectFeatures(store.getState()?.query?.result?.features.filter((feature) => feature?.id === store.getState()?.swamm?.editingBmpFeatureId)),
            toggleEditMode(),
            hideBmpForm(),
            resetQuery()
        ));


// export const startBmpCreateDrawFeatureEpic = (action$) =>
//     action$.ofType(START_DRAWING_BMP)
//         .flatMap(() => Rx.Observable.of(
//             console.log('startBmpCreateDrawFeatureEpic'),
//             createNewFeatures([{}]),
//             startDrawingFeature(),
//             setHighlightFeaturesPath('draw.tempFeatures')
//         ));

export const saveBmpCreateFeatureEpic = (action$, store) =>
    action$.ofType(SAVE_SUCCESS)
        .filter(() => {
            console.log('saveBmpCreateFeatureEpic', store.getState()?.swamm?.drawingBmpLayerName);
            return store.getState()?.swamm?.drawingBmpLayerName;
        })
        .flatMap(() => Rx.Observable.of(
            query('http://localhost:8080/geoserver/wfs',
                {
                    featureTypeName: store.getState()?.swamm?.drawingBmpLayerName,
                    filterType: 'OGC',
                    ogcVersion: '1.1.0',
                    pagination: {maxFeatures: 2000000}
                },
                {},
                'queryGetNewBmpId'
            ),
            clearDrawingBmpLayerName(),
            drawStopped(),
            toggleViewMode(),
            setHighlightFeaturesPath('highlight.emptyFeatures'),
            // submitBmpForm(store.getState()?.swamm?.storedBmpForm, store.getState()?.projectManager?.data?.base_map)
        ));

export const saveBmpEditFeatureEpic = (action$, store) =>
    action$.ofType(SAVE_SUCCESS)
        .filter(() => {
            console.log('saveBmpEditFeatureEpic', store.getState()?.swamm?.editingBmpFeatureId);
            return store.getState()?.swamm?.editingBmpFeatureId;
        })
        .flatMap(() => Rx.Observable.of(
            clearEditingBmpFeatureId(),
            drawStopped(),
            toggleViewMode(),
            setHighlightFeaturesPath('highlight.emptyFeatures'),
            // submitBmpForm(store.getState()?.swamm?.storedBmpForm, store.getState()?.projectManager?.data?.base_map)
        ));

export const autoSaveBmpFormEpic = (action$, store) =>
    action$.ofType(CLEAR_EDITING_BMP_FEATURE_ID, CLEAR_DRAWING_BMP_LAYER_NAME)
        .flatMap(() => Rx.Observable.of(
            submitBmpForm(store.getState()?.swamm?.storedBmpForm, store.getState()?.projectManager?.data?.base_map)
        ));
