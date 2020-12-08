import Rx from "rxjs";
import {QUERY_RESULT, query, FEATURE_TYPE_LOADED} from "../../actions/wfsquery";
import {
    setDrawingBmp, SET_DRAWING_BMP,
    hideBmpForm, submitBmpForm, selectBmpFeatureFromId
} from "./actionsSwamm";
import {
    toggleEditMode,
    createNewFeatures,
    startDrawingFeature,
    selectFeatures,
    SAVE_SUCCESS
} from "../../actions/featuregrid";
import { setHighlightFeaturesPath } from "../../actions/highlight";

export const setBmpDrawingLayerEpic = (action$, store) =>
    action$.ofType(FEATURE_TYPE_LOADED)
        .filter(action => action?.typeName.includes(store.getState()?.swamm?.storedBmpForm?.type_data?.full_code))
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

export const setBmpEditFeatureEpic = (action$, store) =>
    action$.ofType(QUERY_RESULT)
        // .filter(() => store.getState()?.editingFeatureId)
        .filter(action => {
            console.log('setBmpEditFeature: ', store.getState()?.swamm?.editingFeatureId);
            console.log('setBmpEditFeature feature: ', store.getState()?.query?.result?.features.filter((feature) => feature?.id === store.getState()?.swamm?.editingFeatureId)[0]);
            // store.getState()?.query?.result?.features.filter((feature) => feature?.id === store.getState()?.swamm?.editingFeatureId)[0];
            console.log('setBmpEditFeature test:', action?.reason === 'querySetNewBmpLayer');
            return action?.reason === 'querySetNewBmpLayer';
        })
        // .pipe(() => Rx.Observable.forkJoin(
        //     store.getState()?.query?.result?.features.filter((feature) => feature?.id === store.getState()?.swamm?.editingFeatureId)[0]
        // ))
        // .flatMap(([bmpFeature]) => Rx.Observable.of(
        //     toggleEditMode(),
        //     selectFeatures(bmpFeature),
        //     hideBmpForm()
        // ));

export const setBmpDrawingFeatureEpic = (action$, store) =>
    action$.ofType(QUERY_RESULT)
        .filter(() => {
            console.log('setBmpDrawingFeature: ', store.getState()?.swamm?.editingFeatureId);
            return !store.getState()?.swamm?.editingFeatureId;
        })
        .filter(action => {
            return action?.reason === 'querySetNewBmpLayer';
        })
        .flatMap((action) => Rx.Observable.of(
            toggleEditMode(),
            setDrawingBmp(action?.filterObj?.featureTypeName),
            hideBmpForm()
        ));


export const startBmpDrawingEpic = (action$) =>
    action$.ofType(SET_DRAWING_BMP)
        .flatMap(() => Rx.Observable.of(
            createNewFeatures([{}]),
            startDrawingFeature(),
            setHighlightFeaturesPath('draw.tempFeatures')
        ));

export const saveBmpDrawingFeatureEpic = (action$, store) =>
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
            setHighlightFeaturesPath('highlight.emptyFeatures'),
            submitBmpForm(store.getState()?.swamm?.storedBmpForm, store.getState()?.projectManager?.data?.base_map)
        ));
