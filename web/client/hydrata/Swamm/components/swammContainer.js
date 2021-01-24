import React from 'react';
import {connect} from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../../selectors/map');
import {Button} from "react-bootstrap";
import {
    fetchSwammBmpTypes,
    fetchSwammAllBmps,
    fetchSwammBmpStatuses,
    toggleOutlets,
    toggleFootprints,
    toggleWatersheds,
    showBmpForm,
    showSwammBmpChart,
    toggleBmpManager,
    makeBmpForm,
    setEditingBmpFeatureId,
    clearDrawingBmpLayerName,
    toggleBmpType,
    setBmpType,
    showSwammDataGrid,
    showSwammFeatureGrid
} from "../actionsSwamm";
import {SwammBmpToggler} from "./swammBmpToggler";
import {SwammBmpForm} from "./swammBmpForm";
import {SwammDataGrid} from "./swammDataGrid";
import {changeLayerProperties} from "../../../actions/layers";
import {
    setMenuGroup,
    setOrgVisibility
} from "../../ProjectManager/actionsProjectManager";
import {bmpByUniqueNameSelector} from "../selectorsSwamm";
import {setLayer, saveChanges, toggleViewMode} from "../../../actions/featuregrid";
import {
    drawStopped
} from "../../../actions/draw";
import {query} from "../../../actions/wfsquery";
import {SwammBmpChart} from "./swammBmpChart";
import {MenuDatasetRow} from "../../ProjectManager/components/projectManagerMenuDatasetRow";

const buttonStyle = {
    position: "absolute",
    zIndex: 1021,
    top: 11,
    width: "85px",
    height: "60px",
    backgroundColor: "rgba(0,60,136,0.5)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "3px 5px",
    fontSize: "12px",
    lineHeight: "1.3",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};

const glyphStyle = {
    background: "#ffffff",
    borderRadius: "3px",
    display: "block",
    margin: "auto",
    color: "limegreen",
    fontSize: "10px"
};

const panelStyle = {
    position: "absolute",
    zIndex: 1021,
    top: "85px",
    left: "20px",
    minWidth: "400px",
    maxWidth: "800px",
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
    top: "50px",
    left: "20px",
    minWidth: "135px",
    position: "absolute",
    opacity: "0.7",
    borderRadius: "4px"
};

class SwammContainer extends React.Component {
    static propTypes = {
        fetchSwammBmpTypes: PropTypes.func,
        fetchSwammAllBmps: PropTypes.func,
        fetchSwammBmpStatuses: PropTypes.func,
        statuses: PropTypes.array,
        swammData: PropTypes.array,
        mapId: PropTypes.number,
        organisations: PropTypes.array,
        bmpUniqueNames: PropTypes.array,
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
        clearDrawingBmpLayerName: PropTypes.func,
        clearEditingBmpFeatureId: PropTypes.func,
        drawingBmpLayerName: PropTypes.string,
        setEditingBmpFeatureId: PropTypes.func,
        editingBmpFeatureId: PropTypes.string,
        query: PropTypes.func,
        queryStore: PropTypes.func,
        toggleBmpType: PropTypes.func,
        setBmpType: PropTypes.func,
        setOrgVisibility: PropTypes.func,
        filters: PropTypes.object,
        fetchingBmps: PropTypes.bool,
        visibleBmpManager: PropTypes.bool,
        visibleSwammDataGrid: PropTypes.bool,
        showSwammFeatureGrid: PropTypes.func,
        showSwammDataGrid: PropTypes.func,
        visibleSwammBmpChart: PropTypes.bool,
        showSwammBmpChart: PropTypes.func,
        clickBmpManager: PropTypes.func,
        bmpByUniqueNameSelector: PropTypes.func,
        setLayer: PropTypes.func,
        toggleViewMode: PropTypes.func,
        drawStopped: PropTypes.func,
        bmpOutletLayer: PropTypes.object,
        bmpFootrprintLayer: PropTypes.object,
        bmpWatershedLayer: PropTypes.object
    };

    static defaultProps = {};

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
        if (!this.props.mapId && !this.fetchingStatuses) {
            this.fetchingStatuses = false;
        }
        if (this.props.mapId && (this.props.statuses.length === 0) && !this.fetchingStatuses) {
            this.fetchingStatuses = true;
            this.props.fetchSwammBmpStatuses(this.props.mapId);
        }
        if (this.props.mapId && (this.props.statuses.length > 0)) {
            this.fetchingStatuses = false;
        }
    }

    render() {
        return (
            <div id={"swamm-container"}>
                <button
                    key="swamm-bmp-viewer-button"
                    style={{...buttonStyle, display: 'none', left: 3 * 100 + 20}}
                    onClick={() => {this.props.clickBmpManager();}}>
                    View BMPs
                </button>
                {this.props.storedBmpForm && !this.props.visibleBmpForm && !this.props.drawingBmpLayerName && !this.props.editingBmpFeatureId ?
                    <React.Fragment>
                        <Button
                            style={{...bmpProgressButtonStyle, left: 20, top: 80}}
                            bsStyle={"success"}
                            onClick={() => this.props.showBmpForm()}
                        >
                            BMP in progress
                        </Button>
                        <button
                            key="swamm-bmp-creator-button"
                            style={{...buttonStyle, left: 4 * 100 + 20}}
                            onClick={() => {
                                this.props.showBmpForm();
                                this.props.setMenuGroup(null);
                            }}
                        >
                            Create BMPs
                        </button>
                    </React.Fragment>
                    : this.props.drawingBmpLayerName || this.props.editingBmpFeatureId ?
                        <React.Fragment>
                            <Button
                                bsStyle="success"
                                style={{...bmpProgressButtonStyle, top: 80}}
                                onClick={() => {
                                    this.props.saveChanges();
                                    this.props.showBmpForm();
                                }}
                            >
                                Save Feature
                            </Button>
                            <Button
                                bsStyle="danger"
                                style={{...bmpProgressButtonStyle, left: 140 + 20, top: 80}}
                                onClick={() => {
                                    this.props.showBmpForm();
                                    this.props.setLayer(null);
                                    this.props.toggleViewMode();
                                    this.props.drawStopped();
                                    this.props.clearDrawingBmpLayerName();
                                    this.props.clearEditingBmpFeatureId();
                                }}
                            >
                                Cancel Feature
                            </Button>
                            <button
                                key="swamm-bmp-creator-button"
                                style={{...buttonStyle, left: 4 * 100 + 20}}
                                onClick={() => {
                                    this.props.saveChanges();
                                    this.props.showBmpForm();
                                    this.props.setMenuGroup(null);
                                }}
                            >
                                Create BMPs
                            </button>
                        </React.Fragment>
                        : this.props.visibleBmpForm ?
                            <button
                                key="swamm-bmp-creator-button"
                                style={{...buttonStyle, left: 4 * 100 + 20}}
                                disabled
                            >
                                Create BMPs
                            </button>
                            :
                            <button
                                key="swamm-bmp-creator-button"
                                style={{...buttonStyle, left: 4 * 100 + 20}}
                                onClick={() => {
                                    this.props.makeBmpForm();
                                    this.props.setMenuGroup(null);
                                }}
                            >
                                Create BMPs
                            </button>
                }
                <button
                    key="swamm-bmp-data-grid-button"
                    style={{...buttonStyle, left: 5 * 100 + 20}}
                    onClick={() => {
                        this.props.showSwammFeatureGrid(this.props.bmpOutletLayer);
                        this.props.setMenuGroup(null);
                    }}
                >
                    Summary Table
                </button>
                <button
                    key="swamm-bmp-chart-button"
                    style={{...buttonStyle, left: 6 * 100 + 20}}
                    onClick={() => {
                        this.props.showSwammBmpChart();
                        this.props.setMenuGroup(null);
                    }}
                >
                    Dashboard
                </button>
                {this.props.visibleBmpManager ?
                    <div style={{...panelStyle}} id="swamm-bmp-manager">
                        <div className="btn-group" role="group" style={{display: "none", margin: "auto"}}>
                            <button
                                type="button"
                                className="btn btn-xs btn-info"
                                style={this.props.showOutlets ? filterButtonStyle : {
                                    ...filterButtonStyle,
                                    "background": "#5609189F"
                                }}
                                onClick={() => window.alert('Feature temporarily disabled')}
                            >
                                Show Outlets
                            </button>
                            <button
                                type="button"
                                className="btn btn-xs btn-info"
                                style={this.props.showFootprints ? filterButtonStyle : {
                                    ...filterButtonStyle,
                                    "background": "#5609189F"
                                }}
                                onClick={() => window.alert('Feature temporarily disabled')}
                            >
                                Show Footprints
                            </button>
                            <button
                                type="button"
                                className="btn btn-xs btn-info"
                                style={this.props.showWatersheds ? filterButtonStyle : {
                                    ...filterButtonStyle,
                                    "background": "#5609189F"
                                }}
                                onClick={() => window.alert('Feature temporarily disabled')}
                            >
                                Show Watersheds
                            </button>
                        </div>
                        <table className="table check1" style={{tableLayout: "fixed", marginBottom: "0"}}>
                            {/*<thead>*/}
                            {/*    <tr>*/}
                            {/*        <th style={tableHeaderStyleTypes}>BMP Type</th>*/}
                            {/*        <th style={tableHeaderStyleTypes}>Visibility</th>*/}
                            {/*    </tr>*/}
                            {/*</thead>*/}
                            <tbody>
                                <tr key="r1">
                                    {/*<td key="d1" className="h5" style={{"padding": "3px"}}>*/}
                                    {/*    {this.props.bmpDataLayer.title}*/}
                                    {/*</td>*/}
                                    <td key="d2">
                                        <MenuDatasetRow layer={this.props.bmpDataLayer}/>
                                        {/*<SwammBmpToggler*/}
                                        {/*    bmpCode={this.props.projectCode + '_' + bmpName.code.slice(bmpName.code.length - 3)}*/}
                                        {/*/>*/}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    : null
                }
                {this.props.visibleBmpForm ?
                    <SwammBmpForm setBmpTypesVisibility={this.setBmpTypesVisibility}/>
                    : null
                }
                {this.props.visibleSwammDataGrid ?
                    <div>
                        <SwammDataGrid/>
                        SwammDataGrid
                    </div>
                    : null
                }
                {this.props.visibleSwammBmpChart ?
                    <div>
                        <SwammBmpChart/>
                        SwammBmpChart
                    </div>
                    : null
                }
            </div>
        );
    }
    //
    //
    // toggleOutlets = () => {
    //     this.props.toggleOutlets();
    //     const outletLayers = this.props?.layers?.flat.filter((layer) => layer.name.includes('_outlet'));
    //     const visibleBmpTypes = this.props?.bmpTypes.filter((bmpType) => bmpType.visibility);
    //     outletLayers.map((layer) => {
    //         visibleBmpTypes.map((bmpType) => {
    //             if (layer.name.indexOf(bmpType.full_code) > -1) {
    //                 this.props.showOutlets ? this.props.toggleLayer(layer.id, false) : this.props.toggleLayer(layer.id, true);
    //             }
    //         });
    //     });
    // };
    //
    // toggleFootprints = () => {
    //     this.props.toggleFootprints();
    //     const footprintLayers = this.props?.layers?.flat.filter((layer) => layer.name.includes('_footprint'));
    //     const visibleBmpTypes = this.props?.bmpTypes.filter((bmpType) => bmpType.visibility);
    //     footprintLayers.map((layer) => {
    //         visibleBmpTypes.map((bmpType) => {
    //             if (layer.name.indexOf(bmpType.full_code) > -1) {
    //                 this.props.showFootprints ? this.props.toggleLayer(layer.id, false) : this.props.toggleLayer(layer.id, true);
    //             }
    //         });
    //     });
    // };
    //
    // toggleWatersheds = () => {
    //     this.props.toggleWatersheds();
    //     const watershedLayers = this.props?.layers?.flat.filter((layer) => layer.name.includes('_watershed'));
    //     const visibleBmpTypes = this.props?.bmpTypes.filter((bmpType) => bmpType.visibility);
    //     watershedLayers.map((layer) => {
    //         visibleBmpTypes.map((bmpType) => {
    //             if (layer.name.indexOf(bmpType.full_code) > -1) {
    //                 this.props.showWatersheds ? this.props.toggleLayer(layer.id, false) : this.props.toggleLayer(layer.id, true);
    //             }
    //         });
    //     });
    // };

    setBmpTypesVisibility = (bmpTypeName, visible) => {
        // if (!this.props.showOutlets) {this.toggleOutlets();}
        // if (!this.props.showFootprints) {this.toggleFootprints();}
        // if (!this.props.showWatersheds) {this.toggleWatersheds();}
        // this.props.bmpTypes.filter((bmpTypeToTest) => bmpTypeName === bmpTypeToTest.name).map((bmpTypeToSet) => {
        //     const outletLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.full_code + '_outlet';})[0];
        //     const footprintLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.full_code + '_footprint';})[0];
        //     const watershedLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.full_code + '_watershed';})[0];
        //     this.props.setBmpType(bmpTypeToSet, visible);
        //     // if the BMP Type is "not visible", make sure none of it's layers are visible either:
        //     if (!visible) {
        //         this.props.toggleLayer(outletLayer.id, false);
        //         this.props.toggleLayer(footprintLayer.id, false);
        //         this.props.toggleLayer(watershedLayer.id, false);
        //     // otherwise, set the layer visibility based on the filters:
        //     } else {
        //         this.props.filters.showOutlets ? this.props.toggleLayer(outletLayer.id, true) : this.props.toggleLayer(outletLayer.id, false);
        //         this.props.filters.showFootprints ? this.props.toggleLayer(footprintLayer.id, true) : this.props.toggleLayer(footprintLayer.id, false);
        //         this.props.filters.showWatersheds ? this.props.toggleLayer(watershedLayer.id, true) : this.props.toggleLayer(watershedLayer.id, false);
        //     }
        // });
    };

    // setBmpOrgsVisibility = (bmpOrgName, visible) => {
    //     this.props.organisations.filter((orgToTest) => {
    //         return orgToTest.name === bmpOrgName;
    //     }).map((orgToSet) => {
    //         this.props.setOrgVisibility(orgToSet, visible);
    //     });
    //     this.props.bmpTypes.filter(
    //         (bmpTypeToTest) => {
    //             return bmpOrgName === bmpTypeToTest.organisation.name;
    //         }
    //     ).map((bmpTypeToSet) => {
    //         const outletLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.full_code + '_outlet';})[0];
    //         const footprintLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.full_code + '_footprint';})[0];
    //         const watershedLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpTypeToSet.full_code + '_watershed';})[0];
    //         this.props.setBmpType(bmpTypeToSet, visible);
    //         // if the BMP Type is "not visible", make sure none of it's layers are visible either:
    //         if (!visible) {
    //             this.props.toggleLayer(outletLayer.id, false);
    //             this.props.toggleLayer(footprintLayer.id, false);
    //             this.props.toggleLayer(watershedLayer.id, false);
    //         // otherwise, set the layer visibility based on the filters:
    //         } else {
    //             this.props.filters.showOutlets ? this.props.toggleLayer(outletLayer.id, true) : this.props.toggleLayer(outletLayer.id, false);
    //             this.props.filters.showFootprints ? this.props.toggleLayer(footprintLayer.id, true) : this.props.toggleLayer(footprintLayer.id, false);
    //             this.props.filters.showWatersheds ? this.props.toggleLayer(watershedLayer.id, true) : this.props.toggleLayer(watershedLayer.id, false);
    //         }
    //     });
    // }
}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        organisations: state?.projectManager?.data?.organisations,
        bmpUniqueNames: bmpByUniqueNameSelector(state),
        bmpTypes: state?.swamm?.bmpTypes,
        allBmps: state?.swamm?.allBmps,
        statuses: state?.swamm?.statuses,
        showOutlets: state?.swamm?.showOutlets,
        showFootprints: state?.swamm?.showFootprints,
        showWatersheds: state?.swamm?.showWatersheds,
        projectCode: state?.projectManager?.data?.code,
        layers: state?.layers,
        bmpOutletLayer: state?.layers?.flat?.filter((layer) => layer.name === state?.projectManager?.data?.code + "_bmp_outlet")[0],
        bmpFootprintLayer: state?.layers?.flat?.filter((layer) => layer.name === state?.projectManager?.data?.code + "_bmp_footprint")[0],
        bmpWatershedLayer: state?.layers?.flat?.filter((layer) => layer.name === state?.projectManager?.data?.code + "_bmp_watershed")[0],
        visibleBmpForm: state?.swamm?.visibleBmpForm,
        storedBmpForm: state?.swamm?.storedBmpForm,
        drawingBmpLayerName: state?.swamm?.drawingBmpLayerName,
        editingBmpFeatureId: state?.swamm?.editingBmpFeatureId,
        visibleBmpManager: state?.swamm?.visibleBmpManager,
        visibleSwammDataGrid: state?.swamm?.visibleSwammDataGrid,
        visibleSwammBmpChart: state?.swamm?.visibleSwammBmpChart,
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
        fetchSwammBmpStatuses: (mapId) => dispatch(fetchSwammBmpStatuses(mapId)),
        toggleLayer: (layer, isVisible) => dispatch(changeLayerProperties(layer, {visibility: isVisible})),
        toggleOutlets: () => dispatch(toggleOutlets()),
        toggleFootprints: () => dispatch(toggleFootprints()),
        toggleWatersheds: () => dispatch(toggleWatersheds()),
        showBmpForm: () => dispatch(showBmpForm()),
        setLayer: (layerName) => dispatch(setLayer(layerName)),
        setEditingBmpFeatureId: (featureId) => dispatch(setEditingBmpFeatureId(featureId)),
        showSwammDataGrid: () => dispatch(showSwammDataGrid()),
        showSwammFeatureGrid: (layer) => dispatch(showSwammFeatureGrid(layer)),
        showSwammBmpChart: () => dispatch(showSwammBmpChart()),
        clickBmpManager: () => {
            dispatch(toggleBmpManager());
            dispatch(setMenuGroup(null));
        },
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup)),
        makeBmpForm: (bmpTypeId) => dispatch(makeBmpForm(bmpTypeId)),
        saveChanges: () => dispatch(saveChanges()),
        clearDrawingBmpLayerName: () => dispatch(clearDrawingBmpLayerName()),
        query: (url, filterObj, queryOptions, reason) => dispatch(query(url, filterObj, queryOptions, reason)),
        toggleBmpType: (bmpType) => dispatch(toggleBmpType(bmpType)),
        setBmpType: (bmpType, isVisible) => dispatch(setBmpType(bmpType, isVisible)),
        setOrgVisibility: (org, isVisible) => dispatch(setOrgVisibility(org, isVisible)),
        toggleViewMode: () => dispatch(toggleViewMode()),
        drawStopped: () => dispatch(drawStopped())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SwammContainer);
