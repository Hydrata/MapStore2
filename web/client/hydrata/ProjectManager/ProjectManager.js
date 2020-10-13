import { createPlugin } from '../../utils/PluginsUtils';
import projectManager from "./reducersProjectManager";
import ConnectedProjectManagerContainer from "./components/projectManagerContainer";

export default createPlugin('ProjectManager', {
    component: ConnectedProjectManagerContainer,
    reducers: {
        projectManager
    }
});
