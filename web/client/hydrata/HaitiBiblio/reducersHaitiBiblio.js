import {

} from "./actionsHaitiBiblio";
import { LOAD_FEATURE_INFO } from "../../actions/mapInfo";

const initialState = {
};

export default ( state = initialState, action) => {
    switch (action.type) {
    case LOAD_FEATURE_INFO:
        return state;
    default:
        return state;
    }
};
