import Rx from "rxjs";
import {QUERY_RESULT, query} from "../../actions/wfsquery";
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

export const setBmpDrawingFeature = (action$) =>
    action$.ofType(QUERY_RESULT)
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
            startDrawingFeature()
        ));

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
            setDrawingBmp(null)
        ));
