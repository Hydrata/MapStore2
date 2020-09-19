const axios = require('../../libs/ajax');

const FETCH_PROJECT_MANAGER_CONFIG = 'FETCH_PROJECT_MANAGER_CONFIG';
const FETCH_PROJECT_MANAGER_CONFIG_ERROR = 'FETCH_PROJECT_MANAGER_CONFIG_ERROR';
const FETCH_PROJECT_MANAGER_CONFIG_SUCCESS = 'FETCH_PROJECT_MANAGER_CONFIG_SUCCESS';
const SET_MENU_GROUP = 'SET_MENU_GROUP';

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

function setMenuGroup(menuGroup) {
    console.log(menuGroup);
    return {
        type: SET_MENU_GROUP,
        payload: menuGroup
    };
}

module.exports = {
    FETCH_PROJECT_MANAGER_CONFIG, fetchProjectManagerConfig,
    FETCH_PROJECT_MANAGER_CONFIG_ERROR, fetchProjectManagerConfigError,
    FETCH_PROJECT_MANAGER_CONFIG_SUCCESS, fetchProjectManagerConfigSuccess,
    SET_MENU_GROUP, setMenuGroup
};
