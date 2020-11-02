import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button, Table, ControlLabel, FormControl, FormGroup, Form, Col} from "react-bootstrap";
import {
    hideBmpForm,
    showBmpForm,
    clearBmpForm,
    submitBmpForm,
    makeDefaultsBmpForm,
    makeExistingBmpForm,
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
import {featureTypeSelected, createQuery, query} from "../../../actions/wfsquery";
import "../../ProjectManager/projectManager.css";
import {isInt} from "../../Utils/utils";
import {orgSelector} from "../selectorsSwamm";

class SwammBmpFormClass extends React.Component {
    static propTypes = {
        bmpTypeId: PropTypes.number,
        bmpTypes: PropTypes.array,
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
        makeExistingBmpForm: PropTypes.func,
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
        purgeMapInfoResults: PropTypes.func,
        thisBmpCode: PropTypes.string
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
            this.props.makeExistingBmpForm(this.props.updatingBmp);
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
                        {this.props.storedBmpForm.id ?
                            "Edit BMP: " + this.props.storedBmpForm?.type_data?.name + " " + this.props.storedBmpForm.id :
                            "Create a new " + this.props?.storedBmpForm?.type_data?.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formControlsSelect">
                            <Col componentClass={ControlLabel} sm={6}>
                              Organisation
                            </Col>
                            {this.props.storedBmpForm.id ?
                                <Col sm={5}>
                                    <FormControl
                                        inline="true"
                                        readOnly="true"
                                        type={"string"}
                                        value={this.props.storedBmpForm?.organisation?.name}
                                    />
                                </Col> :
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
                            }
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
                            {this.props.storedBmpForm?.outlet_fid ?
                                <React.Fragment>
                                    <Col sm={4}>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            value={this.props.storedBmpForm?.outlet_fid}
                                        />
                                    </Col>
                                    <Col sm={1}>
                                        <Button
                                            className={"pull-right"}
                                            bsStyle={"info"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => window.alert('not implemented yet')}>
                                        Edit
                                        </Button>
                                    </Col>
                                </React.Fragment> :
                                <React.Fragment>
                                    <Col sm={5}>
                                        <Button
                                            disabled={ !this.props.storedBmpForm?.organisation}
                                            bsStyle={ this.props.storedBmpForm?.organisation ? "success" : "default"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => this.drawBmpStep1(this.props?.thisBmpCode + '_outlet')}>
                                        Locate Outlet
                                        </Button>
                                    </Col>
                                </React.Fragment>
                            }
                        </FormGroup>
                        <FormGroup controlId="footprint_fid" validationState={this.validateFid("footprint_fid")}>
                            <Col componentClass={ControlLabel} sm={6}>
                                Footprint:
                            </Col>
                            {this.props.storedBmpForm?.footprint_fid ?
                                <React.Fragment>
                                    <Col sm={3}>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            value={this.props.storedBmpForm?.calculated_footprint_area ?
                                                this.props.storedBmpForm?.calculated_footprint_area?.toFixed(2) + " acres" :
                                                ''}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Button
                                            className={"pull-right"}
                                            bsStyle={"info"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => window.alert('not implemented yet')}>
                                        Edit
                                        </Button>
                                    </Col>
                                </React.Fragment> :
                                <React.Fragment>
                                    <Col sm={5}>
                                        <Button
                                            disabled={ !this.props.storedBmpForm?.organisation}
                                            bsStyle={ this.props.storedBmpForm?.organisation ? "success" : "default"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => this.drawBmpStep1(this.props?.thisBmpCode + '_footprint')}>
                                        Draw footprint
                                        </Button>
                                    </Col>
                                </React.Fragment>
                            }
                        </FormGroup>
                        <FormGroup controlId="watershed_fid" validationState={this.validateFid("watershed_fid")}>
                            <Col componentClass={ControlLabel} sm={6}>
                                Watershed:
                            </Col>
                            {this.props.storedBmpForm?.watershed_fid ?
                                <React.Fragment>
                                    <Col sm={3}>
                                        <FormControl
                                            inline="true"
                                            readOnly="true"
                                            type={"string"}
                                            value={this.props.storedBmpForm?.calculated_watershed_area ?
                                                this.props.storedBmpForm?.calculated_watershed_area?.toFixed(2) + " acres" :
                                                ''}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <Button
                                            className={"pull-right"}
                                            bsStyle={"info"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => window.alert('not implemented yet')}>
                                        Edit
                                        </Button>
                                    </Col>
                                </React.Fragment> :
                                <React.Fragment>
                                    <Col sm={5}>
                                        <Button
                                            disabled={ !this.props.storedBmpForm?.organisation}
                                            bsStyle={ this.props.storedBmpForm?.organisation ? "success" : "default"}
                                            style={{opacity: "0.7"}}
                                            onClick={() => this.drawBmpStep1(this.props?.thisBmpCode + '_watershed')}>
                                        Draw watershed
                                        </Button>
                                    </Col>
                                </React.Fragment>
                            }
                        </FormGroup>
                    </Form>
                    <Table bordered condensed hover className={"text-right"}>
                        <thead>
                            <tr>
                                <th>Results</th>
                                <th/>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Previous nitrogen load: </td>
                                <td>{this.props.storedBmpForm?.previous_n_load?.toFixed(0)}</td>
                                <td className={"text-left"}>lbs/year</td>
                            </tr>
                            <tr>
                                <td>Nitrogen load reduction: </td>
                                <td>{this.props.storedBmpForm?.n_load_reduction?.toFixed(0)}</td>
                                <td className={"text-left"}>lbs/year</td>
                            </tr>
                            <tr>
                                <td>New nitrogen load: </td>
                                <td>{this.props.storedBmpForm?.new_n_load?.toFixed(0)}</td>
                                <td className={"text-left"}>lbs/year</td>
                            </tr>
                            <tr>
                                <td>Previous phosphorus load: </td>
                                <td>{this.props.storedBmpForm?.previous_p_load?.toFixed(0)}</td>
                                <td className={"text-left"}>lbs/year</td>
                            </tr>
                            <tr>
                                <td>Phosphorus load reduction: </td>
                                <td>{this.props.storedBmpForm?.p_load_reduction?.toFixed(0)}</td>
                                <td className={"text-left"}>lbs/year</td>
                            </tr>
                            <tr>
                                <td>New phosphorus load: </td>
                                <td>{this.props.storedBmpForm?.new_p_load?.toFixed(0)}</td>
                                <td className={"text-left"}>lbs/year</td>
                            </tr>
                            <tr>
                                <td>Previous sediment load: </td>
                                <td>{this.props.storedBmpForm?.previous_s_load?.toFixed(0)}</td>
                                <td className={"text-left"}>tons/year</td>
                            </tr>
                            <tr>
                                <td>Sediment load reduction: </td>
                                <td>{this.props.storedBmpForm?.s_load_reduction?.toFixed(0)}</td>
                                <td className={"text-left"}>tons/year</td>
                            </tr>
                            <tr>
                                <td>New sediment load: </td>
                                <td>{this.props.storedBmpForm?.new_s_load?.toFixed(0)}</td>
                                <td className={"text-left"}>tons/year</td>
                            </tr>
                            <tr>
                                <td>Calculated total cost: </td>
                                {this.props.storedBmpForm?.calculated_total_cost ?
                                    <td>${Number(this.props.storedBmpForm?.calculated_total_cost?.toFixed(0)).toLocaleString()}</td> :
                                    <td/>}
                                <td/>
                            </tr>
                            <tr>
                                <td>Nitrogen reduction cost: </td>
                                {this.props.storedBmpForm?.cost_per_lbs_n_reduced ?
                                    <td>{Number(this.props.storedBmpForm?.cost_per_lbs_n_reduced?.toFixed(0)).toLocaleString()}</td> :
                                    <td/>}
                                <td className={"text-left"}>$/lb/year</td>
                            </tr>
                            <tr>
                                <td>Phosphorus reduction cost: </td>
                                {this.props.storedBmpForm?.cost_per_lbs_p_reduced ?
                                    <td>{Number(this.props.storedBmpForm?.cost_per_lbs_p_reduced?.toFixed(0)).toLocaleString()}</td> :
                                    <td/>}
                                <td className={"text-left"}>$/lb/year</td>
                            </tr>
                            <tr>
                                <td>Sediment reduction cost: </td>
                                {this.props.storedBmpForm?.cost_per_ton_s_reduced ?
                                    <td>{Number(this.props.storedBmpForm?.cost_per_ton_s_reduced?.toFixed(0)).toLocaleString()}</td> :
                                    <td/>}
                                <td className={"text-left"}>$/ton/year</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => this.props.clearBmpForm()}>
                        Close
                    </Button>
                    <Button
                        bsStyle="info"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => this.props.hideBmpForm()}>
                        View Map
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
        let kv = {[fieldName]: fieldValue};
        if (event.target.type === 'number')  {
            kv = {[fieldName]: parseFloat(fieldValue)};
        }
        if (event.target.outerHTML.includes('organisation'))  {
            kv = {[fieldName]: JSON.parse(fieldValue)};
            const bmpCodeNameElements = this.props.thisBmpCode.split("_");
            bmpCodeNameElements[1] = JSON.parse(fieldValue).code;
            const updatedBmpCode = bmpCodeNameElements.join('_');
            kv.thisBmpCode = updatedBmpCode;
            kv.type_data = this.props.bmpTypes.filter((bmpType) => bmpType.code === updatedBmpCode)[0];
            kv.type = kv.type_data.id;
        }
        this.props.updateBmpForm(kv);
    }
    drawBmpStep1(layerName) {
        const targetLayer = this.props.layers.flat.filter(layer => layer.name === layerName)[0];
        console.log('targetLayer', targetLayer);
        this.props.setLayer(targetLayer?.id);
        this.props.featureTypeSelected('http://localhost:8080/geoserver/wfs', targetLayer?.name);
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        bmpTypes: state?.swamm?.bmpTypes,
        thisBmpType: state?.swamm?.bmpTypes.filter((bmpType) => bmpType.id === state?.swamm?.BmpFormBmpTypeId)[0],
        storedBmpForm: state?.swamm?.storedBmpForm || {},
        thisBmpCode: state?.swamm?.storedBmpForm?.type_data?.code,
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
        query: (url, filterObj, queryOptions, reason) => dispatch(query(url, filterObj, queryOptions, reason)),
        changeDrawingStatus: () => dispatch(changeDrawingStatus()),
        startDrawingFeature: () => dispatch(startDrawingFeature()),
        saveChanges: () => dispatch(saveChanges()),
        setDrawingBmp: (layerName) => dispatch(setDrawingBmp(layerName)),
        purgeMapInfoResults: () => dispatch(purgeMapInfoResults()),
        makeExistingBmpForm: (bmp) => dispatch(makeExistingBmpForm(bmp))
    };
};

const SwammBmpForm = connect(mapStateToProps, mapDispatchToProps)(SwammBmpFormClass);


export {
    SwammBmpForm
};