import React from 'react';
import {connect} from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../../selectors/map');
import {Button} from "react-bootstrap";
import {
} from "../actionsBmwhi";
import {bmwhiFormForm} from "./bmwhiForm";
import {changeLayerProperties} from "../../../actions/layers";
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";

class BmwhiContainer extends React.Component {
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
            <div id={"bmwhi-container"}>
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


export default connect(mapStateToProps, mapDispatchToProps)(BmwhiContainer);
