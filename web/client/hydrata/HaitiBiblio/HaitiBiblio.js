import { createPlugin } from '../../utils/PluginsUtils';
import reducersHaitiBiblio from "./reducersHaitiBiblio";
import HaitiBiblioContainer from "./components/haitiBiblioContainer";
import { catchBiblioLayerClick } from "./epicsHaitiBiblio";

export default createPlugin('HaitiBiblio', {
    component: HaitiBiblioContainer,
    reducers: {reducersHaitiBiblio},
    epics: { catchBiblioLayerClick }
});
