import React from 'react';
import {connect} from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../../selectors/map');
import {
    fetchSwammBmpTypes,
    fetchSwammAllBmps,
    toggleOutlets,
    toggleFootprints,
    toggleWatersheds,
    showCreateBmpForm
} from "../actionsSwamm";
import {SwammBmpToggler} from "./swammBmpToggler";
import {SwammCreateBmpForm} from "./swammCreateBmpForm";
import {changeLayerProperties} from "../../../actions/layers";
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";

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

const glyphStyle = {
    background: "#6aa3789F",
    borderRadius: "3px",
    display: "inline",
    marginRight: "5px",
    color: "white",
    borderColor: "white",
    borderWidth: "1px",
    fontSize: "10px"
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
        fetchSwammBmpTypes: PropTypes.func,
        fetchSwammAllBmps: PropTypes.func,
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
        toggleLayer: PropTypes.func,
        showCreateBmpForm: PropTypes.func,
        visibleBmpCreateForm: PropTypes.bool,
        showMenuGroup: PropTypes.bool,
        setMenuGroup: PropTypes.func
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            mapId: null,
            data: [],
            orgs: [],
            bmpTypes: [],
            bmps: []
        };
    }

    componentDidMount() {
        this.props.fetchSwammBmpTypes(this.props.mapId);
        this.props.fetchSwammAllBmps(this.props.mapId);
    }

    render() {
        return (
            <div id={"swamm-container"}>
                {this.props.showMenuGroup ?
                    <div style={{...panelStyle}} id="swamm-menu">
                        <table className="table" style={{tableLayout: "fixed", marginBottom: "0"}}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyleTypes}>BMP Type</th>
                                    {this.props.orgs.map((bmpType) => (
                                        <th key={bmpType.id} style={tableHeaderStyleOrgs}>
                                            {bmpType.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.bmpNames?.map((bmpName) => (
                                    <tr key={bmpName.id}>
                                        <td className="h5">
                                            {bmpName.name}
                                            <button
                                                className={"btn glyphicon glyphicon-plus pull-right"}
                                                style={glyphStyle}
                                                onClick={() => {
                                                    this.props.showCreateBmpForm(bmpName.id);
                                                    this.props.setMenuGroup(null);
                                                }}
                                            />
                                        </td>
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
                                onClick={() => this.toggleOutlets()}
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
                                onClick={() => this.toggleFootprints()}
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
                                onClick={() => this.toggleWatersheds()}
                            >
                                Watersheds
                            </button>
                        </div>
                    </div>
                    : null
                }
                {this.props.visibleBmpCreateForm ?
                    <SwammCreateBmpForm bmpTypeId={1}/>
                    : null
                }
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
        projectCode: state?.projectManager?.data?.code,
        layers: state?.layers,
        visibleBmpCreateForm: state?.swamm?.visibleBmpCreateForm
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchSwammBmpTypes: fetchSwammBmpTypes(dispatch),
        fetchSwammAllBmps: fetchSwammAllBmps(dispatch),
        toggleLayer: (layer, isVisible) => dispatch(changeLayerProperties(layer, {visibility: isVisible})),
        toggleOutletStatus: () => dispatch(toggleOutlets()),
        toggleFootprintStatus: () => dispatch(toggleFootprints()),
        toggleWatershedStatus: () => dispatch(toggleWatersheds()),
        showCreateBmpForm: (bmpTypeId) => dispatch(showCreateBmpForm(bmpTypeId)),
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SwammContainer);
