import React from 'react';
import { connect } from 'react-redux';
const PropTypes = require('prop-types');
const { mapIdSelector } = require('../../selectors/map');
import { fetchSwammConfig, toggleOutlets, toggleFootprints, toggleWatersheds } from "../actions/swamm";
import { SwammBmpToggler } from "./swammBmpToggler";
import { changeLayerProperties } from "../../actions/layers";

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

const tableHeaderStyleOrgs = {
    textAlign: "center",
    width: "100px"
};

const tableHeaderStyleTypes = {
    textAlign: "left",
    width: "200px"
};

const filterButtonStyle = {
    margin: "3px",
    background: "#6aa3789F",
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
        bmpNames: PropTypes.array,
        bmpTypes: PropTypes.array,
        toggleOutletStatus: PropTypes.func,
        toggleFootprintStatus: PropTypes.func,
        toggleWatershedStatus: PropTypes.func,
        showOutlets: PropTypes.bool,
        showFootprints: PropTypes.bool,
        showWatersheds: PropTypes.bool,
        projectCode: PropTypes.string,
        layers: PropTypes.object,
        toggleLayer: PropTypes.func
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
                <table className="table" style={{tableLayout: "fixed", marginBottom: "0"}}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyleTypes}>BMP Type</th>
                            {this.props.orgs.map((item) => (
                                <th key={item.id} style={tableHeaderStyleOrgs}>{item.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bmpNames?.map((bmpName) => (
                            <tr key={bmpName.id}>
                                <td className="h5">{bmpName.name}</td>
                                {this.props.orgs.map((org) => (
                                    <td key={org.id}>
                                        <SwammBmpToggler
                                            bmpCode={this.props.projectCode + '_' + org.code + '_' + bmpName.code.slice(bmpName.code.length - 3)}
                                        />
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
                        style={this.props.showOutlets ? filterButtonStyle : {
                            ...filterButtonStyle,
                            "background": "#5609189F"
                        }}
                        onClick={() => {
                            this.toggleOutlets();
                        }}
                    >
                        Outlets
                    </button>
                    <button
                        type="button"
                        className="btn btn-xs btn-info"
                        style={this.props.showFootprints ? filterButtonStyle : {
                            ...filterButtonStyle,
                            "background": "#5609189F"
                        }}
                        onClick={() => {
                            this.toggleFootprints();
                        }}
                    >
                        Footprints
                    </button>
                    <button
                        type="button"
                        className="btn btn-xs btn-info"
                        style={this.props.showWatersheds ? filterButtonStyle : {
                            ...filterButtonStyle,
                            "background": "#5609189F"
                        }}
                        onClick={() => {
                            this.toggleWatersheds();
                        }}
                    >
                        Watersheds
                    </button>
                </div>
            </div>
        );
    }

    toggleOutlets = () => {
        this.props.toggleOutletStatus();
        const outletLayers = this.props?.layers?.flat.filter((layer) => layer.name.includes('_outlet'));
        const visibleBmpTypes = this.props?.bmpTypes.filter((bmpType) => bmpType.visibility);
        outletLayers.map((layer) => {
            visibleBmpTypes.map((bmpType) => {
                if (layer.name.indexOf(bmpType.code) > -1) {
                    this.props.showOutlets ? this.props.toggleLayer(layer.id, false) : this.props.toggleLayer(layer.id, true);
                }
            });
        });
    }

    toggleFootprints = () => {
        this.props.toggleFootprintStatus();
        const footprintLayers = this.props?.layers?.flat.filter((layer) => layer.name.includes('_footprint'));
        const visibleBmpTypes = this.props?.bmpTypes.filter((bmpType) => bmpType.visibility);
        footprintLayers.map((layer) => {
            visibleBmpTypes.map((bmpType) => {
                if (layer.name.indexOf(bmpType.code) > -1) {
                    this.props.showFootprints ? this.props.toggleLayer(layer.id, false) : this.props.toggleLayer(layer.id, true);
                }
            });
        });
    }

    toggleWatersheds = () => {
        this.props.toggleWatershedStatus();
        const watershedLayers = this.props?.layers?.flat.filter((layer) => layer.name.includes('_watershed'));
        const visibleBmpTypes = this.props?.bmpTypes.filter((bmpType) => bmpType.visibility);
        watershedLayers.map((layer) => {
            visibleBmpTypes.map((bmpType) => {
                if (layer.name.indexOf(bmpType.code) > -1) {
                    this.props.showWatersheds ? this.props.toggleLayer(layer.id, false) : this.props.toggleLayer(layer.id, true);
                }
            });
        });
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        orgs: state?.swamm?.bmpTypes ? state?.swamm?.bmpTypes.map(item => item?.organisation).filter((v, i, a)=>a.findIndex(t=>(t.id === v.id)) === i) : [],
        bmpNames: state?.swamm?.bmpTypes ? state?.swamm?.bmpTypes.filter((v, i, a)=>a.findIndex(t=>(t.name === v.name)) === i) : [],
        bmpTypes: state?.swamm?.bmpTypes,
        showOutlets: state?.swamm?.showOutlets,
        showFootprints: state?.swamm?.showFootprints,
        showWatersheds: state?.swamm?.showWatersheds,
        projectCode: state?.projectManager?.data.code,
        layers: state?.layers
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchSwammConfig: fetchSwammConfig(dispatch),
        toggleLayer: (layer, isVisible) => dispatch(changeLayerProperties(layer, {visibility: isVisible})),
        toggleOutletStatus: () => dispatch(toggleOutlets()),
        toggleFootprintStatus: () => dispatch(toggleFootprints()),
        toggleWatershedStatus: () => dispatch(toggleWatersheds())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SwammContainer);
