import Rx from "rxjs";
import {QUERY_RESULT, query, FEATURE_TYPE_LOADED} from "../../actions/wfsquery";
import {
    setDrawingBmp, clearDrawingBmp,
    startDrawingBmp, START_DRAWING_BMP,
    hideBmpForm, submitBmpForm
} from "./actionsSwamm";
import {
    toggleEditMode,
    createNewFeatures,
    startDrawingFeature,
    SAVE_SUCCESS
} from "../../actions/featuregrid";
import {
    drawStopped
} from "../../actions/draw";
import { setHighlightFeaturesPath } from "../../actions/highlight";

export const setBmpDrawingLayerEpic = (action$, store) =>
    action$.ofType(FEATURE_TYPE_LOADED)
        .filter(action => {
            const state = store.getState();
            return action?.typeName.includes(state?.swamm?.storedBmpForm?.type_data?.full_code);
        })
        .flatMap((action) => Rx.Observable.of(
            query('http://localhost:8080/geoserver/wfs', {featureTypeName: action?.typeName, filterType: 'OGC', ogcVersion: '1.1.0'}, {}, 'querySetNewBmpLayer')
        ));

export const startBmpCreateFeatureEpic = (action$) =>
    action$.ofType(QUERY_RESULT)
        .filter(action => {
            return action?.reason === 'querySetNewBmpLayer';
        })
        .flatMap((action) => Rx.Observable.of(
            toggleEditMode(),
            setDrawingBmp(action?.filterObj?.featureTypeName),
            startDrawingBmp(),
            hideBmpForm()
        ));


export const startBmpDrawFeatureEpic = (action$) =>
    action$.ofType(START_DRAWING_BMP)
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
            clearDrawingBmp(),
            drawStopped(),
            setHighlightFeaturesPath('highlight.emptyFeatures'),
            submitBmpForm(store.getState()?.swamm?.storedBmpForm, store.getState()?.projectManager?.data?.base_map)
        ));
