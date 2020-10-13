import { createPlugin } from '../../utils/PluginsUtils';
import swamm from "./reducersSwamm";
import SwammContainer from "./components/swammContainer";

export default createPlugin('Swamm', {
    component: SwammContainer,
    reducers: {
        swamm
    }
});
