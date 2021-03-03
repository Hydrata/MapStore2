import { createPlugin } from '../../utils/PluginsUtils';
import projectManager from "./reducersProjectManager";
import projectManagerContainer from "./components/projectManagerContainer";

export default createPlugin('ProjectManager', {
    component: projectManagerContainer,
    reducers: {
        projectManager
    }
});
