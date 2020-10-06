const axios = require('../../libs/ajax');

const FETCH_SWAMM_CONFIG = 'FETCH_SWAMM_CONFIG';
const FETCH_SWAMM_CONFIG_ERROR = 'FETCH_SWAMM_CONFIG_ERROR';
const FETCH_SWAMM_CONFIG_SUCCESS = 'FETCH_SWAMM_CONFIG_SUCCESS';

const fetchSwammConfigSuccess = (config) => {
    return {
        type: FETCH_SWAMM_CONFIG_SUCCESS,
        payload: config
    };
};

function fetchSwammConfigError(e) {
    return {
        type: FETCH_SWAMM_CONFIG_ERROR,
        error: e
    };
}

const fetchSwammConfig = (dispatch) => {
    return (mapId) => {
        return axios.get(`/swamm/api/${mapId}/bmp-type/`
        ).then(
            response => {
                dispatch(fetchSwammConfigSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchSwammConfigError(e));
            }
        );
    };
};

module.exports = {
    FETCH_SWAMM_CONFIG, fetchSwammConfig,
    FETCH_SWAMM_CONFIG_ERROR, fetchSwammConfigError,
    FETCH_SWAMM_CONFIG_SUCCESS, fetchSwammConfigSuccess
};
