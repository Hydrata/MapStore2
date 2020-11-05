import React from 'react';
import {connect} from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../../selectors/map');
import {Button} from "react-bootstrap";
import {
} from "../actionsHaitiBiblio";
import {HaitiBiblioForm} from "./haitiBiblioForm";
import {changeLayerProperties} from "../../../actions/layers";
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";

class HaitiBiblioContainer extends React.Component {
    static propTypes = {
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div id={"haiti-biblio-container"}>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state)
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HaitiBiblioContainer);
