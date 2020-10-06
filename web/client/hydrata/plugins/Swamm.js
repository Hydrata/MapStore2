import { createPlugin } from '../../utils/PluginsUtils';
import swamm from "../reducers/swamm";
import SwammContainer from "../components/swammContainer";

export default createPlugin('Swamm', {
    component: SwammContainer,
    reducers: {
        swamm
    }
});
