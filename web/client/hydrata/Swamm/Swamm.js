import { createPlugin } from '../../utils/PluginsUtils';
import swamm from "./reducersSwamm";
import SwammContainer from "./components/swammContainer";
import {setBmpDrawingFeatureEpic, startBmpDrawingEpic, saveBmpDrawingFeatureEpic, setBmpDrawingLayerEpic, setBmpEditFeatureEpic} from "./epicsSwamm";

export default createPlugin('Swamm', {
    component: SwammContainer,
    reducers: {swamm},
    epics: {setBmpDrawingFeatureEpic, startBmpDrawingEpic, saveBmpDrawingFeatureEpic, setBmpDrawingLayerEpic, setBmpEditFeatureEpic}
});
