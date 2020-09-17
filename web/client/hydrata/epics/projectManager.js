// const axios = require('../../libs/ajax');
// const Rx = require("rxjs");
// const {
//     FETCH_PROJECT_MANAGER_CONFIG,
//     // FETCH_PROJECT_MANAGER_CONFIG_ERROR,
//     // FETCH_PROJECT_MANAGER_CONFIG_SUCCESS,
//     fetchProjectManagerConfigError,
//     fetchProjectManagerConfigSuccess
// } = require('../../hydrata/actions/projectManager');
//
//
// // const fetchProjectManagerConfig = (action$) => {
// //     debugger;
// //     return action$.ofType(FETCH_PROJECT_MANAGER_CONFIG)
// //         .switchMap(() => {
// //             return Rx.Observable.defer(() => axios.get(`/projects/api/maps/242/`)
// //                 .switchMap((response) => Rx.Observable.of(fetchProjectManagerConfigSuccess(response.data.project)))
// //                 .catch(e => Rx.Observable.of(fetchProjectManagerConfigError(e.message))));
// //         });
// // };
//
// function fetchProjectManagerConfig(mapId) {
//     return { type: FETCH_PROJECT_MANAGER_CONFIG, mapId };
// }
//
// module.exports = {
//     fetchProjectManagerConfig
// };
