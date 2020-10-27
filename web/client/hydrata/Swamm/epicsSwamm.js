import Rx from "rxjs";
import {QUERY_RESULT} from "../../actions/wfsquery";
import {
    setDrawingBmp, SET_DRAWING_BMP,
    hideBmpForm
} from "./actionsSwamm";
import {
    toggleEditMode,
    createNewFeatures,
    startDrawingFeature
} from "../../actions/featuregrid";


export const setBmpDrawingFeature = (action$) =>
    action$.ofType(QUERY_RESULT)
        .filter(action => {
            return action?.reason === 'querySetNewBmpLayer';
        })
        .mergeMap((action) => Rx.Observable.of(
            toggleEditMode(),
            setDrawingBmp(action?.filterObj?.featureTypeName),
            hideBmpForm()
        ));


export const startBmpDrawingEpic = (action$) =>
    action$.ofType(SET_DRAWING_BMP)
        .mergeMap(() => Rx.Observable.of(
            createNewFeatures([{}]),
            startDrawingFeature()
        ));
