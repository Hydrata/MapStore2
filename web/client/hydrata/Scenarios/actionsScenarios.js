const axios = require('../../libs/ajax');

const FETCH_SCENARIOS_CONFIG = 'FETCH_SCENARIOS_CONFIG';
const FETCH_SCENARIOS_CONFIG_ERROR = 'FETCH_SCENARIOS_CONFIG_ERROR';
const FETCH_SCENARIOS_CONFIG_SUCCESS = 'FETCH_SCENARIOS_CONFIG_SUCCESS';
const FETCH_SCENARIO_OVERVIEW = 'FETCH_SCENARIO_OVERVIEW';
const FETCH_SCENARIO_OVERVIEW_ERROR = 'FETCH_SCENARIO_OVERVIEW_ERROR';
const FETCH_SCENARIO_OVERVIEW_SUCCESS = 'FETCH_SCENARIO_OVERVIEW_SUCCESS';
const SHOW_SCENARIO_MANAGER = 'SHOW_SCENARIO_MANAGER';
const HIDE_SCENARIO_MANAGER = 'HIDE_SCENARIO_MANAGER';
const SHOW_SCENARIO_OVERVIEW = 'SHOW_SCENARIO_OVERVIEW';
const HIDE_SCENARIO_OVERVIEW = 'HIDE_SCENARIO_OVERVIEW';

const fetchScenariosConfigSuccess = (config) => {
    return {
        type: FETCH_SCENARIOS_CONFIG_SUCCESS,
        payload: config
    };
};

function fetchScenariosConfigError(e) {
    console.log('*** error:', e);
    return {
        type: FETCH_SCENARIOS_CONFIG_ERROR,
        error: e
    };
}

const fetchScenariosConfig = (dispatch) => {
    return (mapId) => {
        return axios.get(`/scenarios/api/${mapId}/config/`
        ).then(
            response => {
                dispatch(fetchScenariosConfigSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchScenariosConfigError(e));
            }
        );
    };
};

const fetchScenarioOverviewSuccess = (data) => {
    return {
        type: FETCH_SCENARIO_OVERVIEW_SUCCESS,
        data: data
    };
};

function fetchScenarioOverviewError(e) {
    console.log('*** error:', e);
    return {
        type: FETCH_SCENARIO_OVERVIEW_ERROR,
        error: e
    };
}

const fetchScenarioOverview = (mapId, scenarioSlug) => {
    console.log('fetchScenarioOverview', mapId, scenarioSlug);
    return (dispatch) => {
        return axios.get(`/scenarios/api/${mapId}/${scenarioSlug}/`
        ).then(
            response => {
                dispatch(fetchScenarioOverviewSuccess(response.data));
            }
        ).catch(
            e => {
                dispatch(fetchScenarioOverviewError(e));
            }
        );
    };
};

const showScenarioManager = () => {
    return {
        type: SHOW_SCENARIO_MANAGER
    };
};

const hideScenarioManager = () => {
    return {
        type: HIDE_SCENARIO_MANAGER
    };
};

const showScenarioOverview = (scen) => {
    return {
        type: SHOW_SCENARIO_OVERVIEW,
        slug: scen?.slug,
        title: scen?.title
    };
};

const hideScenarioOverview = () => {
    return {
        type: HIDE_SCENARIO_OVERVIEW
    };
};

module.exports = {
    FETCH_SCENARIOS_CONFIG, fetchScenariosConfig,
    FETCH_SCENARIOS_CONFIG_ERROR, fetchScenariosConfigError,
    FETCH_SCENARIOS_CONFIG_SUCCESS, fetchScenariosConfigSuccess,
    FETCH_SCENARIO_OVERVIEW, fetchScenarioOverview,
    FETCH_SCENARIO_OVERVIEW_ERROR, fetchScenarioOverviewError,
    FETCH_SCENARIO_OVERVIEW_SUCCESS, fetchScenarioOverviewSuccess,
    SHOW_SCENARIO_MANAGER, showScenarioManager,
    HIDE_SCENARIO_MANAGER, hideScenarioManager,
    SHOW_SCENARIO_OVERVIEW, showScenarioOverview,
    HIDE_SCENARIO_OVERVIEW, hideScenarioOverview
};
