import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button, ControlLabel, FormControl, FormGroup, Form, Col} from "react-bootstrap";
import {
    hideBmpForm,
    showBmpForm,
    clearBmpForm,
    submitBmpForm,
    makeDefaultsBmpForm,
    updateBmpForm,
    setDrawingBmp
} from "../actionsSwamm";
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";
import {
    setLayer,
    toggleEditMode,
    createNewFeatures,
    startDrawingFeature,
    saveChanges
} from "../../../actions/featuregrid";
import {
    changeDrawingStatus
} from "../../../actions/draw";
import { purgeMapInfoResults } from "../../../actions/mapInfo";
import {featureTypeSelected, createQuery} from "../../../actions/wfsquery";
import "../../ProjectManager/projectManager.css";
import {isInt} from "../../Utils/utils";
import {orgSelector} from "../selectorsSwamm";

class SwammBmpFormClass extends React.Component {
    static propTypes = {
        bmpTypeId: PropTypes.number,
        setMenuGroup: PropTypes.func,
        creatingNewBmp: PropTypes.bool,
        updatingBmp: PropTypes.object,
        hideBmpForm: PropTypes.func,
        showBmpForm: PropTypes.func,
        submitBmpForm: PropTypes.func,
        storeBmpForm: PropTypes.func,
        thisBmpType: PropTypes.object,
        newBmpForm: PropTypes.object,
        storedBmpForm: PropTypes.object,
        clearBmpForm: PropTypes.func,
        orgs: PropTypes.array,
        makeDefaultsBmpForm: PropTypes.func,
        updateBmpForm: PropTypes.func,
        setLayer: PropTypes.func,
        featureTypeSelected: PropTypes.func,
        toggleEditMode: PropTypes.func,
        createNewFeatures: PropTypes.func,
        createQuery: PropTypes.func,
        changeDrawingStatus: PropTypes.func,
        startDrawingFeature: PropTypes.func,
        saveChanges: PropTypes.func,
        setDrawingBmp: PropTypes.func,
        layers: PropTypes.array,
        query: PropTypes.func,
        mapId: PropTypes.number,
        purgeMapInfoResults: PropTypes.func
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {};
    }

    componentDidMount() {
        if (Object.keys(this.props.storedBmpForm).length === 0 && this.props.creatingNewBmp) {
            this.props.makeDefaultsBmpForm(this.props.thisBmpType);
        }
        if (Object.keys(this.props.storedBmpForm).length === 0 && !this.props.creatingNewBmp) {
            this.props.purgeMapInfoResults();
            this.props.setMenuGroup(null);
        }
    }

    componentDidUpdate() {
        if (Object.keys(this.props.storedBmpForm).length === 0 && !this.props.creatingNewBmp && this.props.updatingBmp) {
            console.log('populate form with this.props.updatingBmp: ', this.props.updatingBmp);
        }
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={() => this.props.hideBmpForm()}
                style={{
                    marginTop: "100px"
                }}
            >
                <Modal.Header>
                    <Modal.Title>
                        Create a new {this.props?.thisBmpType?.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formControlsSelect">
                            <Col componentClass={ControlLabel} sm={6}>
                              Organisation
                            </Col>
                            <Col sm={5}>
                                <FormControl
                                    inline="true"
                                    componentClass="select"
                                    name="organisation"
                                    value={JSON.stringify(this.props.storedBmpForm?.organisation)}
                                    onChange={this.handleChange}
                                >
                                    <option key="1" value="select">Select Organisation</option>
                                    {this.props.orgs.map((org) => {
                                        return <option key={org.id} value={JSON.stringify(org)}>{org.name}</option>;
                                    })}
                                </FormControl>
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="n_redratio" validationState={this.validateRatio("n_redratio")} >
                            <Col componentClass={ControlLabel} sm={6}>
                              Nitrogen Reduction Ratio (0 to 1)
                            </Col>
                            <Col sm={5}>
                                <FormControl
                                    inline="true"
                                    type="number"
                                    step={0.01}
                                    precision={2}
                                    name="override_n_redratio"
                                    value={this.props.storedBmpForm?.override_n_redratio}
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="p_redratio" validationState={this.validateRatio("p_redratio")} >
                            <Col componentClass={ControlLabel} sm={6}>
                              Phosphorus Reduction Ratio (0 to 1)
                            </Col>
                            <Col sm={5}>
                                <FormControl
                                    inline="true"
                                    type="number"
                                    step={0.01}
                                    precision={2}
                                    name="override_p_redratio"
                                    value={this.props.storedBmpForm?.override_p_redratio}
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="s_redratio" validationState={this.validateRatio("s_redratio")}>
                            <Col componentClass={ControlLabel} sm={6}>
                              Sediment Reduction Ratio (0 to 1)
                            </Col>
                            <Col sm={5}>
                                <FormControl
                                    inline="true"
                                    type="number"
                                    step={0.01}
                                    precision={2}
                                    name="override_s_redratio"
                                    value={this.props.storedBmpForm?.override_s_redratio}
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="cost_base" validationState={this.validateCost("cost_base")}>
                            <Col componentClass={ControlLabel} sm={6}>
                              Base Cost ($)
                            </Col>
                            <Col sm={5}>
                                <FormControl
                                    inline="true"
                                    type={"number"}
                                    step={0.01}
                                    precision={2}
                                    name="override_cost_base"
                                    value={this.props.storedBmpForm?.override_cost_base}
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="cost_rate_per_footprint_area" validationState={this.validateCost("cost_rate_per_footprint_area")}>
                            <Col componentClass={ControlLabel} sm={6}>
                              Footprint Cost ($/acre)
                            </Col>
                            <Col sm={5}>
                                <FormControl
                                    inline="true"
                                    type={"number"}
                                    step={0.01}
                                    precision={2}
                                    name="override_cost_rate_per_footprint_area"
                                    value={this.props.storedBmpForm?.override_cost_rate_per_footprint_area}
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="cost_rate_per_watershed_area" validationState={this.validateCost("cost_rate_per_watershed_area")}>
                            <Col componentClass={ControlLabel} sm={6}>
                              Watershed Cost ($/acre)
                            </Col>
                            <Col sm={5}>
                                <FormControl
                                    inline="true"
                                    type={"number"}
                                    step={0.01}
                                    precision={2}
                                    name="override_cost_rate_per_watershed_area"
                                    value={this.props.storedBmpForm?.override_cost_rate_per_watershed_area}
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="outlet_fid" validationState={this.validateFid("outlet_fid")}>
                            <Col componentClass={ControlLabel} sm={6}>
                                Outlet Point:
                            </Col>
                            <Col sm={5}>
                                {this.props.storedBmpForm?.outlet_fid ?
                                    <React.Fragment>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            step={1}
                                            precision={0}
                                            name="outlet_fid"
                                            value={this.props.storedBmpForm?.outlet_fid}
                                            onChange={this.handleChange}
                                        />
                                        <FormControl.Feedback/>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Button
                                            disabled={ !this.props.storedBmpForm?.organisation}
                                            bsStyle={ this.props.storedBmpForm?.organisation ? "success" : "disabled"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => this.drawBmpStep1(this.props.thisBmpType.code + '_outlet')}>
                                        Locate Outlet
                                        </Button>
                                    </React.Fragment>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="footprint_fid" validationState={this.validateFid("footprint_fid")}>
                            <Col componentClass={ControlLabel} sm={6}>
                                Footprint:
                            </Col>
                            <Col sm={5}>
                                {this.props.storedBmpForm?.footprint_fid ?
                                    <React.Fragment>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            step={1}
                                            precision={0}
                                            name="footprint_fid"
                                            value={this.props.storedBmpForm?.footprint_fid}
                                            onChange={this.handleChange}
                                        />
                                        <FormControl.Feedback/>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Button
                                            disabled={ !this.props.storedBmpForm?.organisation}
                                            bsStyle={ this.props.storedBmpForm?.organisation ? "success" : "disabled"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => this.drawBmpStep1(this.props.thisBmpType.code + '_footprint')}>
                                        Draw footprint
                                        </Button>
                                    </React.Fragment>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="watershed_fid" validationState={this.validateFid("watershed_fid")}>
                            <Col componentClass={ControlLabel} sm={6}>
                                Watershed:
                            </Col>
                            <Col sm={5}>
                                {this.props.storedBmpForm?.watershed_fid ?
                                    <React.Fragment>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            step={1}
                                            precision={0}
                                            name="watershed_fid"
                                            value={this.props.storedBmpForm?.watershed_fid}
                                            onChange={this.handleChange}
                                        />
                                        <FormControl.Feedback/>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Button
                                            disabled={ !this.props.storedBmpForm?.organisation}
                                            bsStyle={ this.props.storedBmpForm?.organisation ? "success" : "disabled"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => this.drawBmpStep1(this.props.thisBmpType.code + '_watershed')}>
                                        Draw watershed
                                        </Button>
                                    </React.Fragment>
                                }
                            </Col>
                        </FormGroup>
                    </Form>
                    <div>more content</div>
                    <div>{JSON.stringify(this.props.updatingBmp)}</div>
                    <div>{JSON.stringify(this.props.storedBmpForm?.cost_base)}</div>
                    <div>{JSON.stringify(this.props.storedBmpForm?.cost_per_lbs_p_reduced)}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => this.props.clearBmpForm()}>
                        Cancel
                    </Button>
                    <Button
                        bsStyle="warning"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => this.props.hideBmpForm()}>
                        Close
                    </Button>
                    <Button
                        bsStyle="success"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => {
                            this.props.submitBmpForm(this.props.storedBmpForm, this.props.mapId);
                        }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    validateRatio(ratioName) {
        const ratio = this.props.storedBmpForm[ratioName];
        if (ratio < 1 && ratio > 0) return 'success';
        if (ratio === 1) return 'warning';
        if (ratio > 1 || ratio < 0) return 'error';
        return null;
    }
    validateCost(costName) {
        const cost = this.props.storedBmpForm[costName];
        if (cost >= 0) return 'success';
        if (cost < 0) return 'error';
        return null;
    }
    validateFid(fid) {
        const id = this.props.storedBmpForm[fid];
        if (id >= 0 && isInt(id)) return 'success';
        if (id < 0) return 'error';
        return null;
    }
    handleChange(event) {
        const fieldName = event.target.name;
        let fieldValue = event.target.value;
        if (event.target.type === 'number')  {fieldValue = parseFloat(fieldValue);}
        if (event.target.outerHTML.includes('organisation'))  {fieldValue = JSON.parse(fieldValue);}
        this.props.updateBmpForm({[fieldName]: fieldValue});
    }
    drawBmpStep1(layerName) {
        const orgCode = this.props.storedBmpForm.organisation.code;
        const bits = layerName.split("_");
        bits[1] = orgCode;
        const layerNameWithCorrectOrg = bits.join('_');
        const targetLayer = this.props.layers.flat.filter(layer => layer.name === layerNameWithCorrectOrg)[0];
        this.props.setLayer(targetLayer.id);
        this.props.featureTypeSelected('http://localhost:8080/geoserver/wfs', layerNameWithCorrectOrg);
        const filterObj =  {
            featureTypeName: layerNameWithCorrectOrg,
            filterType: 'OGC',
            ogcVersion: '1.1.0'
        };
        this.props.createQuery('http://localhost:8080/geoserver/wfs', filterObj);
        // TODO: move this to the observables, once I figure out how they work
        setTimeout(
            () => this.drawBmpStep2(layerNameWithCorrectOrg),
            1000
        );
    }
    drawBmpStep2(layerName) {
        // edit mode
        this.props.toggleEditMode();
        this.props.changeDrawingStatus();
        // add new feature
        this.props.createNewFeatures([{}]);
        this.props.hideBmpForm();
        this.props.setDrawingBmp(layerName);
        // draw feature
        this.props.startDrawingFeature();
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        bmpTypes: state?.swamm?.bmpTypes,
        thisBmpType: state?.swamm?.bmpTypes.filter((bmpType) => bmpType.id === state?.swamm?.BmpFormBmpTypeId)[0],
        storedBmpForm: state?.swamm?.storedBmpForm || {},
        creatingNewBmp: state?.swamm?.creatingNewBmp,
        updatingBmp: state?.swamm?.updatingBmp,
        orgs: orgSelector(state),
        layers: state?.layers,
        query: state?.query
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup)),
        hideBmpForm: () => dispatch(hideBmpForm()),
        showBmpForm: () => dispatch(showBmpForm()),
        submitBmpForm: (newBmp, mapId) => dispatch(submitBmpForm(newBmp, mapId)),
        updateBmpForm: (kv) => dispatch(updateBmpForm(kv)),
        clearBmpForm: () => dispatch(clearBmpForm()),
        makeDefaultsBmpForm: (bmpType) => dispatch(makeDefaultsBmpForm(bmpType)),
        setLayer: (id) => dispatch(setLayer(id)),
        featureTypeSelected: (url, typeName) => dispatch(featureTypeSelected(url, typeName)),
        toggleEditMode: () => dispatch(toggleEditMode()),
        createNewFeatures: (features) => dispatch(createNewFeatures(features)),
        createQuery: (searchUrl, filterObj) => dispatch(createQuery(searchUrl, filterObj)),
        changeDrawingStatus: () => dispatch(changeDrawingStatus()),
        startDrawingFeature: () => dispatch(startDrawingFeature()),
        saveChanges: () => dispatch(saveChanges()),
        setDrawingBmp: (layerName) => dispatch(setDrawingBmp(layerName)),
        purgeMapInfoResults: () => dispatch(purgeMapInfoResults())
    };
};

const SwammBmpForm = connect(mapStateToProps, mapDispatchToProps)(SwammBmpFormClass);


export {
    SwammBmpForm
};
