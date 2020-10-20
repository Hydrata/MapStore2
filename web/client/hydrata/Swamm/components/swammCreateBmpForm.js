import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button, ControlLabel, FormControl, FormGroup, Form, Col} from "react-bootstrap";
import {
    hideCreateBmpForm,
    showCreateBmpForm,
    clearCreateBmpForm,
    submitCreateBmpForm,
    makeDefaultsBmpCreateForm,
    updateCreateBmpForm,
    setDrawingBmp
} from "../actionsSwamm";
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
import {featureTypeSelected, createQuery} from "../../../actions/wfsquery";
import "../../ProjectManager/projectManager.css";
import {isInt} from "../../Utils/utils";
import {orgSelector} from "../selectorsSwamm";

class SwammCreateBmpFormClass extends React.Component {
    static propTypes = {
        bmpTypeId: PropTypes.number,
        hideCreateBmpForm: PropTypes.func,
        showCreateBmpForm: PropTypes.func,
        submitCreateBmpForm: PropTypes.func,
        storeCreateBmpForm: PropTypes.func,
        thisBmpType: PropTypes.object,
        newBmpForm: PropTypes.object,
        storedBmpCreateForm: PropTypes.object,
        clearCreateBmpForm: PropTypes.func,
        orgs: PropTypes.array,
        makeDefaultsBmpCreateForm: PropTypes.func,
        updateCreateBmpForm: PropTypes.func,
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
        mapId: PropTypes.number
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {};
    }

    componentDidMount() {
        if (Object.keys(this.props.storedBmpCreateForm).length === 0) {
            this.props.makeDefaultsBmpCreateForm(this.props.thisBmpType);
        }
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={() => this.props.hideCreateBmpForm()}
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
                                    value={JSON.stringify(this.props.storedBmpCreateForm?.organisation)}
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
                                    value={this.props.storedBmpCreateForm?.override_n_redratio}
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
                                    value={this.props.storedBmpCreateForm?.override_p_redratio}
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
                                    value={this.props.storedBmpCreateForm?.override_s_redratio}
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
                                    value={this.props.storedBmpCreateForm?.override_cost_base}
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
                                    value={this.props.storedBmpCreateForm?.override_cost_rate_per_footprint_area}
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
                                    value={this.props.storedBmpCreateForm?.override_cost_rate_per_watershed_area}
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
                                {this.props.storedBmpCreateForm?.outlet_fid ?
                                    <React.Fragment>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            step={1}
                                            precision={0}
                                            name="outlet_fid"
                                            value={this.props.storedBmpCreateForm?.outlet_fid}
                                            onChange={this.handleChange}
                                        />
                                        <FormControl.Feedback/>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Button
                                            bsStyle="success"
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
                                {this.props.storedBmpCreateForm?.footprint_fid ?
                                    <React.Fragment>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            step={1}
                                            precision={0}
                                            name="footprint_fid"
                                            value={this.props.storedBmpCreateForm?.footprint_fid}
                                            onChange={this.handleChange}
                                        />
                                        <FormControl.Feedback/>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Button
                                            bsStyle="success"
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
                                {this.props.storedBmpCreateForm?.watershed_fid ?
                                    <React.Fragment>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            step={1}
                                            precision={0}
                                            name="watershed_fid"
                                            value={this.props.storedBmpCreateForm?.watershed_fid}
                                            onChange={this.handleChange}
                                        />
                                        <FormControl.Feedback/>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Button
                                            bsStyle="success"
                                            style={{opacity: "0.7"}}
                                            onClick={() => this.drawBmpStep1(this.props.thisBmpType.code + '_watershed')}>
                                        Draw watershed
                                        </Button>
                                    </React.Fragment>
                                }
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => this.props.clearCreateBmpForm()}>
                        Cancel
                    </Button>
                    <Button
                        bsStyle="success"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => {
                            this.props.submitCreateBmpForm(this.props.storedBmpCreateForm, this.props.mapId);
                            this.props.clearCreateBmpForm();
                        }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    validateRatio(ratioName) {
        const ratio = this.props.storedBmpCreateForm[ratioName];
        if (ratio < 1 && ratio > 0) return 'success';
        if (ratio === 1) return 'warning';
        if (ratio > 1 || ratio < 0) return 'error';
        return null;
    }
    validateCost(costName) {
        const cost = this.props.storedBmpCreateForm[costName];
        if (cost >= 0) return 'success';
        if (cost < 0) return 'error';
        return null;
    }
    validateFid(fid) {
        const id = this.props.storedBmpCreateForm[fid];
        if (id >= 0 && isInt(id)) return 'success';
        if (id < 0) return 'error';
        return null;
    }
    handleChange(event) {
        const fieldName = event.target.name;
        let fieldValue = event.target.value;
        if (event.target.type === 'number')  {fieldValue = parseFloat(fieldValue);}
        if (event.target.outerHTML.includes('organisation'))  {fieldValue = JSON.parse(fieldValue);}
        this.props.updateCreateBmpForm({[fieldName]: fieldValue});
    }
    drawBmpStep1(layerName) {
        const orgCode = this.props.storedBmpCreateForm.organisation.code;
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
        this.props.hideCreateBmpForm();
        this.props.setDrawingBmp(layerName);
        // draw feature
        this.props.startDrawingFeature();
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        bmpTypes: state?.swamm?.bmpTypes,
        thisBmpType: state?.swamm?.bmpTypes.filter((bmpType) => bmpType.id === state?.swamm?.BmpCreateFormBmpTypeId)[0],
        storedBmpCreateForm: state?.swamm?.storedBmpCreateForm || {},
        orgs: orgSelector(state),
        layers: state?.layers,
        query: state?.query
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        hideCreateBmpForm: () => dispatch(hideCreateBmpForm()),
        showCreateBmpForm: () => dispatch(showCreateBmpForm()),
        submitCreateBmpForm: (newBmp, mapId) => dispatch(submitCreateBmpForm(newBmp, mapId)),
        updateCreateBmpForm: (kv) => dispatch(updateCreateBmpForm(kv)),
        clearCreateBmpForm: () => dispatch(clearCreateBmpForm()),
        makeDefaultsBmpCreateForm: (bmpType) => dispatch(makeDefaultsBmpCreateForm(bmpType)),
        setLayer: (id) => dispatch(setLayer(id)),
        featureTypeSelected: (url, typeName) => dispatch(featureTypeSelected(url, typeName)),
        toggleEditMode: () => dispatch(toggleEditMode()),
        createNewFeatures: (features) => dispatch(createNewFeatures(features)),
        createQuery: (searchUrl, filterObj) => dispatch(createQuery(searchUrl, filterObj)),
        changeDrawingStatus: () => dispatch(changeDrawingStatus()),
        startDrawingFeature: () => dispatch(startDrawingFeature()),
        saveChanges: () => dispatch(saveChanges()),
        setDrawingBmp: (layerName) => dispatch(setDrawingBmp(layerName))
    };
};

const SwammCreateBmpForm = connect(mapStateToProps, mapDispatchToProps)(SwammCreateBmpFormClass);


export {
    SwammCreateBmpForm
};
