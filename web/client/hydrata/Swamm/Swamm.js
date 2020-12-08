import { createPlugin } from '../../utils/PluginsUtils';
import swamm from "./reducersSwamm";
import SwammContainer from "./components/swammContainer";
import {startBmpCreateFeatureEpic, startBmpDrawFeatureEpic, saveBmpDrawingFeatureEpic, setBmpDrawingLayerEpic, startBmpEditFeatureEpic} from "./epicsSwamm";

export default createPlugin('Swamm', {
    component: SwammContainer,
    reducers: {swamm},
    epics: {startBmpCreateFeatureEpic, startBmpDrawFeatureEpic, saveBmpDrawingFeatureEpic, setBmpDrawingLayerEpic, startBmpEditFeatureEpic}
});
