import Rx from "rxjs";
import {QUERY_RESULT, query, FEATURE_TYPE_LOADED} from "../../actions/wfsquery";


export const setBmpDrawingLayer = (action$, store) =>
    action$.ofType(FEATURE_TYPE_LOADED)
        .filter(action => {
            const state = store.getState();
            console.log('FEATURE_TYPE_LOADED', action, state);
            return action?.typeName.includes(state?.swamm?.storedBmpForm?.type_data?.code);
        })
        .flatMap((action) => Rx.Observable.of(
            query('http://localhost:8080/geoserver/wfs', {featureTypeName: action?.typeName, filterType: 'OGC', ogcVersion: '1.1.0'}, {}, 'querySetNewBmpLayer')
        ));
