const axios = require('../../libs/ajax');

const FETCH_PROJECT_MANAGER_CONFIG = 'FETCH_PROJECT_MANAGER_CONFIG';
const FETCH_PROJECT_MANAGER_CONFIG_ERROR = 'FETCH_PROJECT_MANAGER_CONFIG_ERROR';
const FETCH_PROJECT_MANAGER_CONFIG_SUCCESS = 'FETCH_PROJECT_MANAGER_CONFIG_SUCCESS';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const fetchProjectManagerConfigSuccess = (config) => {
    return {
        type: FETCH_PROJECT_MANAGER_CONFIG_SUCCESS,
        payload: config
    };
};

function fetchProjectManagerConfigError(e) {
    return {
        type: FETCH_PROJECT_MANAGER_CONFIG_ERROR,
        error: e
    };
}

const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });
const reset = () => ({ type: 'RESET' });

const fetchProjectManagerConfig = (dispatch) => {
    return (mapId) => {
        return axios.get(`/projects/api/maps/${mapId}/`
        ).then(
            response => {
                dispatch(fetchProjectManagerConfigSuccess(response.data.project));
            }
        ).catch(
            e => {
                dispatch(fetchProjectManagerConfigError(e));
            }
        );
    };
};


module.exports = {
    FETCH_PROJECT_MANAGER_CONFIG, fetchProjectManagerConfig,
    FETCH_PROJECT_MANAGER_CONFIG_ERROR, fetchProjectManagerConfigError,
    FETCH_PROJECT_MANAGER_CONFIG_SUCCESS, fetchProjectManagerConfigSuccess,
    INCREMENT, increment,
    DECREMENT, decrement,
    RESET, reset
};
