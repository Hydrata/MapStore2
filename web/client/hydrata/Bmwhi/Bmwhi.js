import { createPlugin } from '../../utils/PluginsUtils';
import reducersBmwhi from "./reducersBmwhi";
import BmwhiContainer from "./components/bmwhiContainer";
import {} from "./epicsBmwhi";

export default createPlugin('Bmwhi', {
    component: BmwhiContainer,
    reducers: {reducersBmwhi},
    epics: {}
});
