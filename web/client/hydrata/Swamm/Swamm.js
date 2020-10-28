import { createPlugin } from '../../utils/PluginsUtils';
import swamm from "./reducersSwamm";
import SwammContainer from "./components/swammContainer";
import {setBmpDrawingFeature, startBmpDrawingEpic, saveBmpDrawingFeature, setBmpDrawingLayer} from "./epicsSwamm";

export default createPlugin('Swamm', {
    component: SwammContainer,
    reducers: {swamm},
    epics: {setBmpDrawingFeature, startBmpDrawingEpic, saveBmpDrawingFeature, setBmpDrawingLayer}
});
