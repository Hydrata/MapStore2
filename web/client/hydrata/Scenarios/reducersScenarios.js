import {
    FETCH_SCENARIOS_CONFIG_SUCCESS,
    FETCH_SCENARIOS_CONFIG,
    FETCH_SCENARIO_OVERVIEW_SUCCESS,
    FETCH_SCENARIO_OVERVIEW,
    SHOW_SCENARIO_MANAGER,
    HIDE_SCENARIO_MANAGER,
    SHOW_SCENARIO_OVERVIEW,
    HIDE_SCENARIO_OVERVIEW

} from "./actionsScenarios";

export default ( state = {}, action) => {
    switch (action.type) {
    case FETCH_SCENARIOS_CONFIG:
        return {
            ...state,
            fetching: action.mapId
        };
    case FETCH_SCENARIOS_CONFIG_SUCCESS:
        return {
            ...state,
            fetching: null,
            hasScenarioConfig: true,
            config: action.payload
        };
    case FETCH_SCENARIO_OVERVIEW:
        return {
            ...state,
            fetchingOverview: action.mapId
        };
    case FETCH_SCENARIO_OVERVIEW_SUCCESS:
        return {
            ...state,
            fetchingOverview: null,
            hasScenarioOverview: true,
            scenarioOverview: {
                ...state?.scenarioOverview,
                scenarios: action.data
            }
        };
    case SHOW_SCENARIO_MANAGER:
        return {
            ...state,
            visibleScenarioManager: true
        };
    case HIDE_SCENARIO_MANAGER:
        return {
            ...state,
            visibleScenarioManager: false
        };
    case SHOW_SCENARIO_OVERVIEW:
        return {
            ...state,
            visibleScenarioOverview: true,
            scenarioOverview: {
                ...state.scenarioOverview,
                title: action?.title,
                slug: action?.slug
            }
        };
    case HIDE_SCENARIO_OVERVIEW:
        return {
            ...state,
            visibleScenarioOverview: false,
            scenarioOverview: {
                ...state.scenarioOverview,
                title: null,
                slug: null,
                scenarios: []
            }
        };
    default:
        return state;
    }
};
