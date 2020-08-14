import { SET_PROJECT_CONFIG } from "../actions/projectManager";

export default ( state = {}, action) => {
    switch (action.type) {
    case SET_PROJECT_CONFIG:
        return {
            ...state,
            something: 'something',
            projectConfig: action.projectConfig
        };
    default:
        return state;
    }
};
