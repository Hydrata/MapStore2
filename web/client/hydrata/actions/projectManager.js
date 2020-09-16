const axios = require('../../libs/ajax');

const FETCH_PROJECT_MANAGER_CONFIG = 'FETCH_PROJECT_MANAGER_CONFIG';
const FETCH_PROJECT_MANAGER_CONFIG_ERROR = 'FETCH_PROJECT_MANAGER_CONFIG_ERROR';
const FETCH_PROJECT_MANAGER_CONFIG_SUCCESS = 'FETCH_PROJECT_MANAGER_CONFIG_SUCCESS';

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

const fetchProjectManagerConfig = () => {
    return (dispatch) => {
        axios.get(`/projects/api/maps/242/`
        ).then(
            response => {
                dispatch(fetchProjectManagerConfigSuccess(response.data.project));
            }
        ).catch((e) => {
            dispatch(fetchProjectManagerConfigError(e));
        });
    };
};


module.exports = {
    FETCH_PROJECT_MANAGER_CONFIG, fetchProjectManagerConfig,
    FETCH_PROJECT_MANAGER_CONFIG_SUCCESS, fetchProjectManagerConfigSuccess
};
