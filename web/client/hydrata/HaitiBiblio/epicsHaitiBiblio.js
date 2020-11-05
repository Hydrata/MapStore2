import Rx from "rxjs";
import { LOAD_FEATURE_INFO } from "../../actions/mapInfo";


export const setBmpDrawingLayer = (action$, store) =>
    action$.ofType(LOAD_FEATURE_INFO)
        .filter(action => {
            const state = store.getState();
            console.log('epic LOAD_FEATURE_INFO', action, state);
            return action;
        })
        .flatMap((action) => Rx.Observable.of(
            console.log('Rx observable:', action)
        ));
