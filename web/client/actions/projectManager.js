import axios from '../libs/ajax';
export const SET_PROJECT_CONFIG = 'SET_PROJECT_CONFIG';

export const setProjectConfig = projectConfig => ({
    type: SET_PROJECT_CONFIG,
    projectConfig: projectConfig
});

export const getProjectConfig = (projectId)=> {
    return (dispatch) => {
        axios.get(`/projects/api/projects/${projectId}/`).then(
            response => {
                dispatch(setProjectConfig(response.data));
            }
        );
    };
};
