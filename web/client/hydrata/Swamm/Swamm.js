import { createPlugin } from '../../utils/PluginsUtils';
import swamm from "./reducersSwamm";
import SwammContainer from "./components/swammContainer";
import {
    startBmpCreateFeatureEpic,
    setBmpEditingLayerEpic,
    saveBmpCreateFeatureEpic,
    setBmpDrawingLayerEpic,
    startBmpEditFeatureEpic,
    saveBmpEditFeatureEpic,
    finishBmpCreateFeatureEpic,
    autoSaveBmpFormEpic,
    showBmpFeatureGridEpic
} from "./epicsSwamm";

export default createPlugin('Swamm', {
    component: SwammContainer,
    reducers: {swamm},
    epics: {
        startBmpCreateFeatureEpic,
        setBmpEditingLayerEpic,
        saveBmpCreateFeatureEpic,
        setBmpDrawingLayerEpic,
        startBmpEditFeatureEpic,
        saveBmpEditFeatureEpic,
        finishBmpCreateFeatureEpic,
        autoSaveBmpFormEpic,
        showBmpFeatureGridEpic
    }
});
