import { createPlugin } from '../../utils/PluginsUtils';
import networks from "./reducersNetworks";
import NetworksContainer from "./components/networksContainer";

export default createPlugin('Networks', {
    component: NetworksContainer,
    reducers: {
        networks
    }
});
