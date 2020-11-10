import React from 'react';
import {connect} from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../../selectors/map');
import {Button} from "react-bootstrap";
import {
    fetchSwammBmpTypes,
    fetchSwammAllBmps,
    toggleOutlets,
    toggleFootprints,
    toggleWatersheds,
    showBmpForm,
    toggleBmpManager,
    makeBmpForm,
    setDrawingBmp,
    toggleBmpType,
    setBmpType
} from "../actionsSwamm";
import {SwammBmpToggler} from "./swammBmpToggler";
import {SwammBmpForm} from "./swammBmpForm";
import {changeLayerProperties} from "../../../actions/layers";
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";
import {orgSelector} from "../selectorsSwamm";
import {saveChanges} from "../../../actions/featuregrid";
import {query} from "../../../actions/wfsquery";

const buttonStyle = {
    position: "absolute",
    zIndex: 1021,
    top: 11,
    minWidth: "135px",
    backgroundColor: "rgba(0,60,136,0.5)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};

const panelStyle = {
    position: "absolute",
    zIndex: 1021,
    top: "50px",
    left: "20px",
    minWidth: "400px",
    maxHeight: "80vh",
    backgroundColor: "rgba(0,60,136,0.6)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    overflowY: "auto",
    overflowX: "hidden"
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
    width: "300px"
};

const filterButtonStyle = {
    margin: "3px",
    background: "#6aa3789F",
    borderRadius: "4px",
    borderColor: "white",
    width: "100px"
};

const bmpProgressButtonStyle = {
    marginTop: "50px",
    marginLeft: "20px",
    position: "absolute",
    opacity: "0.7",
    borderRadius: "4px"
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
        allBmps: PropTypes.array,
        toggleOutlets: PropTypes.func,
        toggleFootprints: PropTypes.func,
        toggleWatersheds: PropTypes.func,
        showOutlets: PropTypes.bool,
        showFootprints: PropTypes.bool,
        showWatersheds: PropTypes.bool,
        projectCode: PropTypes.string,
        layers: PropTypes.object,
        toggleLayer: PropTypes.func,
        showBmpForm: PropTypes.func,
        visibleBmpForm: PropTypes.bool,
        makeBmpForm: PropTypes.func,
        storedBmpForm: PropTypes.object,
        showMenuGroup: PropTypes.bool,
        setMenuGroup: PropTypes.func,
        saveChanges: PropTypes.func,
        setDrawingBmp: PropTypes.func,
        drawingBmp: PropTypes.bool,
        query: PropTypes.func,
        queryStore: PropTypes.func,
        toggleBmpType: PropTypes.func,
        setBmpType: PropTypes.func,
        filters: PropTypes.object,
        fetchingBmps: PropTypes.bool,
        visibleBmpManager: PropTypes.bool,
        toggleBmpManager: PropTypes.func
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (!this.props.mapId && !this.fetchingBmpTypes) {
            this.fetchingBmpTypes = false;
        }
        if (this.props.mapId && (this.props.bmpTypes.length === 0) && !this.fetchingBmpTypes) {
            this.fetchingBmpTypes = true;
            this.props.fetchSwammBmpTypes(this.props.mapId);
        }
        if (this.props.mapId && (this.props.bmpTypes.length > 0)) {
            this.fetchingBmpTypes = false;
        }
        if (!this.props.mapId && !this.fetchingBmps) {
            this.fetchingBmps = false;
        }
        if (this.props.mapId && (this.props.allBmps.length === 0) && !this.fetchingBmps) {
            this.fetchingBmps = true;
            this.props.fetchSwammAllBmps(this.props.mapId);
        }
        if (this.props.mapId && (this.props.allBmps.length > 0)) {
            this.fetchingBmps = false;
        }
    }

    render() {
        return (
            <div id={"swamm-container"}>
                <button
                    key="swamm-bmp-manager-button"
                    style={{...buttonStyle, left: 3 * 150 + 20}}
                    onClick={() => {this.props.clickBmpManager();}}>
                    Manage BMPs
                </button>
                {this.props.visibleBmpManager ?
                    <div style={{...panelStyle}} id="swamm-bmp-manager">
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
                                        <td className="h5" style={{"padding": "3px"}}>
                                            {bmpName.name}
                                            <button
                                                className={"btn glyphicon glyphicon-plus pull-right"}
                                                style={glyphStyle}
                                                onClick={() => {
                                                    this.setBmpTypesVisibility(bmpName.name, true);
                                                    this.props.makeBmpForm(bmpName.id);
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
                {this.props.visibleBmpForm ?
                    <SwammBmpForm />
                    : null
                }
                {this.props.storedBmpForm && !this.props.visibleBmpForm && !this.props.drawingBmp ?
                    <Button
                        style={bmpProgressButtonStyle}
                        bsStyle={"success"}
                        onClick={() => this.props.showBmpForm()}
                    >
                        BMP in progress
                    </Button>
                    : this.props.drawingBmp ?
                        <Button
                            bsStyle="success"
                            style={bmpProgressButtonStyle}
                            onClick={() => {
                                this.props.saveChanges();
                                this.props.showBmpForm();
                            }}
                        >
                            Save Feature
                        </Button>
                        : null
                }
            </div>
        );
    }


    toggleOutlets = () => {
        this.props.toggleOutlets();
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
        this.props.toggleFootprints();
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
        this.props.toggleWatersheds();
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

    setBmpTypesVisibility = (bmpTypeName, visible) => {
        if (!this.props.showOutlets) {this.toggleOutlets();}
        if (!this.props.showFootprints) {this.toggleFootprints();}
        if (!this.props.showWatersheds) {this.toggleWatersheds();}
        this.props.bmpTypes.filter((bmpTypeToTest) => bmpTypeName === bmpTypeToTest.name).map((bmpTypeToSet) => {
            const outletLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.code + '_outlet';})[0];
            const footprintLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.code + '_footprint';})[0];
            const watershedLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.code + '_watershed';})[0];
            this.props.setBmpType(bmpTypeToSet, visible);
            // if the BMP Type is "not visible", make sure none of it's layers are visible either:
            if (!visible) {
                this.props.toggleLayer(outletLayer.id, false);
                this.props.toggleLayer(footprintLayer.id, false);
                this.props.toggleLayer(watershedLayer.id, false);
            // otherwise, set the layer visibility based on the filters:
            } else {
                this.props.filters.showOutlets ? this.props.toggleLayer(outletLayer.id, true) : this.props.toggleLayer(outletLayer.id, false);
                this.props.filters.showFootprints ? this.props.toggleLayer(footprintLayer.id, true) : this.props.toggleLayer(footprintLayer.id, false);
                this.props.filters.showWatersheds ? this.props.toggleLayer(watershedLayer.id, true) : this.props.toggleLayer(watershedLayer.id, false);
            }
        });
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        orgs: orgSelector(state),
        bmpNames: state?.swamm?.bmpTypes ? state?.swamm?.bmpTypes.filter((v, i, a)=>a.findIndex(t=>(t.name === v.name)) === i) : [],
        bmpTypes: state?.swamm?.bmpTypes,
        allBmps: state?.swamm?.allBmps,
        showOutlets: state?.swamm?.showOutlets,
        showFootprints: state?.swamm?.showFootprints,
        showWatersheds: state?.swamm?.showWatersheds,
        projectCode: state?.projectManager?.data?.code,
        layers: state?.layers,
        visibleBmpForm: state?.swamm?.visibleBmpForm,
        storedBmpForm: state?.swamm?.storedBmpForm,
        drawingBmp: state?.swamm?.drawingBmp,
        visibleBmpManager: state?.swamm?.visibleBmpManager,
        queryStore: state?.query,
        filters: {
            showOutlets: state.swamm?.showOutlets,
            showFootprints: state.swamm?.showFootprints,
            showWatersheds: state.swamm?.showWatersheds
        }
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchSwammBmpTypes: (mapId) => dispatch(fetchSwammBmpTypes(mapId)),
        fetchSwammAllBmps: (mapId) => dispatch(fetchSwammAllBmps(mapId)),
        toggleLayer: (layer, isVisible) => dispatch(changeLayerProperties(layer, {visibility: isVisible})),
        toggleOutlets: () => dispatch(toggleOutlets()),
        toggleFootprints: () => dispatch(toggleFootprints()),
        toggleWatersheds: () => dispatch(toggleWatersheds()),
        showBmpForm: () => dispatch(showBmpForm()),
        clickBmpManager: () => {
            dispatch(toggleBmpManager());
            dispatch(setMenuGroup(null));
        },
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup)),
        makeBmpForm: (bmpTypeId) => dispatch(makeBmpForm(bmpTypeId)),
        saveChanges: () => dispatch(saveChanges()),
        setDrawingBmp: (layerName) => dispatch(setDrawingBmp(layerName)),
        query: (url, filterObj, queryOptions, reason) => dispatch(query(url, filterObj, queryOptions, reason)),
        toggleBmpType: (bmpType) => dispatch(toggleBmpType(bmpType)),
        setBmpType: (bmpType, isVisible) => dispatch(setBmpType(bmpType, isVisible))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SwammContainer);
