import React from 'react';
import { connect } from 'react-redux';
const { bindActionCreators } = require('redux');
import { createPlugin } from '../../utils/PluginsUtils';
import projectManager from "../reducers/projectManager";
const {mapIdSelector} = require('../../selectors/map');
import fetchProjectManagerConfig from "../actions/projectManager";

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            currentState: "not-panic"
        };
    }

    render() {
        return (
            <div>
                <h1>YayBalls!</h1>
                <h1>{this.props.layers}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        layers: state?.layers?.flat.map(layer => layer.name),
        myThing: 101
    };
};

const ConnectedComponent = connect(
    mapStateToProps
)(Component);

export default createPlugin('ProjectManager', {
    component: ConnectedComponent,
    reducers: {
        projectManager
    }
});
