import React from 'react';
import { connect } from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../selectors/map');
import { fetchSwammConfig } from "../actions/swamm";

class SwammContainer extends React.Component {
    static propTypes = {
        fetchSwammConfig: PropTypes.func,
        swammData: PropTypes.array,
        mapId: PropTypes.number
    };

    static defaultProps = {
        fetchSwammConfig: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            mapId: null,
            swammData: ['test']
        };
    }

    componentDidMount() {
        this.props.fetchSwammConfig(this.props.mapId);
    }

    render() {
        return (
            <div id="swamm">
                hi from swamm
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        swammData: state?.swammData
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchSwammConfig: fetchSwammConfig(dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SwammContainer);
