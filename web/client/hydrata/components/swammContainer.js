import React from 'react';
import { connect } from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../selectors/map');
import { fetchSwammConfig } from "../actions/swamm";

const panelStyle = {
    position: "absolute",
    zIndex: 1021,
    top: "50px",
    left: "20px",
    minWidth: "400px",
    backgroundColor: "rgba(0,60,136,0.6)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};

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
            data: []
        };
    }

    componentDidMount() {
        this.props.fetchSwammConfig(this.props.mapId);
    }

    render() {
        return (
            <div style={{...panelStyle}} id="swamm">
                <table>
                    <thead>
                        <tr>
                            <th>Org1</th>
                            <th>Org2</th>
                            <th>Org3</th>
                            <th>Org4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.swammData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.organisation}</td>
                                    <td>{item.cost_rate_per_watershed_area}</td>
                                    <td/>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        swammData: state?.swamm?.data || []
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchSwammConfig: fetchSwammConfig(dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SwammContainer);
