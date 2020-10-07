import React from 'react';
import { connect } from 'react-redux';
const PropTypes = require('prop-types');
const { mapIdSelector } = require('../../selectors/map');
import { fetchSwammConfig, toggleOutlets, toggleFootprints, toggleWatersheds } from "../actions/swamm";
import { SwammBmpToggler } from "../components/swammBmpToggler";

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
    color: "white"
};

const tableHeaderStyle = {
    textAlign: "center",
    width: "100px"
};

const filterButtonStyle = {
    margin: "3px",
    background: "#6a81a3",
    borderRadius: "4px",
    borderColor: "white",
    width: "100px"
};

class SwammContainer extends React.Component {
    static propTypes = {
        fetchSwammConfig: PropTypes.func,
        swammData: PropTypes.array,
        mapId: PropTypes.number,
        orgs: PropTypes.array,
        bmpTypes: PropTypes.array,
        toggleOutlets: PropTypes.func,
        toggleFootprints: PropTypes.func,
        toggleWatersheds: PropTypes.func,
        showOutlets: PropTypes.bool,
        showFootprints: PropTypes.bool,
        showWatersheds: PropTypes.bool,
        projectCode: PropTypes.string
    };

    static defaultProps = {
        fetchSwammConfig: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            mapId: null,
            data: [],
            orgs: [],
            bmpTypes: []
        };
    }

    componentDidMount() {
        this.props.fetchSwammConfig(this.props.mapId);
    }

    render() {
        return (
            <div style={{...panelStyle}} id="swamm">
                <table className="table" style={{marginBottom: "0"}}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>BMP Type</th>
                            {this.props.orgs.map((item) => (
                                <th key={item.id} style={tableHeaderStyle}>{item.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bmpTypes.map((bmpType) => (
                            <tr key={bmpType.name}>
                                <td className="h5" style={{minWidth: "200px"}}>{bmpType.name}</td>
                                {this.props.orgs.map((org) => (
                                    <td key={org.id}>
                                        <SwammBmpToggler bmpCode={this.props.projectCode + '_' + org.code + '_' + bmpType.code}/>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr style={{marginTop: "0"}}/>
                <div className="btn-group" role="group" style={{display: "block", margin: "auto"}}>
                    <button
                        type="button"
                        className="btn btn-xs btn-info"
                        style={this.props.showOutlets ? filterButtonStyle : {...filterButtonStyle, "background": "#093656"}}
                        onClick={() => {this.props.toggleOutlets();}}
                    >
                        Outlets
                    </button>
                    <button
                        type="button"
                        className="btn btn-xs btn-info"
                        style={this.props.showFootprints ? filterButtonStyle : {...filterButtonStyle, "background": "#093656"}}
                        onClick={() => {this.props.toggleFootprints();}}
                    >
                        Footprints
                    </button>
                    <button
                        type="button"
                        className="btn btn-xs btn-info"
                        style={this.props.showWatersheds ? filterButtonStyle : {...filterButtonStyle, "background": "#093656"}}
                        onClick={() => {this.props.toggleWatersheds();}}
                    >
                        Watersheds
                    </button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        swammData: state?.swamm?.data || [],
        orgs: state?.swamm?.data ? state?.swamm?.data.map(item => item?.organisation).filter((v, i, a)=>a.findIndex(t=>(t.id === v.id)) === i) : [],
        bmpTypes: state?.swamm?.data ? state?.swamm?.data.filter((v, i, a)=>a.findIndex(t=>(t.code === v.code)) === i) : [],
        showOutlets: state?.swamm?.showOutlets,
        showFootprints: state?.swamm?.showFootprints,
        showWatersheds: state?.swamm?.showWatersheds,
        projectCode: state?.projectManager?.data.code
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchSwammConfig: fetchSwammConfig(dispatch),
        toggleOutlets: () => dispatch(toggleOutlets()),
        toggleFootprints: () => dispatch(toggleFootprints()),
        toggleWatersheds: () => dispatch(toggleWatersheds())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SwammContainer);
