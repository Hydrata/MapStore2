import React from 'react';
import { connect } from 'react-redux';
const PropTypes = require('prop-types');
import { createPlugin } from '../../utils/PluginsUtils';
import projectManager from "../reducers/projectManager";
const {mapIdSelector} = require('../../selectors/map');
import { fetchProjectManagerConfig, increment, decrement, reset } from "../actions/projectManager";

class Component extends React.Component {
    static propTypes = {
        fetchProjectManagerConfig: PropTypes.func
    };

    static defaultProps = {
        fetchProjectManagerConfig: () => {},
        increment: () => {},
        decrement: () => {},
        reset: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            mapId: null,
            projectTitle: null,
            projectManager: {
                fetching: null,
                data: null
            }
        };
    }

    // componentDidMount() {
    //     this.props.increment();
    //     debugger;
    //     this.props.fetchProjectManagerConfig(this.props.mapId);
    // }

    componentDidUpdate() {
        // this.props.increment();
        if (this.props.mapId && !this.props.isFetching) {
            debugger;
        }
        if (this.props.mapId && !this.props.isFetching && !this.props.hasPmData) {
            this.props.fetchProjectManagerConfig(this.props.mapId);
        }
    }

    render() {
        return (
            <div style={{position: "absolute"}} id={"project-manager"}>
                <p>Yay2!</p>
                <p>{this.props.layers}</p>
                <p>{this.props.projectTitle}</p>
                {/*<button onClick={this.props.increment}>INCREMENT</button>*/}
                {/*<button onClick={() => this.props.dispatch({ type: 'DECREMENT' })}>DECREMENT</button>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        layers: state?.layers?.flat.map(layer => layer.name),
        projectTitle: state?.projectManager?.data?.title,
        isFetching: state?.projectManager?.fetching,
        hasPmData: state?.projectManager?.data
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        dispatch,
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        reset: () => dispatch(reset()),
        fetchProjectManagerConfig: fetchProjectManagerConfig(dispatch)
    };
};

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default createPlugin('ProjectManager', {
    component: ConnectedComponent,
    reducers: {
        projectManager
    }
});
